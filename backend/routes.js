//Here, we continue with our constants, it's Node 6+ so ECMA-6 is supported
const express = require('express');
//This time we need to use express Router.  This will help us manage with ease our different routes
const router = express.Router();
//We need access to the file system.  Somewhere in our file system we are going to search for our data files.
const fs = require('fs');

//We are building a Rock Bands API.  We are starting with an empty array called artist.
//Our array will be feed from a json file.  This json file has some initial information but can grow if the user
//Adds a new band using the form we set up for them.
let artists = [];
//fs.readFile() will go to our json and will execute a callback.  This callback (written using ES6 syntax) has 2
//parameters: error and data.  The first parameter is error, in case there is an error looking for the file.
//The second param is the data itself
//Once we find the data, we want to convert it into a JSON file.
//When the file system gets the jukebox.json what it does is convert the json file into a buffer
//That's why we need to convert it to a string using .toString() javascript method.
//Then we turn the string into a JSON back again.
fs.readFile('jukebox.json', (error, data) => {
    artists = JSON.parse(data.toString());
});

// ####### THE ROUTES #######

// Route 1: if we go to localhost:3000 we won't see anything.
router.get('/', (request, response) => {
    response.status(200)
        .json({});
});

// Route 2: /artist
// When we go to localhost:3000/artists we will see all of our Rock Bands listed.
// This is a GET request and the callback returns a filtered json structure with the artists name only.
router.get('/artists', (request, response) => {
    response.status(200)
    //if the response is good and ready, we filter the json using the [].filter() method
        .json(artists.filter((artist) => {
            if (request.query.name) {
                return artist.name.toLowerCase().indexOf(request.query.name.toLowerCase()) >= 0;
            } else {
                return true;
            }
        }));
})

// Route 3: if we go to localhost:3000/error we just get a json with an error message
router.get('/error', (request, response) => {
    response.status(500)
        .json({
            'status': 'fail'
        });
});

// Route 4: Using the POST method from localhost:3000/artist.  There will be a form to add new artists

router.post('/artists', (request, response) => {

    //as always an HTTP call has both a request and a response
    //we will first push into artists the request body.  Body Parser makes this really REALLY easy
    artists.push(request.body);

    //pushing the data into artists array was really easy but we still need to add this new array item into our original json file: jukebox.json
    //to do that we need to convert our artists array into a string
    const data = JSON.stringify(artists, null, 2);

    //then using the file system we write new data into the file using writeFile
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