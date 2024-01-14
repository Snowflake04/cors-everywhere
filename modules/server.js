const restify = require('restify');
const toobusy = require('toobusy-js');
var proxy = require('./proxy');

const server = restify.createServer({
    name: 'cors',
    url:'http://169.254.0.1'
});

server.use(restify.queryParser({ mapParams: false }));
server.use(function (req, res, next) {
    if (toobusy()) {
        res.send(503, 'Server is overloaded! Please try again later.');
    } else {
        next();
    }
});

// CORS configuration
server.opts('/', proxy.opts);

// Request handler configuration (for free tier)
server.get(/^\/(https?:\/\/.+)/, proxy.get);
server.post(/^\/(https?:\/\/.+)/,proxy.post);
module.exports = server;
