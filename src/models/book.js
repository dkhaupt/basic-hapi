'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    genre: { type: String, required: true },
    pageCount: { type: Number, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookModel, 'books');