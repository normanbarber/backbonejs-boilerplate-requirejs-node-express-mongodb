define(['views/homeview/HomeView', 'views/photomainview/PhotoMainView', 'views/photoformview/PhotoFormView', 'views/photodetailsview/PhotoDetailsView',  'views/mainview/MainView', 'views/listitemview/ListItemView', 'views/photocarouselview/PhotoCarouselView', 'models/ListItemModel', 'collections/ListItemCollection', 'models/PhotoModel', 'collections/PhotoCollection'],
    function (HomeView, PhotoMainView, PhotoFormView, PhotoDetailsView, MainView, ListItemView, PhotoCarouselView, ListItemModel, ListItemCollection, PhotoModel, PhotoCollection) {
        var photoscollection = new PhotoCollection();
        var photomodels = new PhotoModel();
        var listitemcollection = new ListItemCollection();
        var listitemmodels = new ListItemModel();
        var Router = Backbone.Router.extend({
            $el: $('.container'),
            routes: {
                ''                          : 'home',
                'home'                      : 'home',
                'add_delete_models'         : 'photoMainViewBtn_Listener',
                'pages/page/:page'        : 'photoMainViewBtn_Listener',
                'mainView_Listener'         : 'viewMainViewBtn_Listener',
                'photoDetails/:id'          : 'photoDetailsBtn_Listener',
            },
            initialize: function () {
                Backbone.history.start();
            },
            home: function () { 
                $(this.el).html(new HomeView().el);  
            },
            photoMainViewBtn_Listener: function(page) {
                var p = page ? parseInt(page, 10) : 1;
                $(this.el).html(new PhotoMainView().el);
                photoscollection.fetch({success: function(){
                    this.photoformview = new PhotoFormView({model: photomodels, collection: photoscollection, page: p});
                    this.photoformview.setElement( $('.container').find('#pagewrapper') ).render();
                }});
            },
            viewMainViewBtn_Listener: function() {
                photoscollection.fetch({success: function(){
                    $(this.el).html(new MainView({collection: photoscollection}).el);
                    this.photocarouselview = new PhotoCarouselView({collection: photoscollection});
                    this.photocarouselview.setElement( $('.container').find('#touchcarouselwrapper') ).render();

                    listitemcollection.fetch({success: function(){
                        this.itemsview = new ListItemView({model: listitemmodels, collection:listitemcollection});
                        this.itemsview.setElement( $('.container').find('#listitemview') ).render();
                    }});
                }});
            },
            photoDetailsBtn_Listener: function (id) {
                var photomodel = new PhotoModel({_id: id});
                photomodel.fetch({success: function(){
                    $('.container').html(new PhotoDetailsView({model: photomodel}).el);
                }});
            },
        });
        return Router;
    });