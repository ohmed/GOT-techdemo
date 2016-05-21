/*
 * GOT
 * @author: ohmed
*/

var Editor = function () {

};

Editor.prototype.init = function () {

    this.oldMousePosition = new NWE.Vec2();

    this.actions = [];
    this.activeActionId = -1;

    document.querySelector('#editor').style['display'] = 'block';

    this.marker = {
        size: 20,
        type: null,
        subtype: null,
        mousePressed: false,
        position: new NWE.Vec2(),
        enabled: false
    };

    //

    document.addEventListener( 'keydown', this.onKeyDown.bind( this ), false );
    document.addEventListener( 'keyup', this.onKeyUp.bind( this ), false );

    document.addEventListener( 'mousemove', this.onMouseMove.bind( this ), false );
    document.addEventListener( 'mouseup', this.onMouseUp.bind( this ), false );
    document.addEventListener( 'mousedown', this.onMouseDown.bind( this ), false );
    document.body.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );

};

Editor.prototype.selectTab = function ( tabName ) {

    var items = document.querySelectorAll('#editor .main-menu');

    for ( var i = 0, il = items.length; i < il; i ++ ) {

        items[ i ].style['display'] = 'none';

    }

    document.querySelector('#editor #' + tabName).style['display'] = 'block';

};

//

Editor.prototype.clearNextActions = function () {

    for ( var i = this.activeActionId + 1, il = this.actions.length; i < il; i ++ ) {

        this.actions.pop();

    }

};

Editor.prototype.addAction = function ( type ) {

    this.actions.push( type );
    this.activeActionId ++;

    switch ( type ) {

        case 'terrain':

            this.terrain.saveState();
            break;

        case 'flora':

            this.flora.saveState();
            break;

    }

};

Editor.prototype.undo = function () {

    if ( this.actions[ this.activeActionId ] ) {

        switch ( this.actions[ this.activeActionId ] ) {

            case 'terrain':

                this.terrain.undo();
                break;

            case 'flora':

                this.flora.undo();
                break;

        }

        this.activeActionId --;

    } else {

        NWE.Logger.log( 'No prev actions found.' );

    }

};

Editor.prototype.redo = function () {

    if ( this.actions[ this.activeActionId + 1 ] ) {

        switch ( this.actions[ this.activeActionId + 1 ] ) {

            case 'terrain':

                this.terrain.redo();
                break;

            case 'flora':

                this.flora.redo();
                break;

        }

        this.activeActionId ++;

    } else {

        NWE.Logger.log( 'No next actions found.' );

    }

};

//

Editor.prototype.selectMarker = function ( type, subtype ) {

    this.marker.type = type;
    this.marker.subtype = subtype;

    for ( var i = 0, il = GOT.landscape.terrain.blocks.length; i < il; i ++ ) {

        if ( ! GOT.landscape.terrain.blocks[ i ].getInternal('material').uniforms.marker.value ) {

            GOT.landscape.terrain.blocks[ i ].getInternal('material').uniforms.marker.value = new NWE.Vec3( -10000, -10000, this.marker.size );

        }

    }

    this.enableMarker();

};

Editor.prototype.setMarkerSize = function ( value ) {

    this.marker.size = value;

    for ( var i = 0, il = GOT.landscape.terrain.blocks.length; i < il; i ++ ) {

        GOT.landscape.terrain.blocks[ i ].getInternal('material').uniforms.marker.value.z = value;

    }

};

Editor.prototype.enableMarker = function () {

    this.marker.enabled = true;

};

Editor.prototype.disableMarker = function () {

    this.marker.enabled = false;
    this.updateMarkerPosition( -10000, -10000 );

};

Editor.prototype.updateMarkerPosition = function ( mouseX, mouseY ) {

    mouseX = mouseX || this.oldMousePosition.x;
    mouseY = mouseY || this.oldMousePosition.y;

    var position = GOT.view.picker.pick( { x: mouseX, y: mouseY }, GOT.view.camera, 'landscape' ).point;
    var vec3;

    for ( var i = 0, il = GOT.landscape.terrain.blocks.length; i < il; i ++ ) {

        vec3 = GOT.landscape.terrain.blocks[ i ].getInternal('material').uniforms.marker.value;

        vec3.x = (   position.x - GOT.landscape.terrain.blocks[ i ].position.x ) / GOT.landscape.terrain.gridSize + 0.5;
        vec3.y = ( - position.z + GOT.landscape.terrain.blocks[ i ].position.z ) / GOT.landscape.terrain.gridSize + 0.5;

    }

    this.marker.position.set( position.x / GOT.landscape.mapSize + 0.5, position.z / GOT.landscape.mapSize + 0.5 );

};

Editor.prototype.markerDraw = function ( mouseX, mouseY ) {

    if ( this.marker.mousePressed && ( Math.abs( this.oldMousePosition.x - mouseX ) > 5 || Math.abs( this.oldMousePosition.y - mouseY ) > 5 ) ) {

        this.oldMousePosition.set( mouseX, mouseY );
        $('body').addClass('default');

        if ( this.marker.type === 'terrain' ) {

            this.terrain.draw( this.marker );

        } else if ( this.marker.type === 'flora' ) {

            if ( this.marker.subtype === 'Eraser' ) {

                this.flora.erase( this.marker );

            } else {

                this.flora.draw( this.marker );

            }

        } else if ( this.marker.type === 'decorations' ) {

            if ( this.marker.subtype === 'Eraser' ) {

                this.decorations.erase( this.marker );

            } else {

                this.decorations.draw( this.marker );

            }

        }

    }

};

//

Editor.prototype.onMouseDown = function ( event ) {

    if ( event.which === 3 ) {

        this.disableMarker();
        return;

    }

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    this.marker.mousePressed = true;

    if ( this.marker.enabled ) {

        this.oldMousePosition.set( -100, -100 );
        this.markerDraw( mouseX, mouseY );

    }

};

Editor.prototype.onMouseUp = function ( event ) {

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    if ( this.marker.type === 'flora' ) {

        this.flora.update();

    }

    if ( this.marker.enabled ) {

        this.clearNextActions();
        this.addAction( this.marker.type );

    }

    this.marker.mousePressed = false;

};

Editor.prototype.onMouseMove = function ( event ) {

    event.preventDefault();

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    if ( this.marker.enabled ) {

        this.updateMarkerPosition( mouseX, mouseY );
        this.markerDraw( mouseX, mouseY );

    }

};

Editor.prototype.onMouseWheel = function ( event ) {

    var delta = event.wheelDelta;

    if ( this.marker.enabled ) {

        this.marker.size += delta / 100;

        for ( var i = 0, il = GOT.landscape.terrain.blocks.length; i < il; i ++ ) {

            this.setMarkerSize( this.marker.size );

        }

        event.stopPropagation();
        event.preventDefault();
        return false;

    }

};

//

Editor.prototype.onKeyDown = function ( event ) {

    switch ( event.keyCode ) {

        case 90:  // Z

            if ( ( GOT.controls.keyboard.CMD || GOT.controls.keyboard.CTRL ) && GOT.controls.keyboard.SHIFT ) {

                this.redo();
                break;

            }

            if ( GOT.controls.keyboard.CMD || GOT.controls.keyboard.CTRL ) {

                this.undo();
                break;

            }

            break;

    }

};

Editor.prototype.onKeyUp = function ( event ) {

};

//

GOT.editor = new Editor();
