const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const textSchema = new mongoose.Schema({
  title: { type: String, maxlength: 50, required: true },
  http: { type: String, maxlength: 255 },
  message: { type: String, maxlength: 255 },
  author: { type: String, maxlength: 255 },
  email: { type: String, maxlength: 255 },
  date: { type: Date, default: Date.now },
});

const Text = mongoose.model('Text', textSchema);

function validateText(text) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    http: Joi.string().max(255),
    message: Joi.string().max(255),
    author: Joi.string().max(255),
    email: Joi.string().max(255),
  });
  return schema.validate(text);
}

exports.Text = Text;
exports.validate = validateText;
