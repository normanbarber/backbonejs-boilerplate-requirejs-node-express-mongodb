define(['text!views/homeview/HomeViewTemplate.html'],
    function (HomeViewTemplate) {
        var HomeView = Backbone.View.extend({
            el: $('.container'),
            initialize: function () {
                this.render();
            },
            render: function () {
                var compiledTemplate = _.template( HomeViewTemplate );
                this.$el.html( compiledTemplate );
                return this;
            },
        });
        return HomeView;
 });