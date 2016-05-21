(function () {

    var POPUP_WIDTH = 320;
    var POPUP_MAX_HEIGHT = 500;
    var POPUP_OFFSET_Y = -20;
    var POPUP_ZOOM_EFFECT_OFFSET = 3;

    var activeObject;

    function showBuildingPopup ( instance ) {

        activeObject = instance;

        var position = GOT.view.picker.getScreenPos( activeObject.position, GOT.view.camera );

        var infoPopupEl = $('.info-popup');
        var infoPopupContentEl = infoPopupEl.find('.info-popup-content');

        infoPopupContentEl.html( activeObject.getShortInfo() );

        var width = $(window).width();
        var height = $(window).height();

        infoPopupEl.css({

            left: position.x - 0.5 * POPUP_WIDTH - POPUP_ZOOM_EFFECT_OFFSET, 
            bottom: height - position.y - POPUP_OFFSET_Y + 2 * POPUP_ZOOM_EFFECT_OFFSET,
            width: POPUP_WIDTH + 2 * POPUP_ZOOM_EFFECT_OFFSET, 
            opacity: 0

        }).show();

        _cancelMousewheel();

        setTimeout( _fitPopup );

        function _fitPopup () {

            infoPopupEl.velocity({ 

                left: position.x - 0.5 * POPUP_WIDTH, 
                bottom: height - position.y - POPUP_OFFSET_Y,
                width: POPUP_WIDTH, 
                opacity: 1

            }, {

                duration: 150,

                complete: function () {

                    var rect = infoPopupEl[0].getBoundingClientRect();
                    var delta;

                    if ( rect.left < 0 ) {

                        delta = GOT.view.picker.deltaScreenToWorld(position.x, position.y, - rect.left, 0);

                    }

                    if ( rect.top < 0 ) {

                        delta = GOT.view.picker.deltaScreenToWorld(position.x, position.y, 0, - rect.top + $('#main-nav').height());

                    }

                    if ( width - rect.right < 0 ) {

                        delta = GOT.view.picker.deltaScreenToWorld(position.x, position.y, - (width - rect.right), 0);

                    }

                    if ( height - rect.bottom < 0 ) {

                        delta = GOT.view.picker.deltaScreenToWorld(position.x, position.y, 0, - (height - rect.bottom));

                    }

                    var k = 0;
                    var steps = 10;

                    var interval = setInterval( function () {

                        GOT.view.updateCameraPosition( delta.dx / steps, delta.dz / steps );

                        k ++;

                        if ( k === steps ) {

                            clearInterval( interval );

                        }

                    }, 20);

                }

            });

            infoPopupContentEl.css({ 

                'max-height': POPUP_MAX_HEIGHT, 

            });

        };

        function _cancelMousewheel () {

            infoPopupEl.off('mousewheel.got');

            infoPopupEl.on('mousewheel.got', function (e) { e.stopPropagation(); });

        };

    };

    function closePopup () {

        $('.info-popup').hide();

        activeObject = undefined;

    };

    var infoPopupEl, height;

    function movePopup () {

        if ( ! activeObject ) return;

        var position = GOT.view.picker.getScreenPos( activeObject.position, GOT.view.camera );

        if ( ! infoPopupEl ) {

            infoPopupEl = $('.info-popup');

        }

        if ( ! height ) {

            height = $(window).height();

        }

        infoPopupEl.css({

            left: position.x - 0.5 * POPUP_WIDTH, 
            bottom: height - position.y - POPUP_OFFSET_Y

        });

    };

    $(document).on('click', closePopup);
    $(document).on('click', '.info-popup', function ( event ) { event.stopPropagation(); });

    GOT.vent.on('showBuildingPopup', showBuildingPopup);
    GOT.vent.on('mapMove', movePopup);

} ());
