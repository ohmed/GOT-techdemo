(function () {

    var mousedown = false;
    var position;

    function onMouseDown ( event ) {

        if ( ! GOT.controls.mapDraggingEnabled ) return;

        if ( EDITOR_MODE && GOT.editor.marker.enabled ) return;

        event.preventDefault();

        mousedown = true;

        position = {

            x: event.clientX,
            y: event.clientY

        };

        $('body').addClass('cursor-grab');

    };

    function onMouseMove ( event ) {

        if ( ! GOT.controls.mapDraggingEnabled ) return;

        if ( EDITOR_MODE && GOT.editor.marker.enabled ) return;

        if ( ! mousedown ) return;

        var deltaX = event.clientX - position.x;
        var deltaY = event.clientY - position.y;

        var delta = GOT.view.picker.deltaScreenToWorld( 0, 0, deltaX, deltaY );

        var k = 0;
        var steps = 10;

        var interval = setInterval( function () {

            GOT.view.updateCameraPosition( delta.dx / steps, delta.dz / steps );

            k ++;

            if ( k === steps ) {

                clearInterval( interval );

            }

        }, 20);

        position = {

            x: event.clientX,
            y: event.clientY

        };

        $('body').addClass('cursor-grabbing');

    };

    function onMouseUp () {

        if ( ! GOT.controls.mapDraggingEnabled ) return;

        mousedown = false;

        $('body').removeClass('cursor-grab cursor-grabbing');

    };

    function init () {

        $('body').on( 'mousedown', onMouseDown );
        $('body').on( 'mousemove', onMouseMove );
        $('body').on( 'mouseup', onMouseUp );

    };

    GOT.vent.on('appLoaded', init);

} ());
