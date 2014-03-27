/* 
* Set the routes of your app here.
*/ 

Main = require('./main');

module.exports = {
    'senddata': {
        post: Main.sendData
    }, 
    
    '': {
        get: Main.home
    },
};

