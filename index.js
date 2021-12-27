require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const users = require('./routes/users');
const auth = require('./routes/auth');
const texts = require('./routes/texts');
const error = require('./middleware/error');
const config = require('config');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATA ERROR: jwtPrivateKey is not define.');
  process.exit(1);
}

const URI =
  'mongodb+srv://James:yYhcNQzEMfvTVnGk@cluster-01.qm3sd.mongodb.net/demo?retryWrites=true&w=majority';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error', err));

app.use(express.json());
app.use('/users', users);
app.use('/auth', auth);
app.use('/texts', texts);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
