define(['utilities/Utils', 'views/photodetailsview/PhotoDetailsView', 'text!views/photogridview/PhotoGridViewTemplate.html'],
    function (Utils, PhotoDetailsView, PhotoGridViewTemplate) {
        var PhotoGridView = Backbone.View.extend({
            tagName: 'li',
            initialize: function () {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.close, this);
            },
            render: function () {
                var data = this.model.toJSON();
                var compiledTemplate = _.template( PhotoGridViewTemplate, data );
                this.$el.append( compiledTemplate );
                return this;
            },
        });
        return PhotoGridView;
    });