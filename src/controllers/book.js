var Book = require('../models/book');

// comment for test-issue issue
// another

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

        if(!book) return h.response({ message: 'Book not found' }).code(404);

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

        return h.response({ message: 'Book created successfully', book: book }).code(201);

    }).catch((err) => {
        
        return { err: err };

    });
}

// update a book
exports.update = (req, h) => {

    return Book.findById(req.params.id).exec().then((book) => {

        if (!book) return h.response({ message: 'Book not found' }).code(404);

        book.title = req.payload.title;
        book.genre = req.payload.genre;
        book.pageCount = req.payload.pageCount;
        book.image = req.payload.image;

        // TODO: figure out how to return properly from the post-save then()/catch()
        return book.save().then((book) => {
            
            return { message: 'Book updated successfully' };

        }).catch((err) => {
            
            return { err: err };

        });

    }).catch((err) => {

        return { err: err };

    });
}

// update 1+ fields without entire book
exports.patch = (req, h) => {

    return Book.findById(req.params.id).exec().then((book) => {
        
        if (!book) return h.response({ message: 'Book not found' }).code(404);

        // update document w/ payload & return
        return book.update(req.payload).then((book) => {

            return { message: 'Book field(s) updated successfully'}

        }).catch((err) => {

            return { err: err };

        });

    }).catch((err) => {

        return { err: err };

    });
}

// delete by ID
exports.remove = (req, h) => {

    return Book.findById(req.params.id).exec().then((book) => {

        if (!book) return h.response({ message: 'Book not found' }).code(404);

        // return removal outcome
        return book.remove().then((book) => {

            return { success: true };

        }).catch((err) => {

            return { err: err };

        });

    }).catch((err) => {
        
        return { err: err };

    });
}