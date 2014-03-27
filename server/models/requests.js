/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

module.exports = {
    geolocationlog: {
        msisdn : function(doc) {
            if (doc.msisdn && doc.msisdn != "NULL") {
                emit(doc.timestamp, doc);
            }
        },

        filtered : function(doc) {
            if (!doc.state && doc.msisdn != "NULL" && doc.latitude && doc.longitude) { // skip OFF states.
                //skip night ?
                //TODO if (doc.timestamp
                emit(doc.timestamp, 
                    {
                        'timestamp': doc.timestamp,
                        'latitude': doc.latitude,
                        'longitude': doc.longitude,
                    });
            }
        },
    }
};
