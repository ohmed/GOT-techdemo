/*
 * GOT
 * @author: ohmed
*/

GOT.Settings = function () {

    window.DEBUG = 1;
    window.EDITOR_MODE = + localStorage.getItem( 'edit_mode' );

    //

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    this.resolution = 1;

    this.postprocessing = {

        on:         true,
        FXAA:       true,
        SSAO:       false,
        onlyDepth:  false

    };

    this.world = {

        flora:          true,
        decorations:    true,
        buildings:      true,
        water:          true,
        terrain:        true

    };

    //

    this.showBuildingsPopups = true;

    //

    if ( EDITOR_MODE ) {

        this.showBuildingsPopups = false;

    }

};

GOT.Settings.prototype.init = function () {

    this.initGUI();

    GOT.view.effectFXAA.enabled = this.postprocessing.FXAA;
    GOT.view.effectSSAO.enabled = this.postprocessing.SSAO;
    GOT.view.depthPassPlugin.enabled = this.postprocessing.SSAO;

    if ( this.postprocessing.onlyDepth ) {

        GOT.view.effectShowTexture.enabled = true;
        GOT.view.depthPassPlugin.enabled = true;

        GOT.view.effectSSAO.enabled = false;
        GOT.view.effectFXAA.enabled = false;

    }

    GOT.view.composer.setLastPassToScreen();

};

GOT.Settings.prototype.initGUI = function () {

    var self = this;

    this.gui = new dat.GUI();

    var gfx, world, ui;

    //

    gfx = this.gui.addFolder( 'Rendering' );

    this.gui.resolution = gfx.add( this, 'resolution', 0.0, 1.0, 0.1 ).name( 'Rsolution' ).onChange( function () { 

        GOT.view.onWindowResize();

    });

    this.gui.postprocess = gfx.add( this.postprocessing, 'on' ).name( 'Postprocessing' );

    this.gui.fxaa = gfx.add( this.postprocessing, 'FXAA' ).name( 'FXAA' ).onChange( function ( value ) {

        GOT.view.effectFXAA.enabled = value;
        GOT.view.composer.setLastPassToScreen();

    });

    this.gui.ssao = gfx.add( this.postprocessing, 'SSAO' ).name( 'SSAO' ).onChange( function ( value ) {

        GOT.view.effectSSAO.enabled = value;
        GOT.view.depthPassPlugin.enabled = value;

        GOT.view.composer.setLastPassToScreen();

    });

    this.gui.onlyDepth = gfx.add( this.postprocessing, 'onlyDepth' ).name( 'Depth' ).onChange( function ( value ) {

        GOT.view.effectShowTexture.enabled = value;
        GOT.view.depthPassPlugin.enabled = value;

        GOT.view.effectSSAO.enabled = ( ! value ) ? self.postprocessing.SSAO : false;
        GOT.view.effectFXAA.enabled = ( ! value ) ? self.postprocessing.FXAA : false;

        GOT.view.composer.setLastPassToScreen();

    });

    //

    world = this.gui.addFolder( 'World' );

    this.gui.flora = world.add( this.world, 'flora' ).name( 'Flora' ).onChange( function ( value ) { 

        if ( value ) {

            GOT.landscape.flora.show();

        } else {

            GOT.landscape.flora.hide();

        }

    });

    this.gui.decorations = world.add( this.world, 'decorations' ).name( 'Decorations' ).onChange( function ( value ) { 

        if ( value ) {

            GOT.landscape.decorations.show();

        } else {

            GOT.landscape.decorations.hide();

        }

    });

    this.gui.buildings = world.add( this.world, 'buildings' ).name( 'Buildings' ).onChange( function ( value ) { 

        if ( value ) {

            GOT.landscape.buildings.show();

        } else {

            GOT.landscape.buildings.hide();

        }

    });

    this.gui.water = world.add( this.world, 'water' ).name( 'Water' ).onChange( function ( value ) { 

        if ( value ) {

            GOT.landscape.terrain.water.show();

        } else {

            GOT.landscape.terrain.water.hide();

        }

    });

    this.gui.terrain = world.add( this.world, 'terrain' ).name( 'Terrain' ).onChange( function ( value ) { 

        if ( value ) {

            GOT.landscape.terrain.show();

        } else {

            GOT.landscape.terrain.hide();

        }

    });

    //

    ui = this.gui.addFolder( 'UI' );

    this.gui.buildingsPopups = ui.add( this, 'showBuildingsPopups' ).name( 'ShowBuildingsPopups' );

    //

    this.gui.domElement.parentNode.id = 'settings-gui';

};

GOT.Settings.prototype.togleGUI = function () {

    var element = this.gui.domElement.parentNode;

    if ( element.style['display'] === 'none' ) {

        element.style['display'] = 'block';

    } else {

        element.style['display'] = 'none';

    }

};

GOT.Settings.prototype.resetDefault = function () {

    // todo

};

GOT.settings = new GOT.Settings();
