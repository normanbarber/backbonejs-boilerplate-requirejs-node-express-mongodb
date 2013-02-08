define(['jquery', 'underscore', 'Backbone'],
    function($, _, Backbone){
        var PhotoModel = Backbone.Model.extend({
            urlRoot: '/photos',
            idAttribute: '_id',
            defaults: {
                _id: null,
                name: '',
                picture: null
            },
            initialize: function(){
                this.validators = {};
                this.validators.name = function (value) {
                    console.log('value.length = ' + value.length);
                    return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a name'};
                };
            },
            validateItem: function (key) {
                console.log('at validateItem');
                return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
            },
            // Backbones validate()
            validateAll: function () {
                var messages = {};
                for (var key in this.validators) {
                    if(this.validators.hasOwnProperty(key)) {
                        var check = this.validators[key](this.get(key));
                        if (check.isValid === false) {
                            messages[key] = check.message;
                        }
                    }
                }
                return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
            },
        });
        return PhotoModel;
    });