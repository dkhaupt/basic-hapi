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

// update a book
exports.update = (req, h) => {

    return Book.findById(req.params.id).exec().then((book) => {

        if (!book) return { err: 'Book not found' };

        book.title = req.payload.title;
        book.genre = req.payload.genre;
        book.pageCount = req.payload.pageCount;
        book.image = req.payload.image;

        let message = 'Book updated successfully';

        // TODO: figure out how to return properly from the post-save then()/catch()
        book.save();

        return { message: message };

    // }).then((data) => {

    //     return { message: 'Book updated successfully' };

    }).catch((err) => {

        return { err: err };

    });
}

// update 1+ fields without entire book
exports.patch = (req, h) => {

    return Book.findByIdAndUpdate(req.params.id, req.payload).exec().then(() => {

    }).then((data) => {

        return { message: 'Fields updated successfully' };

    }).catch((err) => {

        return { err: err };
    });
}

// delete by ID
exports.remove = (req, h) => {

    return Book.findById(req.params.id).exec().then((book) => {

        if (!book) return { message: 'Book not found' };

        book.remove(function(err) {

            if (err) return { dberror: err };

            return { success: true };
        });

    }).catch((err) => {
        
        return { err: err };

    });
}