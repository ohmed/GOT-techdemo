/*
 * GOT
 * @author: ohmed
 * APP core
*/

GOT.setupScene = function () {

    // clock

    GOT.clock = new NWE.Clock();

    // renderer

    GOT.view.renderer = new NWE.gfx.WebGLRenderer({ canvas: document.querySelector('#viewport'), antialias: false });

    GOT.view.renderer.addPrePlugin( new NWE.gfx.ShadowMapPlugin() );
    GOT.view.renderer.shadowMapAutouUpdate = true;
    GOT.view.renderer.shadowMapEnabled = true;

    // create scene

    GOT.view.scene = new NWE.gfx.Scene();

    // add camera

    GOT.view.camera = new NWE.gfx.PerspectiveCamera( 40, GOT.settings.windowWidth / GOT.settings.windowHeight, 1, 5300 );
    GOT.view.camera.position = new NWE.Vec3( 0, 4900, 0, function () { GOT.vent.trigger('mapMove'); } );
    GOT.view.camera.lookAt(
        new NWE.Vec3(
                GOT.view.camera.position.x - 120 * Math.sin( GOT.view.rot ),
                0.4 * GOT.view.camera.position.y - 20,
                GOT.view.camera.position.z - 120 * Math.cos( GOT.view.rot )
            ) 
    );
    GOT.view.scene.add( GOT.view.camera );

    // composer

    NWE.gfx.EffectComposer.init();

    var renderTargetParametersRGBA = { minFilter: NWE.gfx.Const.LinearFilter, magFilter: NWE.gfx.Const.LinearFilter, format: NWE.gfx.Const.RGBAFormat };
    var depthTarget = new NWE.gfx.WebGLRenderTarget( GOT.settings.resolution * GOT.settings.windowWidth, GOT.settings.resolution * GOT.settings.windowHeight, renderTargetParametersRGBA );

    GOT.view.composer = new NWE.gfx.EffectComposer( GOT.view.renderer );
    GOT.view.composer.setSize( GOT.settings.resolution * GOT.settings.windowWidth, GOT.settings.resolution * GOT.settings.windowHeight );

    GOT.view.renderPass = new NWE.gfx.RenderPass( GOT.view.scene, GOT.view.camera );
    GOT.view.effectFXAA = new NWE.gfx.ShaderPass( new NWE.gfx.ShaderLib.FXAAShader() );
    GOT.view.effectSSAO = new NWE.gfx.ShaderPass( new NWE.gfx.ShaderLib.SSAOShader() );

    GOT.view.effectShowTexture = new NWE.gfx.TexturePass( depthTarget, 1 );
    GOT.view.effectShowTexture.enabled = false;

    //

    GOT.view.effectSSAO.uniforms[ 'tDepth' ].value = depthTarget;
    GOT.view.effectSSAO.uniforms[ 'size' ].value.set( GOT.settings.resolution * GOT.settings.windowWidth, GOT.settings.resolution * GOT.settings.windowHeight );
    GOT.view.effectSSAO.uniforms[ 'cameraNear' ].value = GOT.view.camera.near;
    GOT.view.effectSSAO.uniforms[ 'cameraFar' ].value = GOT.view.camera.far;

    // GOT.view.effectSSAO.uniforms[ 'fogNear' ].value = GOT.view.scene.fog.near;
    // GOT.view.effectSSAO.uniforms[ 'fogFar' ].value = GOT.view.scene.fog.far;
    // GOT.view.effectSSAO.uniforms[ 'fogEnabled' ].value = 1;
    // GOT.view.effectSSAO.uniforms[ 'aoClamp' ].value = 0.5;

    GOT.view.effectSSAO.material.defines[ 'RGBA_DEPTH' ] = true;
    GOT.view.effectSSAO.material.defines[ 'ONLY_AO_COLOR' ] = '1.0, 0.7, 0.5';

    // depth pass

    GOT.view.depthPassPlugin = new NWE.gfx.DepthPassPlugin();
    GOT.view.depthPassPlugin.renderTarget = depthTarget;
    GOT.view.depthPassPlugin.enabled = false;

    GOT.view.renderer.addPrePlugin( GOT.view.depthPassPlugin );

    //

    GOT.view.composer.addPass( GOT.view.renderPass );
    GOT.view.composer.addPass( GOT.view.effectSSAO );
    GOT.view.composer.addPass( GOT.view.effectFXAA );
    GOT.view.composer.addPass( GOT.view.effectShowTexture );

    GOT.view.composer.setLastPassToScreen();

    // add light

    // ambient light

    GOT.view.scene.add( new NWE.gfx.AmbientLight( 0xdddddd ) );

    // sun

    GOT.view.sun = new NWE.gfx.DirectionalLight( 0xffffff, 1 );
    GOT.view.sun.target.position.set( 220, 0, 220 );

    GOT.view.sun.castShadow = true;

    GOT.view.sun.shadowCameraNear = 1;
    GOT.view.sun.shadowCameraFar = 5000;
    GOT.view.sun.shadowCameraFov = 50;

    GOT.view.sun.shadowCameraLeft = - 6000;
    GOT.view.sun.shadowCameraRight = 6000;
    GOT.view.sun.shadowCameraTop = 6000;
    GOT.view.sun.shadowCameraBottom = - 6000;

    GOT.view.sun.shadowBias = 0.0001;
    GOT.view.sun.shadowDarkness = 0.25;

    GOT.view.sun.shadowMapWidth = 2048;
    GOT.view.sun.shadowMapHeight = 2048;

    GOT.view.scene.add( GOT.view.sun );

    //

    GOT.Loader.load( function () {

        GOT.controls.init();

        GOT.landscape = new GOT.Landscape();
        GOT.landscape.init();

        GOT.landscape.parseLandscapeData( 'got' );

        GOT.initRender();

        GOT.vent.trigger( 'appLoaded' );

    } );

    // setup picker

    GOT.view.picker = new Picker();

    // init settings

    GOT.settings.init();

};

GOT.initRender = function () {

    var renderer = GOT.view.renderer;
    var resolution = GOT.settings.resolution;

    renderer.viewport.setSize( resolution * GOT.settings.windowWidth, resolution * GOT.settings.windowHeight );

    renderer.domElement.style['z-index'] = 2;
    renderer.domElement.style.zIndex = 2;

    GOT.render();

};
