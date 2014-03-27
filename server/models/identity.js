americano = require('americano');

module.exports = Identity = americano.getModel('identity', {
    'idMesInfos': String,
    'lastName': String,
    'firstName': String,
});

Identity.get = function(callback) {
    Identity.request(
        "all",
        {
            limit: 1
        },
        function(err, instances) {
            if (err) {
                callback(err, null);

            } else if (instances.length != 1) {
                callback("No documents", null);
            } else {
                callback(null, instances[0]);
            }
        }
    );
}
