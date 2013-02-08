var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('photodatabase', server, {safe: true});
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to photodatabase");
        db.collection('photos', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'photos' collection doesn't exist. Creating new collection");
                populateDB();
            }
        });
    }
});
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('photos', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
exports.findAll = function(req, res) {
    db.collection('photos', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.addItem = function(req, res) {
    var photo = req.body;
    console.log('Adding photo name: ' + JSON.stringify(photo.name));
    console.log('Adding photo picture: ' + JSON.stringify(photo.picture));
    db.collection('photos', function(err, collection) {
        collection.insert(photo, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.updateItem = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    delete item._id;
    console.log('Updating item: ' + id);
    console.log(JSON.stringify(item));
    db.collection('photos', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(item);
            }
        });
    });
}
exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Deleting photo: ' + id);
    db.collection('photos', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
var populateDB = function() {
    var photos = [];
    db.collection('photos', function(err, collection) {
        collection.insert(photos, {safe:true}, function(err, result) {});
    });

};