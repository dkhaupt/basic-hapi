'use strict';

const Hapi = require('hapi');
// const mongojs = require('mongojs');
const mongoose = require('mongoose');
const BookController = require('./src/controllers/book');
const MongoDBUrl = 'mongodb://localhost:27017/bookapi';

// server definition
const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

// db connection
// server.app.db = mongojs('basic-hapi', ['books']);

// basic routes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello world';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        // request.logger.info('In handler %s', request.path);

        return 'Hello ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'GET',
    path: '/test',
    handler: (request, h) => {

        return 'just a test';
    }
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {

        return h.file('./public/hello.html');
    }
});

// book routes

server.route({
    method:'GET',
    path: '/books',
    handler: BookController.list
})

server.route({
    method: 'GET',
    path: '/books/{id}',
    handler: BookController.get
})

server.route({
    method: 'POST',
    path: '/books',
    handler: BookController.create
})

// terminal logging of request path & response code
server.events.on('response', function(request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
})

const init = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: [ ]
        }
    });

    await server.register(require('inert'));

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);

    mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();