/* eslint-disable no-unused-vars */
const supertest = require('supertest');
const server = supertest(require('../modules/server'));

describe('GET with CORS', function () {
    it('should include the correct headers', function (done) {
        server
        .get('/https://google.com')
        .set('Origin', 'http://example.com')
        .expect('Access-Control-Allow-Origin', '*')
        .expect(200, done);
    });

    it('should require the Origin header', function (done) {
        server
        .get('/https://google.com')
        .expect(403, done);
    });

    it('should not fail on sites that have CORS enabled', function (done) {
        server
        .get('/http://github.com')
        .set('Origin', 'http://example.com')
        .expect('Access-Control-Allow-Origin', '*')
        .expect(200, done); // For some reason I'm getting 203 statuses instead of 200
    });
});

describe('POST with CORS', function () {
    it('should include the correct headers', function (done) {
        server
        .post('/https://httpbin.org/post')
        .set('Origin', 'http://example.com')
        .send({'data': 'localhost'})
        .expect('Access-Control-Allow-Origin', '*, http://example.com')
        .expect(200, done); // Getting 302 instead of 200. No clue why.
    });

    it('should require the Origin header', function (done) {
        server
        .post('/https://reqbin.com/echo/post/json')
        .send('POST requests without Origin header should fail')
        .expect(403, done);
    });
});

describe('CORS Preflight', function () {
    it('should include the correct headers', function (done) {
        server
        .options('/')
        .expect('Access-Control-Allow-Origin', '*')
        .expect('Access-Control-Allow-Methods', 'GET')
        .expect('Access-Control-Max-Age', '86400')
        .expect(200, done);
    });
});