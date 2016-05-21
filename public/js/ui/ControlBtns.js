(function () {

    function zoomIn () {

        GOT.controls.zoom( -1, 3 );

    };

    function zoomOut () {

        GOT.controls.zoom( 1, 3 );

    };

    function moveForard () {

        GOT.controls.moveForward( -3 );

    };

    function moveBack () {

        GOT.controls.moveForward( 3 );

    };

    function moveRight () {

        GOT.controls.moveSide( 3 );

    };

    function moveLeft () {

        GOT.controls.moveSide( -3 );

    };

    function stopMoveForard () {

        GOT.controls.stopForward();

    };

    function stopMoveBack () {

        GOT.controls.stopForward();

    };

    function stopMoveRight () {

        GOT.controls.stopSide();

    };

    function stopMoveLeft () {

        GOT.controls.stopSide();

    };

    function init () {

        $('.map-zoom-in').click( zoomIn );
        $('.map-zoom-out').click( zoomOut );

        $('#map-controls-top').mousedown( moveForard );
        $('#map-controls-bottom').mousedown( moveBack );
        $('#map-controls-right').mousedown( moveRight );
        $('#map-controls-left').mousedown( moveLeft );

        $('#map-controls-top').mouseup( stopMoveForard );
        $('#map-controls-bottom').mouseup( stopMoveBack );
        $('#map-controls-right').mouseup( stopMoveRight );
        $('#map-controls-left').mouseup( stopMoveLeft );

    };

    GOT.vent.on('appLoaded', init);

} ());
