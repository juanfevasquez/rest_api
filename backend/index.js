/*
Since we are using Node 6+, ECMA-6 syntax is supported.  Let's do that!
We will use const instead of var.  const means constant (idiot!)
We declare the constants because these are variables that will never alter its values and nobody should ever alter the value later
*/

//Use express
const express = require('express');
//Use our body parser
const body_parser = require('body-parser');
//Let's create an app (meaning, our server!!!).  The name of our server is: app (wow!!!!!! that name is ridiculously freaking awesome)
const app = express();

// This steps comes later when we set up our url routes (read on and when you reach line 40 you will understand)
const routes = require('./routes');

//We need our app to understand a few things that happen when using the internet
//First is understanding what is written on the queries (urls)
//Remember, query syntax might get crappy when we use spaces or special characters
//we don't want our app to crash if our query has a space or any special character written
//Usually these characters are replaced by codes like '+' or '%'
//body_parser.urlencoded does all of that and the option extended: false allows for a little extra magic trick:
//it will turn our query parameters into an object!!!! H.S
app.use(body_parser.urlencoded({ extended: false }));
//Let's tell our app that we are expecting to parse json files and not xml or other kind of files.
app.use(body_parser.json());
//Every http request has a response.  I make a request, the server responds.  So there are 2 objects: request and response.
//It's always the same.  Remember, always a request and a response.  What we need to do next is 
//Avoid cross origin conflicts.
//WTF is a cross origin conflic? Something that happens all the time like asking a webpage from somewhere.com but requesting an image
//from anotherwhere.com.  That's 2 different domains for elements on the same page, hence cross origin.
//I can't explain in details what happens in this block of code, but I know this avoid cross origin conflicts.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, If-None-Match');
    next();
});

//Now, when we go to our server address, we go to a specific url to request our information.  We want all the information
//to be at /api
//for this, we need to set up routes.  So we use the .use method again and tell the specific route ('/api') and then
//we call the module where the routes are processed (see line 15)
app.use('/api', routes);

//finally, we want to set up a port, as always the old reliable 3000 is good.
app.listen(3000, () => {
    console.log('listening on port 3000');
});

