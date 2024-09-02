import Router from 'express';
import Email from '../models/email.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import multer from 'multer';

const router = Router();
const emailsPerPage = 10;

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /send-emails:
 *   post:
 *     summary: Send an email to all recipients with an attached resume
 *     description: Sends an email with an attachment (resume) to all email addresses stored in the database.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: subject
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         in: formData
 *         required: true
 *         type: string
 *       - name: resume
 *         in: formData
 *         type: file
 *     responses:
 *       200:
 *         description: Emails sent successfully
 *       500:
 *         description: Error sending emails
 */
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
    res.status(500).send('Error sending emails | check your SMTP credentials');
  }
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve paginated email list
 *     description: Retrieves a paginated list of emails and renders it in a view.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: integer
 *         default: 1
 *     responses:
 *       200:
 *         description: A list of emails
 *       500:
 *         description: Error retrieving emails
 */
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

/**
 * @swagger
 * /collect-email:
 *   post:
 *     summary: Add a new email to the list
 *     description: Saves a new email to the database and redirects to the email list view.
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *     responses:
 *       302:
 *         description: Redirect to email list
 *       500:
 *         description: Error saving email
 */
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

/**
 * @swagger
 * /delete-email/{id}:
 *   post:
 *     summary: Delete an email from the list
 *     description: Deletes an email from the database by its ID and redirects to the email list view.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       302:
 *         description: Redirect to email list
 *       500:
 *         description: Error deleting email
 */
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

/**
 * @swagger
 * /send-emails:
 *   get:
 *     summary: Render send email form
 *     description: Renders the form for sending emails with pagination.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: integer
 *         default: 1
 *     responses:
 *       200:
 *         description: Email sending form rendered
 *       500:
 *         description: Error retrieving emails
 */
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
