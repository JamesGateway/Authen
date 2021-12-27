const { Text, validate } = require('../models/text');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const text = await Text.find();
  res.send(text);
});
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let text = new Text(
    _.pick(req.body, ['title', 'http', 'message', 'author', 'email'])
  );
  text = await text.save();
  res.send('Text added.');
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  let date = new Date();
  if (error) return res.status(400).send(error.details[0].message);

  const text = await Text.findByIdAndUpdate(
    req.params.id,
    {
      // prettier-ignore
      $set: {
        title: req.body.title,
        http: req.body.http,
        message: req.body.message,
        author: req.body.author,
        email: req.body.email,
        date: date,
      },
    },
    { new: true }
  );
  if (!text) return res.status(404).send(`Can't find the text.`);
  res.send(text);
});

router.delete('/:id', auth, async (req, res) => {
  const text = await Text.findByIdAndRemove(req.params.id);
  if (!text) return res.status(404).send(`Can't find the text.`);
  res.send(text);
});

router.get('/:email', auth, async (req, res) => {
  const text = await Text.find({ email: req.params.email });
  if (!text) return res.status(404).send(`Can't find the text.`);
  res.send(text);
});

module.exports = router;
