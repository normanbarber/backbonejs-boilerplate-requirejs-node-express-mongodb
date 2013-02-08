define(['models/ListItemModel'],
    function(ListItemModel){
        var ListItemCollection = Backbone.Collection.extend({
            model: ListItemModel,
            url: '/listitems'
        });
        return ListItemCollection;
    });