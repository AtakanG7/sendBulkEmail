# Email Management System

A comprehensive Express.js application designed to manage email addresses and facilitate bulk email sending with attachments. This system also supports CRUD operations for email management and paginates results on the interface.

## Overview

| Feature                | Description                                         |
|------------------------|-----------------------------------------------------|
| **Application**        | Express.js based email management system.          |
| **Email Sending**      | Bulk email sending with attachments via Nodemailer.|
| **Email Management**   | Add, delete, and view email addresses.             |
| **Pagination**         | Paginated views for managing and sending emails.    |

## Routes

| Method | Path                  | Description                          | Request Body / Params                              |
|--------|-----------------------|--------------------------------------|----------------------------------------------------|
| `POST` | `/send-emails`        | Send bulk emails with an attachment. | `subject`, `message` (body), `resume` (file)      |
| `GET`  | `/`                   | View collected emails with pagination.| Query: `page` (default is 1)                       |
| `POST` | `/collect-email`      | Add a new email address.             | `email` (body)                                    |
| `POST` | `/delete-email/:id`   | Delete an email address by ID.        | URL Parameter: `id`                               |
| `GET`  | `/send-emails`        | View send emails page with pagination.| Query: `page` (default is 1)                       |

## Features

| Feature            | Description                                        |
|--------------------|----------------------------------------------------|
| **Email Sending**  | Uses Nodemailer to send emails with attachments.  |
| **File Upload**    | Handles file uploads using Multer.                |
| **Pagination**     | Supports pagination for email views.              |
| **Environment Variables** | Configured via `.env` for sensitive information. |

## Development

| Dependency   | Purpose                                          |
|--------------|--------------------------------------------------|
| **Express**  | Web framework for Node.js.                      |
| **Nodemailer** | Module for sending emails.                     |
| **Multer**   | Middleware for handling file uploads.           |
| **EJS**      | Templating engine for rendering views.           |
| **Dotenv**   | Module for loading environment variables.        |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For further details on how each component interacts within the system, refer to the project documentation or contact the development team.
