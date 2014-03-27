ReuConfig = require('../models/reuconfig');
GeolocationLog = require('../models/geolocationlog');
Identity = require('../models/identity');
Client = require('request-json').JsonClient;
async = require('async');


var apiHostname = 'http://localhost:9800/';


var displayIndex = function(conf, res) {
    res.render(__dirname + '/../../client/index.jade', { "conf": conf }, function(err, html) {
        if (err != null) {
            console.log(err);
            res.send(500, err);
        } else {
            res.send(200, html);
        }
   });
};


module.exports.sendData = function(req, res) {
    var conf = req.body
    
    // get body data : password.
    var password = req.body.password ; // TODO check password.
    
    if (!password || password.length < 4) {
        var msg = "Veuillez entrer un mot de passe d'au moins 4 caractères.";
        conf.errorMsg = msg ;
        // if bad : send + msg !
        displayIndex(conf, res);
        return ;
    //
    }

    var sendResponse = function(err) {
        if (err != null) {
            res.send(500, "An error occurred while setting the configuration -- " + err);
        } else {
            res.redirect('back');
        }
    };

    var onApiResponse = function(err, response, body) {
        if (err != null) {
            console.log(err);
            console.log(body);

        } else {
            ReuConfig.setConfig(conf, sendResponse);
        };
    };
    
    // get identity,
    // get all geoloc points
        geologs: GeolocationLog.allFiltered(function(err, geologs) {
            //console.log(r);
            if (err) {
                console.log(err); //Pass ?
               // TODO !    
            }
            //if (geologs.length == 0) { // done with get msisdn.
            
            var res = {
                //"firstname": r.identity.firstName,
                //"lastname": r.identity.lastName,
                "password": conf.password,
                "msisdn": conf.msisdn,
                "startdate": geologs[0].timestamp,
                "enddate": geologs[geologs.length - 1].timestamp,
                "geolocationlogs": geologs
            };


            // send !
            var cli = new Client(apiHostname);
            cli.post('mesinfos/import.php', res, onApiResponse);

        });
    

};

module.exports.home = function(req, res) {
    ReuConfig.getConfig(function(err, doc) {
        if (doc) {
           res.render(__dirname + '/../../client/sended.jade', { "conf": doc }, function(err, html) {
                if (err != null) {
                    console.log(err);
                    res.send(500, err);
                } else {
                    res.send(200, html);
                }
                });

        } else {
          async.parallel({
            identity: Identity.get,
            msisdn: GeolocationLog.msisdn,
          },
          function(err, r) {
            if (err) {
              // no data ?
              res.render(__dirname + "/../../client/nodata.jade", { }, function(err, html) {
                if (err != null) {
                    console.log(err);
                    res.send(500, err);
                } else {
                    res.send(200, html);
                }
                });
            } else {
              //res.render(__dirname + '/../../client/index.jade', 
              //  { "conf": 
                displayIndex(
                    { lastName: r.identity.lastName, 
                     firstName: r.identity.firstName,
                     msisdn: r.msisdn,
                     }, res);

              //  }, function(err, html) {
              //  if (err != null) {
              //      console.log(err);
              //      res.send(500, err);
              //  } else {
              //      res.send(200, html);
              //  }
            //});
            }
          });
        }
     });
};

