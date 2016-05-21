/*
 * GOT
 * @author: ohmed
 * Controls
*/

GOT.controls = {

    mapDraggingEnabled: true,

    sideSpeed: 0,
    forwardSpeed: 0,
    zoomSpeed: 0,
    rotSpeed: 0,

    maxMoveSpeed: 4,
    maxZoomSpeed: 70,
    maxRotSpeed: 0.1,

    activeMovmentForward: false,
    activeMovmentSide: false,

    fInterval: false,
    sInterval: false,
    zInterval: false,
    rInterval: false,

    lookAtVector: new NWE.Vec3(),

    moveForward: function ( dirrection ) { // direction = 1 | -1

        var controls = GOT.controls;

        if ( controls.activeMovmentForward ) return;

        clearInterval( controls.fInterval );
        controls.activeMovmentForward = true;

        controls.fInterval = setInterval( function () {

            var delta = ( dirrection * controls.maxMoveSpeed ) - controls.forwardSpeed;

            controls.forwardSpeed += delta / 5;
            if ( Math.abs( delta ) < 0.4 ) clearInterval( controls.fInterval );

        }, 40 );

    },

    stopForward: function ( stopSpeed ) {

        var controls = GOT.controls;

        stopSpeed = stopSpeed || 5;

        if ( ! controls.activeMovmentForward ) return;

        clearInterval( controls.fInterval );
        controls.activeMovmentForward = false;

        controls.fInterval = setInterval( function () {

            controls.forwardSpeed -= controls.forwardSpeed / stopSpeed;
            if ( Math.abs( controls.forwardSpeed - 0 ) < 0.2 ) {

                clearInterval( controls.fInterval );
                controls.forwardSpeed = 0;

            }

        }, 40 );

    },

    moveSide: function ( dirrection ) { // direction = 1 | -1

        var controls = GOT.controls;

        if ( controls.activeMovmentSide ) return;

        clearInterval( controls.sInterval );
        controls.activeMovmentSide = true;

        controls.sInterval = setInterval( function () {

            var delta = ( dirrection * controls.maxMoveSpeed ) - controls.sideSpeed;

            controls.sideSpeed += delta / 5;
            if ( Math.abs( delta ) < 0.2 ) clearInterval( controls.sInterval );

        }, 40 );

    },

    stopSide: function ( stopSpeed ) {

        var controls = GOT.controls;

        stopSpeed = stopSpeed || 5;

        if ( ! controls.activeMovmentSide ) return;

        clearInterval( controls.sInterval );
        controls.activeMovmentSide = false;

        controls.sInterval = setInterval( function () {

            controls.sideSpeed -= controls.sideSpeed / stopSpeed;
            if ( Math.abs( controls.sideSpeed - 0 ) < 0.4 ) {

                clearInterval( controls.sInterval );
                controls.sideSpeed = 0;

            }

        }, 40 );

    },

    zoom: function ( deltaZoom, forseZoomSpeed ) {

        var controls = GOT.controls;
        var view = GOT.view;

        forseZoomSpeed = forseZoomSpeed || 1;

        if ( view.camera.position.y + forseZoomSpeed * Math.sign( deltaZoom ) * 80 > 4900 ) return;
        if ( view.camera.position.y + forseZoomSpeed * Math.sign( deltaZoom ) * 80 < 80 ) return;

        view.camera.oldYPosition = view.camera.position.y;
        view.camera.position.y += forseZoomSpeed * Math.sign( deltaZoom ) * 80;

        controls.lookAtVector.set( view.camera.position.x - 100 * Math.sin( view.rot ), 0.4 * view.camera.position.y + 20, view.camera.position.z - 100 * Math.cos( view.rot ) );
        view.camera.lookAt( controls.lookAtVector );

    },

    rotate: function ( deltaRot ) {

        var controls = GOT.controls;
        
        controls.rotSpeed += deltaRot / 90;

        clearInterval( controls.rInterval );

        controls.rInterval = setInterval( function () {

            var delta = deltaRot - controls.rotSpeed;

            controls.rotSpeed += delta / 1.5;

            if ( Math.abs(controls.rotSpeed) > controls.maxRotSpeed ) {

                controls.rotSpeed = (controls.maxRotSpeed - 0.01) * ( Math.abs(controls.rotSpeed) /controls.rotSpeed );
                delta = 0;

            }

            if ( Math.abs( delta ) < 0.01 ) {

                if ( deltaRot !== 0 ) {

                    controls.rotate(0);

                } else {

                    controls.rotSpeed = 0;
                    clearInterval( controls.rInterval );

                }

            }

        }, 40 );

    },

    init: function () {

        GOT.controls.mouse = new GOT.MouseControl();
        GOT.controls.keyboard = new GOT.KeyboardControl();

    }

};

//

GOT.MouseControl = function () {

    var self = this;

    self.state = '';

    self.setEvents();

};

GOT.MouseControl.prototype.setEvents = function () {

    var self = this;

    var mouseDownCoord = {
        x: 0,
        y: 0
    };

    var mouseDown = 0;

    var lastMouseMove = Date.now();

    self.globalEvents = {};

    /* ------------------------------------------------------------------------------------- */

    var mouseWheelCallback = function(event) {

        var delta = 0;

        delta = event.deltaY / 3;

        GOT.controls.zoom( - 5 * delta );

    };

    $(document).mousewheel(mouseWheelCallback);

};

//

GOT.KeyboardControl = function () {

    var self = this;
    var controls = GOT.controls;

    self.CTRL = 0;
    self.CMD = 0;
    self.SHIFT = 0;

    self.moveKeysPressed = 0;

    self.keys = {

        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        KEY_0: 48,
        KEY_1: 49,
        KEY_2: 50,
        KEY_3: 51,
        KEY_4: 52,
        KEY_5: 53,
        KEY_6: 54,
        KEY_7: 55,
        KEY_8: 56,
        KEY_9: 57,
        KEY_A: 65,
        KEY_B: 66,
        KEY_C: 67,
        KEY_D: 68,
        KEY_E: 69,
        KEY_F: 70,
        KEY_G: 71,
        KEY_H: 72,
        KEY_I: 73,
        KEY_J: 74,
        KEY_K: 75,
        KEY_L: 76,
        KEY_M: 77,
        KEY_N: 78,
        KEY_O: 79,
        KEY_P: 80,
        KEY_Q: 81,
        KEY_R: 82,
        KEY_S: 83,
        KEY_T: 84,
        KEY_U: 85,
        KEY_V: 86,
        KEY_W: 87,
        KEY_X: 88,
        KEY_Y: 89,
        KEY_Z: 90,
        LEFT_META: 91,
        RIGHT_META: 92,
        SELECT: 93,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        EQUALS: 187,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190,
        FORWARD_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        SINGLE_QUOTE: 222,

        CMD: 91

    };

    self.pressedKeys = [];

    self.movingKeysPressed = function () {

        return ( self.pressedKeys[self.keys.UP_ARROW] || self.pressedKeys[self.keys.KEY_W] ||
                 self.pressedKeys[self.keys.LEFT_ARROW] || self.pressedKeys[self.keys.KEY_A] ||
                 self.pressedKeys[self.keys.DOWN_ARROW] || self.pressedKeys[self.keys.KEY_S] ||
                 self.pressedKeys[self.keys.RIGHT_ARROW] || self.pressedKeys[self.keys.KEY_D] );

    };

    $(document).keydown(function ( event ) {

        event.stopPropagation();
        var key = event.keyCode;

        if ( self.pressedKeys[key] ) return;

        switch ( key ) {

            case self.keys.KEY_P:

                GOT.settings.togleGUI();
                break;

            case self.keys.UP_ARROW:
            case self.keys.KEY_W:

                controls.moveForward( -1 );

                break;

            case self.keys.LEFT_ARROW:
            case self.keys.KEY_A:

                controls.moveSide( -1 );

                break;

            case self.keys.DOWN_ARROW:
            case self.keys.KEY_S:

                controls.moveForward( 1 );

                break;

            case self.keys.RIGHT_ARROW:
            case self.keys.KEY_D:

                controls.moveSide( 1 );

                break;

            case self.keys.CTRL:

                self.CTRL = 1;

                break;

            case self.keys.CMD:

                self.CMD = 1;

                break;

            case self.keys.SHIFT:

                self.SHIFT = 1;

                break;

            case self.keys.KEY_Z:

                // Gameplay.toggleAllMenus();

                break;

        }

        self.pressedKeys[key] = true;

    });

    $(document).keyup(function ( event ) {

        event.stopPropagation();
        var key = event.keyCode;
        self.pressedKeys[key] = false;

        switch ( key ) {

            case self.keys.UP_ARROW:
            case self.keys.KEY_W:

                controls.stopForward();

                break;

            case self.keys.LEFT_ARROW:
            case self.keys.KEY_A:

                controls.stopSide();

                break;

            case self.keys.DOWN_ARROW:
            case self.keys.KEY_S:

                controls.stopForward();

                break;

            case self.keys.RIGHT_ARROW:
            case self.keys.KEY_D:

                controls.stopSide();

                break;

            case self.keys.CTRL:

                self.CTRL = 0;

                break;

            case self.keys.CMD:

                self.CMD = 0;

                break;

            case self.keys.SHIFT:

                self.SHIFT = 0;

                break;

        }

        self.moveKeysPressed = Math.max( self.moveKeysPressed, 0 );

    });

};
