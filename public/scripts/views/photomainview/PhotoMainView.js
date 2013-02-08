define(['text!views/photomainview/PhotoMainViewTemplate.html'],
    function (PhotoMainViewTemplate) {
        var PhotoMainView = Backbone.View.extend({
            el: $('.container'),
            initialize:function() {
                this.render();  
            },
            render:function () {
                $(this.el).html(_.template(PhotoMainViewTemplate)); 
                return this;
            },
        });
        return PhotoMainView;
    });