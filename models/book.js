const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  author: {
    type: String,
    require: true,
    trim: true
  },
  ISBN: {
    type: String,
    require: true,
    trim: true
  },
  publicationDate: {
    type: String,
    require: true,
    trim: true
  },
  genre: {
    type: String,
    require: true,
    trim: true
  },
  coverPhoto: {
    public_id: {type: String, require: true},
    image_url: {type: String, require: true}
  }
}, {timestamp: true});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;