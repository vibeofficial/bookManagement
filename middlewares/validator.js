const joi = require('joi');


exports.createBookValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Title is required.',
      'string.min': 'Title must be at least 5 characters long.',
      'string.pattern.base': 'Title must contain only letters.'
    }),
    author: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Author is required.',
      'string.min': 'Author must be at least 5 characters long.',
      'string.pattern.base': 'Author must contain only letters.'
    }),
    genre: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Genre is required.',
      'string.min': 'Genre must be at least 5 characters long.',
      'string.pattern.base': 'Genre must contain only letters.'
    }),
    coverPhoto: joi.optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};


exports.updateBookValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Title is required.',
      'string.min': 'Title must be at least 5 characters long.',
      'string.pattern.base': 'Title must contain only letters.'
    }),
    author: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Author is required.',
      'string.min': 'Author must be at least 5 characters long.',
      'string.pattern.base': 'Author must contain only letters.'
    }),
    genre: joi.string().min(5).trim().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Genre is required.',
      'string.min': 'Genre must be at least 5 characters long.',
      'string.pattern.base': 'Genre must contain only letters.'
    }),
    coverPhoto: joi.optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.message
    });
  }

  next();
};