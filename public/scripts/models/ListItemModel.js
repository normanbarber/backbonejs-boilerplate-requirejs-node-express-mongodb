define(['jquery', 'underscore', 'Backbone'],
    function($, _, Backbone){
        var ListItemModel = Backbone.Model.extend({
            urlRoot: '/listitems',
            defaults : {
                _id: null,
                name: '',
                date: null,
            },
            initialize: function(){          
            },
        });
        return ListItemModel;
    });