americano = require('americano');

module.exports = GeolocationLog = americano.getModel('geolocationlog', {
    'origin': String,
    'idMesInfos': String,
    'timestamp': Date,
    'latitude': Number,
    'longitude': Number,
    'radius': Number,
    'msisdn': String,
    'deviceState': { 'type': String, 'default': null },
    'snippet': String
});

GeolocationLog.allFiltered = function(callback) {
    GeolocationLog.rawRequest(
        "filtered",
        {},
        function(err, instances) {
            console.log(err);
            //console.log(instances);
            var res = instances.map(function(kv) { return kv.value; });
            callback(null, res);
        }
    );
};

GeolocationLog.msisdn = function(callback) {
    GeolocationLog.request(
        "msisdn",
        {
            limit: 1
        },
        function(err, instances) {
            if (instances.length == 0) {
                callback("No data !", null);
            } else {
                callback(null, instances[0].msisdn);
            }
        }
        );
};
