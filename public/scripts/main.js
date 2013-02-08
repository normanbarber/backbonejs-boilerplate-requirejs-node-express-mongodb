require.config({
    paths:{
        // RequireJS plugin
        text:'libs/require/text',
        // RequireJS plugin
        domReady:'libs/require/domReady',
        // underscore library
        underscore:'libs/underscore/underscore-min',
        // Backbone.js library
        Backbone:'libs/backbone/backbone-min',
        // jQuery
        jquery:'libs/jquery/jquery-1.8.2.min',
        // jQuery transit plugin
        transit:'libs/jquery/jquery.transit',
        // tappable plugin
        tappable:'libs/jquery/jquery.tappable',
        tappable2:'libs/tappable/tappable',
        // jQuery Mobile framework
        jqm:'libs/jquery.mobile/jquery.mobile-1.2.0',
        // jQuery Mobile plugin for Backbone views navigation
        jqmNavigator:'libs/jquery.mobile/jqmNavigator',
        // carousel plugin
        touchcarousel:'libs/touchcarousel/jquery.touchcarousel-1.1',
        // lazy loader
        lazyload:'libs/jquery/jquery.lazyload.min',
    },
    shim:{
        Backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
        touchcarousel:{
            deps:['jquery']
        },
        transit:{
            deps:['jquery']
        },
        lazyload:{
            deps:['jquery']
        },
        jqm:{
            deps:['jquery', 'jqmNavigator']
        },
        tappable:{
            deps:['jquery']
        }
    }
});

require(['domReady','underscore',  'Backbone','router/Router', 'jqm', 'touchcarousel', 'transit', 'tappable', 'tappable2', 'lazyload'],
    function (domReady, _, Backbone, Router) {
        domReady(function () {
            function onDeviceReady(desktop) {
                // console.log('at onDeviceReady');
                // Hiding splash screen when app is loaded
                if (desktop !== true)
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                // Setting jQM pageContainer to #container div, this solves some jQM flickers & jumps
                // I covered it here: http://outof.me/fixing-flickers-jumps-of-jquery-mobile-transitions-in-phonegap-apps/
                $.mobile.pageContainer = $('.container');

                // Setting default transition to fade
                $.mobile.defaultPageTransition = 'none';

                // some options specific to phonegap apps
                $.mobile.buttonMarkup.hoverDelay = true;
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                $.mobile.touchOverflowEnabled = true;
                if (desktop !== true) {
                    $.mobile.pushStateEnabled = false;
                    $.mobile.loader.prototype.options.text = 'loading';
                    $.mobile.loader.prototype.options.textVisible = false;
                    $.mobile.loader.prototype.options.theme = 'a';
                    $.mobile.loader.prototype.options.html = '';
                }
                // start the application router
                if(!route){
                    var route = new Router();
                }
            }
        onDeviceReady(true);  // comment this line before move to production. using this for desktop testing
        document.addEventListener('deviceready', onDeviceReady, false);
    });
    return this;
  });