/*
 * GOT
 * @author: ohmed
 * view
*/

GOT.view = {

    rot: 0,
    globalTime: new NWE.Clock(),
    moveTime: new NWE.Clock()

};

GOT.view.onWindowResize = function () {

    GOT.settings.windowWidth = window.innerWidth;
    GOT.settings.windowHeight = window.innerHeight;

    var resolution = GOT.settings.resolution;

    var SCREEN_WIDTH = resolution * window.innerWidth;
    var SCREEN_HEIGHT = resolution * window.innerHeight;

    GOT.view.camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    GOT.view.camera.updateProjectionMatrix();

    GOT.view.renderer.viewport.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    GOT.view.composer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

};

GOT.view.onClick = function ( event ) {

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // var landscapePoint = GOT.view.picker.pick({
    //                         x: mouseX,
    //                         y: mouseY
    //                     }, GOT.view.camera, 'landscape').point;

    // var cube = new NWE.gfx.Mesh( new NWE.gfx.CubeGeometry( 10, 10, 10 ), new NWE.gfx.MeshBasicMaterial({ color: 0xff0000 }) );
    // cube.position = landscapePoint;
    // cube.position.y += 10;
    // GOT.view.scene.add( cube );

    // console.log( landscapePoint );

    GOT.view.picker.pick({
                            x: mouseX,
                            y: mouseY
                        }, GOT.view.camera);

};

GOT.view.add = function ( object ) {

    GOT.view.scene.add( object );

};

GOT.view.remove = function ( mesh, matrialRemove ) {

    if ( ! mesh ) {

        return;

    }

    // remove mesh from scene
    var scene = mesh.parent;
    if ( ! scene ) return;

    scene.remove( mesh );

    setTimeout( function () {

        // remove geometry

        // if ( !isMOBILE ) {  // spike for mobile [ chrome crushes when dispose geo [from units mng update] ]

            mesh.geometry.dispose();

        // }

        // remove material
        if ( matrialRemove !== false ) {

            if ( !mesh.material ) {

                return;

            }

            mesh.material.dispose();

        }

        // remove mesh data
        mesh.remove();

        mesh = null;

    }, 500 );

};
