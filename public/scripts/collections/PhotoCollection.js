define(['models/PhotoModel'],
    function(PhotoModel){
        var PhotoCollection = Backbone.Collection.extend({
            model: PhotoModel,
            url: '/photos'
        });
        return PhotoCollection;
 });