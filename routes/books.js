'use strict';

const Boom = require('boom');
const uuid = require('uuid');

exports.register = function(server, options, next) {
     
    const db = server.app.db;

    // placeholder for routes
    server.route({
        method:'GET',
        path: '/books',
        handler: function(request, h) {
            
            db.books.find((err, docs) => {
                if (err) {
                    return Boom.wrap(err, 'Internal MongoDB error');
                }

                return docs;
            });
        }
    });

    return next();
}

exports.register.attributes = {
    name: 'routes-books'
}