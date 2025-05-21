const { createBook, getBooks, getBook, updateBook, deleteBook, getBookByGenre, getBookByPublicationYear, getBookByPublicationYearAndGenre } = require('../controllers/book');

const router = require('express').Router();

const upload = require('../middlewares/multer');

const { createBookValidation, updateBookValidation } = require('../middlewares/validator');


/**
 * @swagger
 * /v1/create-book:
 *   post:
 *     summary: Create a new book
 *     description: Uploads a book with title, author, genre, and cover photo. Also auto-generates an ISBN and sets the publication date.
 *     tags:
 *       - Books
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - coverPhoto
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Chronicles of Backend"
 *               author:
 *                 type: string
 *                 example: "christopher adams"
 *               genre:
 *                 type: string
 *                 example: "Technology"
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genre:
 *                       type: string
 *                     ISBN:
 *                       type: string
 *                     publicationDate:
 *                       type: string
 *                     coverPhoto:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         image_url:
 *                           type: string
 *       400:
 *         description: Missing fields or book already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book with title \"XYZ\" already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the book"
 */
router.post('/create-book', upload.single('coverPhoto'), createBookValidation, createBook);


/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Retrieve all books
 *     description: Fetch a list of all books available in the system.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       ISBN:
 *                         type: string
 *                       publicationDate:
 *                         type: string
 *                       coverPhoto:
 *                         type: object
 *                         properties:
 *                           public_id:
 *                             type: string
 *                           image_url:
 *                             type: string
 *       '500':
 *         description: Server error while retrieving books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving books"
 */
router.get('/books', getBooks);


/**
 * @swagger
 * /v1/book/{bookId}:
 *   get:
 *     summary: Get a single book by ID
 *     description: Retrieve the details of a specific book using its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book below"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     genre:
 *                       type: string
 *                     ISBN:
 *                       type: string
 *                     publicationDate:
 *                       type: string
 *                     coverPhoto:
 *                       type: object
 *                       properties:
 *                         public_id:
 *                           type: string
 *                         image_url:
 *                           type: string
 *       '404':
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No book found"
 *       '500':
 *         description: Server error while retrieving the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving book"
 */
router.get('/book/:bookId', getBook);


/**
 * @swagger
 * /v1/genre:
 *   get:
 *     summary: Get a book by genre
 *     description: Retrieve a book from the database based on the provided genre. Genre should be passed as a query parameter.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: genre
 *         required: true
 *         description: The genre of the book to retrieve (e.g., "Science Fiction")
 *         schema:
 *           Book:
 *             type: string
 *             example: "Science Fiction"
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book below"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/genre', getBookByGenre);


/**
 * @swagger
 * /v1/year:
 *   get:
 *     summary: Get a book by publication year
 *     description: Retrieves a book that matches the provided publication year.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           Book:
 *             type: string
 *           required: true
 *           description: The publication year to search for (e.g. "2024")
 *     responses:
 *       200:
 *         description: Book retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book below"
 *       404:
 *         description: No book found for the specified year.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/year', getBookByPublicationYear);


/**
 * @swagger
 * /v1/search:
 *   get:
 *     summary: Get book by publication year and genre
 *     description: Retrieves a book based on the provided publication year and genre.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           Book:
 *             type: string
 *           description: Publication year of the book (e.g., "Mon May 20 2024")
 *         - in: query
 *           name: genre
 *           required: true
 *         schema:
 *           Book:
 *             type: string
 *           description: Genre of the book (e.g., "Science Fiction")
 *     responses:
 *       200:
 *         description: Book found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book below"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server error while retrieving the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/search', getBookByPublicationYearAndGenre);


/**
 * @swagger
 * /v1/book/{bookId}:
 *   put:
 *     summary: Update a book
 *     description: Update a book's title, author, genre, and optionally its cover photo.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Book Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *                 description: Optional new cover photo
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No book found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating book"
 */
router.put('/book/:bookId', upload.single('coverPhoto'), updateBookValidation, updateBook);


/**
 * @swagger
 * /v1/delete-book/{bookId}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes a specific book from the database and removes its cover photo from Cloudinary.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       '200':
 *         description: Book deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book deleted successfully
 *       '404':
 *         description: No book found with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No book found
 *       '500':
 *         description: Server error during deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message here
 */
router.delete('/delete-book/:bookId', deleteBook);

module.exports = router;