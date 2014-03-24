RealtimeAdapter = require('cozy-realtime-adapter');
Client = require('request-json').JsonClient ;
ApiManager = require('../lib/apimanager');

module.exports = function(server) {

    var watchedEvents = Object.keys(ApiManager.events);
    var realtime = RealtimeAdapter({ server: server}, watchedEvents);

    var callbackFactory = function(ev, callbackName) {
        realtime.on(ev, 
            function(ev, id) {
                ApiManager[callbackName].call(ApiManager, ev, id);
            }
        );
        console.log("Event " + ev + " bound to " + callbackName);
    };
    
    // Registers all declared events.
    for (var i=0; i<watchedEvents.length; i++) {
        var ev = watchedEvents[i]
            callbackFactory(ev, ApiManager.events[ev]);
    }

};

