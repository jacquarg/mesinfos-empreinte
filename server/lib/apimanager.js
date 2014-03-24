Client = require('request-json').JsonClient;
Config = require('../lib/config');
ReuConfig = require('../models/reuconfig');


ReceiptDetail = require('../models/receiptdetail');

module.exports = ApiManager = {

    ///////////////////////
    //// zone à éditer ////

    // n'oublier pas d'entrer votre nom de reutilisateur dans ../lib/config .

    // configurez votre nom de domaine
    apiHostname: 'http://localhost:9800/',
    
    // liez des callbacks aux événements qui vous intéressent
    events: {
        'receiptdetail.update': 'onInterUpdate',
        'nomreutilisateur.update': 'onConfigChange', 
    },
    

    onInterUpdate: function(ev, id) {
        // On obtient le document qui a été mis à jour,
        ReceiptDetail.find(id, 
            function(err, doc) {
                if (err != null) {
                    console.log("onInterUpdate > " + err);

                } else {
                    // On envoie le document via l'API
                    ApiManager.api.post('test', doc, 
                        function(err, response, body) {
                            if (err != null) {
                                console.log(err);
                            }
                            console.log(body);
                        });
                }
            });
    
    },

    onConfigChange: function(ev, id) {
        // Répercute le changement de user/mdp.
        // Ne modifiez pas cette ligne sauf si vous savez ce que vous faites
        ApiManager.updateCredentials(
            function() {


        // Ce callback est un bon moyent de détecter lorsque l'utilisateur enregistre
        // initialement ses identiants
        // Vous pouvez par exemple envoyer toutes les DATA déjà présentes
        ReceiptDetail.all(function(err, docs) {
            // err: contient une éventuelle erreur
            // docs: contient un array de chaines JSON représentant tous
            // les docs du doctype souhaité

            // Votre requête HTTP à votre API ici :
            ApiManager.api.post('test', docs, 
                function(err, response, body) {
                    if (err != null) {
                        console.log(err);
                    }
                    console.log(body);
                });
        });
        });
    },
    

    //// FIN de la zone à éditer ////
    /////////////////////////////////
   
    // Ne modifiez pas cette ligne sauf si vous savez ce que vous faites
    updateCredentials: function(callback) { 
        ReuConfig.getConfig(function(err, conf) {
            if (conf) {
                ApiManager.api.setBasicAuth(conf.login, conf.password);
            }
            if (callback) {
                callback();
            }
        });
    },

};



// Init API :
ApiManager.api = new Client(ApiManager.apiHostname);
ApiManager.updateCredentials();

