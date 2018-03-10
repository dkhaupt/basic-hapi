'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// server definition
const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

// db connection
server.app.db = mongojs('basic-hapi', ['books']);

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

    await server.register(require('./routes/books'));

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();