var americano = require('americano');

var port = process.env.PORT || 9250;
americano.start({name: 'bookmark', port: port} , 
    function(app, server) {
        // Init the watcher, after americano'setup.
        require('./server/services/watcher')(server);
    }
);
