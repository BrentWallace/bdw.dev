require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const helmet = require('helmet');
const { check, validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');

// Public directory path
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
app.use(helmet());

// Set the view engine and related paths
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set static directory
app.use(express.static(publicDirectoryPath));

// Set express to read urlencoded data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'BDW.dev',
    description: 'Full stack developer based in Raleigh, NC',
  });
});

app.post('/contact_handler/', [
  check('inputEmail').isEmail(),
  check('inputMessage').trim().escape(),
], (req, res) => {
  // Check for errors and return any that come up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Construct the email
  const fromEmail = req.body.inputEmail;
  const message = req.body.inputMessage;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'brent@bdw.dev',
    from: fromEmail,
    subject: `Contact form submission from ${fromEmail}`,
    text: `Plain text message: ${message}`,
    html: `<p>The following is a message that was recieved from the contact form on BDW.dev.</p>${message}`,
  };
  sgMail.send(msg);
  // Send a response to the form on the front end
  return res.send('Thank you for reaching out! I\'ll get back to you as soon as I can.');
});

// Set the port and start app listening
const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});
