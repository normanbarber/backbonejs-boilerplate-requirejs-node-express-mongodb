define(['text!views/photoformview/PhotoFormViewTemplate.html', 'views/photogridview/PhotoGridView', 'utilities/Utils', 'utilities/Paginator', 'models/PhotoModel'],
    function (PhotoFormViewTemplate, PhotoGridView, Utils, PaginatorView, PhotoModel) {
        var utils = new Utils();
        var PhotoFormView = Backbone.View.extend({
            el: $('#pagewrapper'),
            initialize:function() {
               
            },
            events: {
                'change'                    :'change_Listener',
                'click .save'               :'save_clickListener',
            },
            render:function () {
                var data = {};
                var compiledTemplate = _.template( PhotoFormViewTemplate, data );
                $(this.el).html( compiledTemplate );

                utils.hideAlert();
                this.model = new PhotoModel();
                var pages = this.collection.models;
                var len = pages.length;
                var startPos = (this.options.page - 1) * 8;
                var endPos = Math.min(startPos + 8, len);
                for (var i = startPos; i < endPos; i++) {
                    $('.thumbnails', this.el).append(new PhotoGridView({model: pages[i]}).render().el);
                }
                $('.paginator').append(new PaginatorView({model: this.collection, page: this.options.page}).render().el);
                return this;
            },
            change_Listener: function (event) {
                utils.hideAlert();
                // Apply changes to your model
                var target = event.target;
                var change = {};
                change[target.name] = target.value;
                this.model.set(change);
            },
            save_clickListener: function () {
                var self = this;
                this.model.set('picture','image-placeholder-small.png'); // replace this line with upload image file code
                var photoname = this.model.get('name');
                this.collection.add(new PhotoModel({name:photoname, picture: 'image-placeholder-small.png'}));
                var check = this.model.validateAll();
                if (check.isValid === false) {
                    utils.displayValidationErrors(check.messages);
                    return false;
                }
                utils.showAlert('Success!', 'Object saved successfully', 'alert-success');
                this.saveNewItem();
                return false;
            },
            saveNewItem: function () {
                var self = this;
                this.model.save(null, {
                    success: function (model) {
                        self.render();
                        utils.showAlert('Success!', 'Object saved successfully', 'alert-success');
                    },
                    error: function () {
                        utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                    }
                });
            },
        });
        return PhotoFormView;
    });