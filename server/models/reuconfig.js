americano = require('americano');
config = require('../lib/config');

module.exports = ReuConfig = americano.getModel(
    config.reutilisateurID, {
    'id': String,
    'config': Object,
});

ReuConfig.setConfig = function(doc, callback) {
    var reuConf = {
        id : config.reutilisateurID,
        config : doc
    };

    ReuConfig.updateOrCreate(reuConf, callback);
};

ReuConfig.getConfig = function(callback) {
    ReuConfig.find(config.reutilisateurID, function(err, doc) {
        if (doc) {
            callback(err, doc.config);
        } else {
            callback(err, null);
        }
    });  
};
