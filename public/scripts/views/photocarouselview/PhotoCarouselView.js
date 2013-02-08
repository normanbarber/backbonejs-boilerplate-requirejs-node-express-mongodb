define(['text!views/photocarouselview/PhotoCarouselViewTemplate.html'],
    function (PhotoCarouselViewTemplate) {
        var PhotoCarouselView = Backbone.View.extend({
            el: $('#touchcarouselwrapper'),
            initialize:function() {
            },
            render:function () {
                $('#touchcarouselwrapper').html(_.template(PhotoCarouselViewTemplate, {photolistcollection: this.collection.toJSON(), photolistcount: this.collection.length}));
                // load the touch carousel, for pages content, after the DOMs loaded
                $(function() {
                    var $carousel = $('#touchcarouselwrapper');
                    $carousel.addClass('touchcarousel');
                    $carousel.find('ul').addClass('touchcarousel-container').find('li').each(function() { $(this).addClass('touchcarousel-item'); });
                    $carousel.touchCarousel({
                        autoplayStopAction: false,
                        itemsPerMove: 1,
                        loopItems: false,
                        pagingNav: false,
                        pagingNavControls: false,
                        itemFallbackWidth: 142,
                        baseTouchFriction: 0.0004,
                        scrollbar: false,
                        useWebkit3d: true
                    });
                });
                return this;
            },
            events: {
                'click #pagethumb'    :   'thumb_clickListener',
            },
            thumb_clickListener:function (event) {
                var thumbtitle = $(event.currentTarget).attr('name');
                $('#pagetitle').html(thumbtitle); // thumb title inserted into div #pagetitle in MainViewTemplate
                $(event.currentTarget).fadeOut();
                $(event.currentTarget).fadeIn();
            },
        });
        return PhotoCarouselView;
    });