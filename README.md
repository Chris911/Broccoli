Broccoli
========

Web Analytics for Humans

To-Do / Notes
-------------
## Reminder
Think **modularity** and **reuseability**. We do not want to duplicate code and want this whole project to be **scalable**. 
Look for libraries and read on **NodeJS programming standards, practices and architectures**. 

De plus en plus je pense que si on fait ca GOOD Broccoli pourrait être beaucoup plus qu'une ligne dans notre CV. THINK BIG! 

## Logging System
* Use Winston
* Define strict logging level (info, notice, debug, severe)
* Currently winston should log exception to a seperate log file. We should rething this and try to handle as many exceptions in the code it self. It is also a good practice to restart Node applications when an unhandled exception occur. 


Tutorials
---------
Note: Only post links to tutorial you read and used or thinkg we should use. No spam! 



Dependencies
------------
**KEEP ME UP TO DATE**. This will be important if at some point we have to create a script to automatically setup a new servers (AWS)

### Global
* [Node.js](http://nodejs.org/) - Application Server
* [MongoDb](http://www.mongodb.org/) - Database Storage

### Backend (Server)
* [Node.js](http://nodejs.org/) - Application Server
* [MongoDb](http://www.mongodb.org/) - Database Storage
* [jQuery](http://jquery.org/) - Client-server communication

### Frontend (Dashboard)
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [node.bcrypt.js](https://github.com/ncb000gt/node.bcrypt.js/) Password Cryptography
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library