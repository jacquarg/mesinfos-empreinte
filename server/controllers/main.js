ReuConfig = require('../models/reuconfig');

module.exports.saveIds = function(req, res) {
    params = req.body
    ReuConfig.setConfig(params, function(err) {
        if (err != null) {
            res.send(500, "An error occurred while setting the configuration -- " + err);
        } else {
            res.redirect('back');
        }
      
    });
};


module.exports.home = function(req, res) {
    ReuConfig.getConfig(function(err, doc) {
        if (doc) {
            doc.mustRegister = false ;
        } else {
            doc = {
                mustRegister: true,
                login: '',
                password: '',
            };
        }

        res.render(__dirname + '/../../client/index.ejs', { "conf": doc }, function(err, html) {
            if (err != null) {
                console.log(err);
                res.send(500, err);
            } else {
                res.send(200, html);
            }
        });
    });
};

