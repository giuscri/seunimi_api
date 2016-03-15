var assert = require('assert');
var http = require('http');

var server = require('../src/main.js');

describe('server', function() {
    before(function() {
        server.listen(8080);
    });

    options = {
        'hostname': 'localhost',
        'port': 8080,
        'path': '/api'
    };

    it('should fetch the number of episodes', function(done) {
        options['path'] = '/api/episode';

        get_and_expect(options, {'n_episodes': 38}, done);
    });

    it('should fetch data about episode 1', function(done) {
        options['path'] = '/api/episode/1';

        var expected = {
            'valid': true,
            'video_url': 'https://homes.di.unimi.it/~belletc/down1.php?FILENAME=PS2013-01.mp4',
            'authorization_token': '...',
        };
        get_and_expect(options, expected, done);
    });

    it('should NOT fetch data about episode 42', function(done) {
        options['path'] = '/api/episode/42';

        get_and_expect(options, {'valid': false}, done);
    });

    it('should NOT fetch data about episode F', function(done) {
        options['path'] = '/api/episode/F';

        get_and_expect(options, {'valid': false}, done);
    });

    it('should NOT fetch data when passed invalid url', function(done) {
        options['path'] = '/stack/overflow';

        get_and_expect(options, {'valid': false}, done);
    });

    after(function() {
        server.close();
    });
});

function get_and_expect(options, expected, callback) {
    http.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) { body += chunk; });
        res.on('end', function() {
            assert.deepEqual(JSON.parse(body), expected);
            callback();
        });
    });
}
