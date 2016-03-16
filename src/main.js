var http = require('http');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./etc/main.db');

var server = http.createServer(function(req, res) {
    if (req.url.match(/\/api\/episode\/?$/)) {
        db.get('select count(*) as n_episodes from main', function(err, row) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({n_episodes: row['n_episodes']}));
        });
    }

    else if (req.url.match(/\/api\/episode\/\d{1,2}\/?$/)) {
        var episode_id = req.url.match(/\/api\/episode\/(\d{1,2})\/?$/)[1];

        db.get(`select url from main where id=${episode_id}`, function(err, row) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            if (row) {
                return res.end(JSON.stringify({
                    'valid': true,
                    'video_url': row['url'],
                    'authorization_token': '...',
                }));
            }

            return res.end(JSON.stringify({'valid': false}));
        });
    }

    else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({'valid': false}));
    }
});

module.exports = server;
