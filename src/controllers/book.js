var Book = require('../models/book');

// list books
exports.list = async (req, h) => {

    try {

        books = await Book.find({}).exec();

        return { books: books };

    } catch (err) { 

        return { err: err };

    }
}

// get book by ID
exports.get = async (req, h) => {
    
    try {

        book = await Book.findById(req.params.id).exec();

        if (!book) return h.response({ message: 'Book not found' }).code(404); 

        return { book: book };

    } catch (err) {

        return { err: err };

    }
}

// create a book
exports.create = async (req, h) => {

    try {

        const bookData = {
            title: req.payload.title,
            genre: req.payload.genre,
            pageCount: req.payload.pageCount,
            image: req.payload.image
        };

        book = await Book.create(bookData);

        return h.response({ message: 'Book created successfully', book: book }).code(201);

    } catch (err) {

        return { err: err };

    }
}

// update a book
exports.update = async (req, h) => {

    try {

        book = await Book.findById(req.params.id).exec();

        if (!book) return h.response({ message: 'Book not found' }).code(404);

        book.title = req.payload.title;
        book.genre = req.payload.genre;
        book.pageCount = req.payload.pageCount;
        book.image = req.payload.image;

        book = await book.save()

        if (book) { return { message: 'Book updated successfully' }; }

    } catch (err) {

        return { err: err };

    }

}

// update 1+ fields without entire book
exports.patch = async (req, h) => {

    try {

        book = await Book.findById(req.params.id).exec();

        if (!book) return h.response({ message: 'Book not found' }).code(404);

        book = await book.update(req.payload);

        return { message: 'Book field(s) updated successfully' };

    } catch (err) { 

        return { err: err };

    }
}

// delete by ID
exports.remove = async (req, h) => {
    
    try {

        book = await Book.findById(req.params.id).exec();

        if (!book) return h.response({ message: 'Book not found' }).code(404);

        book.remove();

        return { success: true };

    } catch (err) {

        return { err: err };

    }
}