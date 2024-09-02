# Email Management System

This Express.js application leverages the Brevo API to manage email addresses and facilitate bulk email sending. The system supports sending emails with attachments and offers a comprehensive set of features for managing email addresses.

![image](https://github.com/user-attachments/assets/1c6743f0-258f-4189-90bc-d69b982e89e6)


## Overview

This application provides:

- **Email Management**: Create, view, and delete email addresses.
- **Email Sending**: Bulk email sending with attachments via Nodemailer.
- **Pagination**: Paginated views for managing and sending emails.

## Routes

| Method | Path                  | Description                                     | Request Body / Params                      |
|--------|-----------------------|-------------------------------------------------|--------------------------------------------|
| `POST` | `/send-emails`        | Send bulk emails with an attachment.            | **Body**: `subject`, `message`              |
| `GET`  | `/`                   | Retrieve collected emails with pagination.      | **Query**: `page` (default is 1)           |
| `POST` | `/collect-email`      | Add a new email address.                       | **Body**: `email`                         |
| `POST` | `/delete-email/:id`   | Delete an email address by ID.                   | **URL Parameter**: `id`                    |
| `GET`  | `/send-emails`        | View the page for sending emails with pagination.| **Query**: `page` (default is 1)           |


## Features

- **Email Sending**: Uses Nodemailer for sending emails with attachments.
- **File Upload**: Handles file uploads using Multer.
- **Pagination**: Supports pagination for email views.
- **Environment Variables**: Configured via `.env` for sensitive information.

## Development

### Dependencies

- **Express**: Web framework for Node.js.
- **Nodemailer**: Module for sending emails.
- **Multer**: Middleware for handling file uploads.
- **EJS**: Templating engine for rendering views.
- **Dotenv**: Module for loading environment variables.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information on how the components interact within the system, refer to the project documentation or contact the development team.
