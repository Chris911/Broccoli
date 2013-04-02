Broccoli
========

Web Analytics for Humans

This is a weekend project to familiarize ourselves to NodeJS, web analytics and NoSQL technologies.

To-Do / Notes
-------------
### Reminder
Think **modularity** and **reuseability**. We do not want to duplicate code and want this whole project to be **scalable**. 
Look for libraries and read on **NodeJS programming standards, practices and architectures**. 

### Logging System
* Use Winston
* Define strict logging level (info, notice, debug, severe)
* Currently winston should log exception to a seperate log file. We should rething this and try to handle as many exceptions in the code it self. It is also a good practice to restart Node applications when an unhandled exception occur. 

### Running the backend server/api-server with email notification
To start the backend server with the email notification in case of exception, run (in /Broccoli/backend/script):

    ./start-server >& /dev/null &

same for the API-server

    ./start-api >& /dev/null &

Developers
---------
[Christophe Naud-Dulude](https://github.com/Chris911)

[David Albertson](https://github.com/Diastro)


Dependencies
------------
**KEEP ME UP TO DATE**. This will be important if at some point we have to create a script to automatically setup a new servers (AWS)

### Global
* [Node.js](http://nodejs.org/) - Application Server
* [MongoDb](http://www.mongodb.org/) - Database Storage

### Backend (Server)
* [Node.js](http://nodejs.org/) - Application Server
* [MongoDb-Module](http://www.mongodb.org/) - Database Storage
* [Moment-Module] (http://momentjs.com/) - Formatting dates
* [jQuery](http://jquery.org/) - Client-server communication
* [express-useragent] (https://npmjs.org/package/express-useragent) - Useragent parser for Node.js

### Frontend (Dashboard)
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [node.bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js/) Password Cryptography
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library
