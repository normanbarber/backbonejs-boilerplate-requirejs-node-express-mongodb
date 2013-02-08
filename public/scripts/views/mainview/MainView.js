define(['text!views/mainview/MainViewTemplate.html'],
    function (MainViewTemplate) {
        var MainView = Backbone.View.extend({
            el: $('.container'),
            initialize:function() {
                this.render();
            },
            events: {
                'swipeleft #sidenav':'btnSideNav_swipeHandler', // close sidenav
                'swiperight #listitemview':'btnList_swipeHandler', // close listitemview  
            },
            render:function () {
                $('.container').html(_.template(MainViewTemplate));
                // tap List button
                tappable('#listView_Listener', {
                    noScroll: false,
                    onTap: function(){
                        $('#listitemview').transition({ x: '-310px' }).addClass('active');
                    },
                    containerElement: this.$el[0]
                });
                // tap photo button
                tappable('#photoBtn_Listener', {
                    noScroll: false,
                    onTap: function(){
                        console.log('at btnPhoto_Listener ');
                        if ($('#listitemview').hasClass('active')) {
                            $('#listitemview').transition({ x: '600px' }).removeClass('active');
                        }
                    },
                    containerElement: this.$el[0]
                });
                $(function() {
                    // load the touch carousel, for pages content, after the DOMs loaded
                    var $carousel = $('#mainviewcontent');
                    $carousel.addClass('touchcarousel');
                    $carousel.find('ul').addClass('touchcarousel-container').find('li').each(function() { $(this).addClass('touchcarousel-item'); });
                    $carousel.touchCarousel({
                        autoplayStopAction: false,
                        itemsPerMove: 1,
                        loopItems: false,
                        snapToItems: true,
                        pagingNav: false,
                        pagingNavControls: false,
                        itemFallbackWidth: 1024,
                        transitionSpeed: 100,
                        baseMouseFriction: 0.0012,
                        baseTouchFriction: 0.0008,
                        scrollbar: false,
                        useWebkit3d: true
                    });
                });
                return this;
            },
            // slide (or close) the sidenav drawer out from the left
            btnSideNav_swipeHandler:function (event) {
                if (!$('#sidenav').hasClass('active')) {
                    $('#sidenav').transition({ x: '310px' }).addClass('active');
                    $('#btnSideNav').addClass('ui-btn-active');
                }
                else {
                    $('#sidenav').transition({ x: '-310px' }).removeClass('active');
                    $('#btnSideNav').removeClass('ui-btn-active');
                }
            },
            // slide (or close) the listitemview drawer out from the right
            btnList_swipeHandler:function (event) {
                if (!$('#listitemview').hasClass('active')) {
                    $('#listitemview').transition({ x: '-310px' }).addClass('active');
                    $('#btnList').addClass('ui-btn-active');
                }
                else {
                    $('#listitemview').transition({ x: '310px' }).removeClass('active');
                    $('#btnList').removeClass('ui-btn-active');
                }
            },
        });
        return MainView;
    });