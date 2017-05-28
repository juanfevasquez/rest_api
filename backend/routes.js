const express = require('express');
const router = express.Router();
const fs = require('fs');

let artists = [];
fs.readFile('jukebox.json', (error, data) => {
    artists = JSON.parse(data.toString());
});


router.get('/artists', (request, response) => {
    response.status(200)
        .json(artists.filter((artist) => {
            if (request.query.name) {
                return artist.name.toLowerCase().indexOf(request.query.name.toLowerCase()) >= 0;
            } else {
                return true;
            }
        }));
})

router.get('/', (request, response) => {
    response.status(200)
        .json({});
});

router.get('/error', (request, response) => {
    response.status(500)
        .json({
            'status': 'fail'
        });
});

router.post('/artists', (request, response) => {
    artists.push(request.body);
    const data = JSON.stringify(artists, null, 2);
    fs.writeFile('jukebox.json', data, (error) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            response.status(201)
                .json(request.body);
        }
    });

})

module.exports = router;