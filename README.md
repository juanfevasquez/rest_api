# Creating a REST API with Node and Express

## Step 1: Create a folder for backend

Inside your main project folder, create a subfolder for backend
```
mkdir backend
```
Inside this folder we will set up our express server

The following steps (from step 2 to step 4) will be dedicated to installing the needed packages to set up our server inside this new subfolder
```
cd backend
```

## Step 2: Create a package.json with npm init

```
npm init
```

## Step 3: Install yarn

Yarn does what npm does, but better.  Yarn caches the packages so next time you need them, installation of those will be fast fast fast
Start by installing yarn in your system
```
npm install -g yarn 
```
Once installed in your system, you will install every other package using the yarn command, you'll see examples of these on Step 3.

For more information on installing Yarn, visit [the npm guide](https://www.npmjs.com/package/yarn)

If you want to learn more about migrating from npm to yarn, read [this awesome article](https://yarnpkg.com/lang/en/docs/migrating-from-npm/)

## Step 4: Install express

Because I insist you use yarn, then use this command to install express.
```
yarn add express
````
This yarn command is the equivalent to write npm install --save
Your package has been added as a dependency of your project.

## Step 4: Install body-parser

Body parser is a plugin that helps with the parsing of the information that comes in the headers of an HTTP Request.  This will make parsing the request body extremely easy
```
yarn add body-parser
```


# So... what happens next?

## Open index.js and read the comments

Inside index.js we set up our express server.