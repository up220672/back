const Nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const transport = Nodemailer.createTransport({
  host: "mail.privateemail.com", // Servidor SMTP de Namecheap
  port: 465, // Puerto SSL
  secure: true, // true para SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const loadTemplate = (templateName) => {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  return fs.readFileSync(templatePath, 'utf8').trim();
};

const replacePlaceholders = (template, placeholders) => {
  let customizedTemplate = template;
  for (const [key, value] of Object.entries(placeholders)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    customizedTemplate = customizedTemplate.replace(regex, value);
  }
  return customizedTemplate;
};

const sentEmail = async ({ email, subject, templateName, placeholders }) => {
  const sender = {
    address: process.env.EMAIL_USER,
    name: "QuickTrips",
  };
  const recipients = [email];

  const template = loadTemplate(templateName);
  const html = replacePlaceholders(template, placeholders);

  await transport.sendMail({
    from: sender,
    to: recipients,
    subject: subject,
    html: html,
    category: "Integration Test",
  });
};

module.exports = { sentEmail };