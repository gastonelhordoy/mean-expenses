# project-gaston-elhordoy

## Introduction

I wrote this project using [Yeoman](http://yeoman.io/) and a Community-driven generator called [Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack).

As specified by the generator's documentation, it is based on the javascript fullstack known as MEAN (MongoDB, Expres.js, Angular.js and Node.js), using a single programming language end-to-end.


## Requirements

For executing this application you will need to have the following software installed (find more details on how to install them in each link):
- [Node.js](http://nodejs.org/download/)
- [Grunt](http://gruntjs.com/getting-started#installing-the-cli)
- [Bower](http://bower.io/#installing-bower)

After installing them, please run the following two commands at the project's root directory: `npm install` and `bower install`

## Running the application

Just issue the following command in a console at the project's root directory: `node server.js`
Open a web browser pointing to `http://localhost:3000/`


## Persistence
Instead of requiring the installation of a MongoDB instance, I choose to use [mongolab](http://mongolab.com/), a MongoDB-as-a-service.

To connect to the MongoDB instance using the shell you can run
```
    mongo ds033469.mongolab.com:33469/project-gaston-elhordoy -u <dbuser> -p <dbpassword>
```
where <dbuser> and <dbpassword> should be replaced by appropiate values:
```
    mongo ds033469.mongolab.com:33469/project-gaston-elhordoy -u project-gaston-elhordoy -p project-gaston-elhordoy-1234
```


## Further improvements
- Lazy loading scripts.
- Open reports in a new window with printing styles and automatically open the print dialog for the report page.
- Create another summarized report to try out Mongo's aggregate framework.
- Better manipulation of alerts.
- Automaticaly close alerts (with $timeout probably).
- Use custom modal windows to avoid browser blocking mechanism.
