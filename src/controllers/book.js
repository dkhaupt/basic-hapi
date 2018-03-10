var Book = require('../models/book');

// list books
exports.list = (req, h) => {
    return Book.find({}).exec().then((book) => {


        return { books: book };


    }).catch((err) => {


        return { err: err };


    });
}

// get book by ID
exports.get = (req, h) => {
    
    return Book.findById(req.params.id).exec().then((book) => {

        if(!book) return { message: 'Book not found' };

        return { book: book };

    }).catch((err) => {

        return { err: err };

    });
}

// create a book
exports.create = (req, h) => {
    
    const bookData = {
        title: req.payload.title,
        genre: req.payload.genre,
        pageCount: req.payload.pageCount,
        image: req.payload.image
    };

    return Book.create(bookData).then((book) => {

        return { message: 'Book created successfully', book: book };

    }).catch((err) => {
        
        return { err: err };

    });
}