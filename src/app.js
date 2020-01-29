require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const helmet = require('helmet');

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
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'BDW.dev',
    description: 'Full stack developer based in Raleigh, NC',
  });
});

const { check, validationResult } = require('express-validator');

app.post('/contact_handler/', [
  check('inputEmail').isEmail(),
  check('inputMessage').trim().escape(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log(req.body.inputEmail);
  console.log(req.body.inputMessage);
  res.send('Thank you for reaching out! I\'ll get back to you as soon as I can.');
});

// Set the port and start app listening
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
