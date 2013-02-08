define(['utilities/Utils', 'text!views/photodetailsview/PhotoDetailsViewTemplate.html'],
    function (Utils, PhotoDetailsViewTemplate) {
        var utils = new Utils();
        var PhotoDetailsView = Backbone.View.extend({
            $el: $('.container'),
            initialize: function () {
                this.render();
                this.model.bind('destroy', this.close, this);
            },
            events: {
                'click .deleteListener'     :'delete',
                'change'                    :'change_Listener',
                'click .save'               :'save_clickListener',
            },
            render: function () {
                var data = this.model.toJSON();
                var compiledTemplate = _.template( PhotoDetailsViewTemplate, data );
                $(this.el).append( compiledTemplate );
                return this;
            },
            change_Listener: function (event) {
                // Apply changes to your model
                var target = event.target;
                var change = {};
                change[target.name] = target.value;
                this.model.set(change);
            },
            save_clickListener: function () {
                var self = this;
                this.model.set('picture','image-placeholder-small.png'); // replace this line with upload image file code
                var check = this.model.validateAll();
                if (check.isValid === false) {
                    return false;
                }
                this.saveNewItem();
                return false;
            },
            saveNewItem: function () {
                var self = this;
                this.model.save(null, {
                    success: function (model) {
                        window.history.back();
                    },
                    error: function () {
                        utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                    }
                });
            },
            delete: function () {
                this.model.destroy({
                    success: function () {
                        alert('photo deleted successfully');
                        window.history.back();
                    }
                });
                return false;
            },
        });
        return PhotoDetailsView;
    });
