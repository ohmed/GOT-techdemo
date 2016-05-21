/*
 * GOT
 * @author: ohmed
 * Landing page js
*/

var Landing = {

    href: '/got',

    currentPage: 0,
    currentSlide: 0,
    currentImageViewerScreen: 0,

    slideInterval: false,
    sliderActiveBG: 0,

    slides: [

                {
                    quote: { text: '<font style="font-size: 28px; color: #c22;">"</font>Best 3D map in browser I have seen...<font style="font-size: 28px; color: #c22;">"</font>', author: '- Lui Corban' },
                    image: 'https://s3-eu-west-1.amazonaws.com/nwg-data/img1.jpg'
                },

                {
                    quote: { text: '<font style="font-size: 28px; color: #c22;">"</font>It\'s new level of web!<font style="font-size: 28px; color: #c22;">"</font>', author: '- Donald Alber' },
                    image: 'https://s3-eu-west-1.amazonaws.com/nwg-data/img2.jpg'
                },

                {
                    quote: { text: '<font style="font-size: 28px; color: #c22;">"</font>Recently I thought it wasn\'t even possible...<font style="font-size: 28px; color: #c22;">"</font>', author: '- Alex Sandarm' },
                    image: 'https://s3-eu-west-1.amazonaws.com/nwg-data/img3.jpg'
                },

                {
                    quote: { text: '<font style="font-size: 28px; color: #c22;">"</font>I am Game of Thrones fan</br>and I love this awesome map!<font style="font-size: 28px; color: #c22;">"</font>', author: '- Devid Merdok' },
                    image: 'https://s3-eu-west-1.amazonaws.com/nwg-data/img4.jpg'
                }

            ]

};

Landing.preInit = function () {

    if ( NWE.isMobile() ) {

        $(document.head).append( '<style>body { position: absolute; width: 100%; top: 0px; left: 0px; height: 100%; } .desktop { display: none !important; } .mobile { display: block !important; }</style>' );

    }

};

Landing.init = function () {

    if ( ! NWE.isMobile() ) {

        this.initCarousel();

        Landing.handleRoute( window.location.pathname );

        if ( ! NWE.Detector.isWebGLSupported() ) {

            $('#start-btn').addClass( 'disabled-btn' );
            $('#start-btn').html( 'Sorry,&nbsp;&nbsp;you&nbsp;&nbsp;don\'t&nbsp;&nbsp;have&nbsp;&nbsp;webGL :(' );
            $('#start-bar').css( 'width', '360px' );
            $('#start-btn')[ 0 ].onclick = null;

        }

    }

};

Landing.initCarousel = function () {

    clearInterval( this.slideInterval );
    this.slideInterval = setInterval( this.nextSlide.bind( this ), 6000 );

};

Landing.nav = function ( event ) {

    event.stopPropagation();
    event.preventDefault();

    var href = event.target.getAttribute('href');

    window.history.pushState( '', 'Title', Landing.href + href );

    this.handleRoute( href );

};

Landing.handleRoute = function ( href ) {

    href = href.replace( this.href, '' );

    switch ( href ) {

        case '/':

            this.showHomePage();
            break;

        case '/about':

            this.showAboutPage();
            break;

        case '/blog':

            this.showBlogPage();
            break;

    }

};

Landing.switchSlide = function ( id ) {

    this.initCarousel();

    if ( id === this.currentSlide ) return;

    var slideData = this.slides[ id ];

    var quoteBar = $('.content .quote-bar');
    var quoteTextDom = $('.content .quote-bar .quote .text');
    var quoteAuthorDom = $('.content .quote-bar .quote .author');

    var backgroundImage1 = $('.content #home .active');
    var backgroundImage2 = $( $('.content #home .bg')[ id ] );

    $('.content #switches-bar .item').removeClass( 'active' );
    $( $('.content #switches-bar .item')[ id ] ).addClass( 'active' );

    backgroundImage1.animate({
        opacity: 0
    }, 800 );

    backgroundImage2.animate({
        opacity: 1
    }, 800, function () {

    });

    backgroundImage1.removeClass( 'active' );
    backgroundImage2.addClass( 'active' );

    quoteBar.animate({
        opacity: 0,
    }, 200, function () {

        quoteTextDom.html( slideData.quote.text );
        quoteAuthorDom.html( slideData.quote.author );

        quoteBar.animate({
            opacity: 1,
        }, 200 );
    
    });

    this.currentSlide = id;

};

Landing.nextSlide = function () {

    if ( this.currentSlide > this.slides.length - 2 ) {

        this.currentSlide = -1;

    }

    this.switchSlide( this.currentSlide + 1 );

};

Landing.prevSlide = function () {

    if ( this.currentSlide === 0 ) {

        this.currentSlide = this.slides.length;

    }

    this.switchSlide( this.currentSlide - 1 );

};

Landing.showHomePage = function () {

    $('.header .menu a').removeClass( 'active' );
    $('.header .menu #home').addClass( 'active' );

    $('.content #home').show();

    $('.content #home').stop();
    $('.content #about').stop();
    $('.content #blog').stop();

    $('.content #home').animate({ opacity: 1 }, 200, function () {

        $('.content #blog').hide();
        $('.content #about').hide();

    } );

    $('.content #blog').animate({ opacity: 0 }, 200 );
    $('.content #about').animate({ opacity: 0 }, 200 );

};

Landing.showAboutPage = function () {

    $('.header .menu a').removeClass( 'active' );
    $('.header .menu #about').addClass( 'active' );

    $('.content #about').show();

    $('.content #home').stop();
    $('.content #about').stop();
    $('.content #blog').stop();

    $('.content #home').animate({ opacity: 0 }, 200 );
    $('.content #blog').animate({ opacity: 0 }, 200 );
    $('.content #about').animate({ opacity: 1 }, 200, function () {

        $('.content #blog').hide();
        $('.content #home').hide();

    } );

};

Landing.showBlogPage = function () {

    $('.header .menu a').removeClass( 'active' );
    $('.header .menu #blog').addClass( 'active' );

    $('.content #blog').show();

    $('.content #home').stop();
    $('.content #about').stop();
    $('.content #blog').stop();

    $('.content #home').animate({ opacity: 0 }, 200 );
    $('.content #blog').animate({ opacity: 1 }, 200, function () {

        $('.content #home').hide();
        $('.content #about').hide();

    } );
    $('.content #about').animate({ opacity: 0 }, 200 );

};

//

Landing.startExploring = function () {

    var block = $('.content #start-bar');
    var startBtn = $('.content #start-bar #start-btn');
    var qualityBar = $('.content #start-bar #quality-bar');

    block.addClass( 'close' );

    setTimeout( function () {

        startBtn.hide();
        qualityBar.show();

        block.removeClass( 'close' );

    }, 500 );

};

Landing.startGOT = function ( quality ) {

    // set quality

    switch ( quality ) {

        case 0:

            GOT.settings.resolution = 0.6;
            GOT.settings.postprocessing.on = false;
            break;

        case 1:

            GOT.settings.resolution = 0.85;
            GOT.settings.postprocessing.on = false;
            break;

        case 2:

            GOT.settings.resolution = 1;
            GOT.settings.postprocessing.on = false;
            break;

    }

    // stop slide changing interval
    clearInterval( this.slideInterval );

    // disable rightClick menu
    document.oncontextmenu = function () { return false; };

    // change screen
    var mainPage = $('#landing-page');

    mainPage.addClass( 'hide' );
    $(document.body).addClass( 'game-body' );

    setTimeout( function () {

        mainPage.hide();
        $('.preloader').show();
        GOT.setupScene();

    }, 1000 );

    //

    GOT.vent.on('appLoaded', function() {

        setTimeout(function() {

            $('#ui').velocity('fadeIn');

        });

        //

        window.addEventListener( 'resize', GOT.view.onWindowResize, false );
        document.addEventListener( 'click', GOT.view.onClick, false );

    });

};

//

Landing.openImageViewer = function ( contentId ) {

    this.currentImageViewerScreen = contentId;

    $('.image-viewer').css( 'display', 'block' );

    $('.image-viewer #image-block').animate({
        opacity: 0.4
    }, 200, function () {

        $('.image-viewer #image-block').css( 'background-image', 'url(https://s3-eu-west-1.amazonaws.com/nwg-data/img/' + contentId + '.jpg)' );

        $('.image-viewer #image-block').animate({
            opacity: 1
        }, 200);

    });

    $('.image-viewer').animate({
        opacity: 1
    }, 250, function () {});

};

Landing.closeImageViewer = function () {

    $('.image-viewer').animate({
        opacity: 0
    }, 250, function () {

        $('.image-viewer').css( 'display', 'none' );

    });

};

Landing.nextImageInViewer = function () {

    if ( this.currentImageViewerScreen === $('.screenshot-bar .item').length - 1 ) {

        this.currentImageViewerScreen = 0;

    }

    this.openImageViewer( this.currentImageViewerScreen + 1 );

};

Landing.prevImageInViewer = function () {

    if ( this.currentImageViewerScreen === 0 ) {

        this.currentImageViewerScreen = $('.screenshot-bar .item').length;

    }

    this.openImageViewer( this.currentImageViewerScreen - 1 );

};

//

$(document).ready( Landing.init.bind( Landing ) );
Landing.preInit();
