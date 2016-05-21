/*
 * GOT
 * @author: ohmed
 * Render loop
*/

(function () {

    var view = GOT.view;
    var controls = GOT.controls;

    var terrainSize;

    var cameraPosition;
    var lookAtVector = new NWE.Vec3();
    var delta;

    GOT.view.updateCameraPosition = function ( xval, zval ) {

        delta = 1000 * view.globalTime.getDelta();

        terrainSize = GOT.landscape.terrain.gridSize;

        cameraPosition = view.camera.position;

        // move camera

        xval = xval || ( view.camera.position.y / 400 * delta / 10 ) * (  controls.forwardSpeed * Math.sin( view.rot ) + controls.sideSpeed    * Math.cos( view.rot ) );
        zval = zval || ( view.camera.position.y / 400 * delta / 10 ) * ( -controls.sideSpeed    * Math.sin( view.rot ) + controls.forwardSpeed * Math.cos( view.rot ) );

        if ( cameraPosition.x + xval <  terrainSize / 2 * 3 && xval > 0 ) cameraPosition.x += xval;
        if ( cameraPosition.x + xval > -terrainSize / 2 * 3 && xval < 0 ) cameraPosition.x += xval;
        if ( cameraPosition.z + zval <  terrainSize / 2 * 3 && zval > 0 ) cameraPosition.z += zval;
        if ( cameraPosition.z + zval > -terrainSize / 2 * 3 && zval < 0 ) cameraPosition.z += zval;

        // rotate camera

        if ( controls.rotSpeed ) {

            view.rot += controls.rotSpeed;

        }

        // zoom camera

        if ( view.camera.oldYPosition !== view.camera.position.y ) {

            view.camera.oldYPosition = view.camera.position.y;
            var zoom = Math.max( Math.min( view.camera.position.y / 800, 1 ), 0.4 );

            if ( view.camera.position.y < 3000 ) {

                GOT.landscape.terrain.enableCliffUVCounting();

            } else {

                GOT.landscape.terrain.disableCliffUVCounting();

            }

            if ( view.camera.position.y < 180 ) {

                $('#map-controls-top').show();
                $('#map-controls-left').show();
                $('#map-controls-right').show();
                $('#map-controls-bottom').show();

                GOT.controls.mapDraggingEnabled = false;

                zoom = 1;

            } else {

                $('#map-controls-top').hide();
                $('#map-controls-left').hide();
                $('#map-controls-right').hide();
                $('#map-controls-bottom').hide();

                GOT.controls.mapDraggingEnabled = true;

            }

            if ( view.camera.position.y > 1500 ) {

                GOT.landscape.flora.goToLowDetailed();
                GOT.landscape.decorations.goToLowDetailed();

            } else {

                GOT.landscape.flora.goToHighDetailed();
                GOT.landscape.decorations.goToHighDetailed();

            }

            if ( GOT.view.sun.shadowCamera ) {

                var k;

                if  ( view.camera.position.y < 200 ) {

                    k = view.camera.position.y / 500;

                } else if ( view.camera.position.y < 2000 ) {

                    k = view.camera.position.y / 1500;

                } else {

                    k = 2;

                }

                GOT.view.sun.shadowCamera.top = 3000 * k;
                GOT.view.sun.shadowCamera.bottom = - 3000 * k;
                GOT.view.sun.shadowCamera.left = - 3000 * k;
                GOT.view.sun.shadowCamera.right = 3000 * k;

                GOT.view.sun.shadowCamera.updateProjectionMatrix();

            }

            if ( EDITOR_MODE ) {

                for ( var i = 0; i < 9; i ++ ) {

                    GOT.landscape.terrain.blocks[ i ].setZoom( zoom );

                }

            }

            if ( view.camera.position.y > 4900 ) view.camera.position.y = 4900;
            if ( view.camera.position.y < 80 ) view.camera.position.y = 80;

        }

    };

    GOT.render = function () {

        var delta = GOT.clock.getDelta();

        var view = GOT.view;

        requestAnimationFrame( GOT.render );

        //

        GOT.landscape.terrain.update( delta );

        view.scene.update( view.camera, delta );

        var pos;

        if  ( view.camera.position.y < 200 ) {

            pos = new NWE.Vec3( view.camera.position.x + view.camera.position.y / 2, 240, view.camera.position.z - 500 );
            GOT.view.sun.position.set( pos.x + 120, pos.y, pos.z );

        } else if ( view.camera.position.y < 2000 ) {

            pos = new NWE.Vec3( view.camera.position.x + view.camera.position.y / 2, 240, view.camera.position.z );
            GOT.view.sun.position.set( pos.x + 120, pos.y, pos.z );

        } else {

            pos = new NWE.Vec3( 0, 240, 0 );
            GOT.view.sun.position.set( pos.x + 0, pos.y, pos.z );

        }

        GOT.view.sun.target.position.set( pos.x, 0, pos.z );
        GOT.view.sun.target.updateMatrixWorld();

        if ( GOT.settings.postprocessing.on ) {

            view.composer.render();

        } else {

            view.renderer.render( view.scene, view.camera );

        }

        GOT.view.updateCameraPosition();

    };

}) ();
