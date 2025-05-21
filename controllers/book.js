const bookModel = require('../models/book');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const { log } = require('console');
const { title } = require('process');


exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const existingBook = await bookModel.findOne({ title: title?.toLowerCase() });

    if (existingBook) {
      return res.status(400).json({
        message: `Book with title: ${title} already exist`
      })
    };

    const authorName = author.split(' ')?.map((e) => {
      return e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()
    }).join(' ');

    const bookTitle = title.split(' ')?.map((e) => {
      return e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()
    }).join(' ');

    const bookGenre = genre.split(' ')?.map((e) => {
      return e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()
    }).join(' ');

    const ranNum1 = Math.round(Math.random() * 1E3); const ranNum2 = Math.round(Math.random() * 1E1);
    const ranNum3 = Math.round(Math.random() * 1E4);
    const ranNum4 = Math.round(Math.random() * 1E4);
    const ranNum5 = Math.round(Math.random() * 1E1);

    const file = req.file;
    const coverPhotoResult = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path);

    const book = new bookModel({
      title: bookTitle,
      author: authorName,
      genre: bookGenre,
      ISBN: `ISBN ${ranNum1}-${ranNum2}-${ranNum3}-${ranNum4}-${ranNum5}`,
      publicationDate: new Date().getFullYear(),
      coverPhoto: {
        public_id: coverPhotoResult.public_id,
        image_url: coverPhotoResult.secure_url
      }
    });

    await book.save();
    res.status(200).json({
      message: 'Book created successfully',
      data: book
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({
      message: 'All books below',
      data: books
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'No book found'
      })
    };

    res.status(200).json({
      message: 'Book below',
      data: book
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.getBookByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    const bookGenre = genre.split(' ')?.map((e) => {
      return e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()
    }).join(' ');

    const book = await bookModel.findOne({ genre: bookGenre });

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    };

    res.status(200).json({
      message: 'Book below'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.getBookByPublicationYear = async (req, res) => {
  try {
    const { year } = req.query;
    const book = await bookModel.findOne({ publicationDate: year });

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    };

    res.status(200).json({
      message: 'Book below'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.getBookByPublicationYearAndGenre = async (req, res) => {
  try {
    const { year, genre } = req.query;

    const bookGenre = genre.split(' ')?.map((e) => {
      return e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase()
    }).join(' ');

    const book = await bookModel.findOne({ publicationDate: year, genre: bookGenre });

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      })
    };

    res.status(200).json({
      message: 'Book below'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, genre } = req.body;
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'No book found'
      })
    };

    const file = req.file;

    let data = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      coverPhoto: book.coverPhoto
    };

    if (title || author || genre) {
      data = {
        title,
        author,
        genre
      }
    };

    if (file && file.path) {
      await cloudinary.uploader.destroy(book.coverPhoto.public_id);
      const coverPhotoResult = await cloudinary.uploader.upload(file.path);
      fs.unlinkSync(file.path);
      data.coverPhoto = {
        public_id: coverPhotoResult.public_id,
        image_url: coverPhotoResult.secure_url
      }
    };

    const updatedBook = await bookModel.findByIdAndUpdate(bookId, data, { new: true });
    res.status(200).json({
      message: 'Book updated successfully',
      data: updatedBook
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'No book found'
      })
    };

    const deletedBook = await bookModel.findByIdAndDelete(book._id);

    if (deletedBook) {
      await cloudinary.uploader.destroy(book.coverPhoto.public_id);
    };

    res.status(200).json({
      message: 'Book deleted successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    })
  }
};