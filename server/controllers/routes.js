/* 
* Set the routes of your app here.
*/ 

Main = require('./main');

module.exports = {
    'save-ids': {
        post: Main.saveIds
    }, 
    
    '': {
        get: Main.home
    },
};

