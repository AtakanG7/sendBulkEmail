import Router from 'express';
import Email from '../models/email.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';

const router = Router();
const emailsPerPage = 10;

// Load environment variables from .env file
dotenv.config();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// POST route to send emails
router.post('/send-emails', upload.single('resume'), async (req, res) => {
  const { subject, message } = req.body;
  const resume = req.file;  // Multer stores the uploaded file in req.file

  try {
    const emails = await Email.getAllEmails();

    // Configure nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_SERVER,
      port: parseInt(process.env.BREVO_SMTP_PORT),
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD
      }
    });

    const promises = emails.map((recipient) => {
      const mailOptions = {
        from: 'atakan.gul000@gmail.com',
        to: recipient.email,
        subject,
        text: message,
        attachments: [
          {
            filename: resume.originalname,
            content: resume.buffer,  // Use the buffer provided by multer
            encoding: 'base64'
          }
        ]
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(promises);
    res.send('Emails sent successfully');
  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).send('Error sending emails');
  }
});


// GET route for the home page with pagination
router.get('/', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const totalEmails = await Email.countEmails(); 
    const emails = await Email.getEmailsByPage(currentPage, emailsPerPage); 
    
    res.render('./pages/collect-email.ejs', {
      emails,
      currentPage,
      totalEmails,
      emailsPerPage
    });
  } catch (err) {
    console.error('Error retrieving emails:', err);
    res.status(500).send('Error retrieving emails');
  }
});

// POST route to collect emails
router.post('/collect-email', async (req, res) => {
  const { email } = req.body;

  try {
    await Email.create(email);
    res.redirect('/');
  } catch (err) {
    console.error('Error saving email:', err);
    res.status(500).send('Error saving email');
  }
});

// POST route to delete an email
router.post('/delete-email/:id', async (req, res) => {
  const emailId = req.params.id;

  try {
    await Email.deleteEmailById(emailId); 
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting email:', err);
    res.status(500).send('Error deleting email');
  }
});

// GET route to display send emails page with pagination
router.get('/send-emails', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const totalEmails = await Email.countEmails();
    const emails = await Email.getEmailsByPage(currentPage, emailsPerPage);
    
    res.render('send-emails', {
      emails,
      currentPage,
      totalEmails,
      emailsPerPage
    });
  } catch (err) {
    console.error('Error retrieving emails:', err);
    res.status(500).send('Error retrieving emails');
  }
});

export default router;
