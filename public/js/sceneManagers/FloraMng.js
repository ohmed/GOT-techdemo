/*
 * GOT
 * @author: ohmed
 * Flora [visual meshes] handling
*/

GOT.FloraManager = function ( params ) {

    params = params || {};

    this.landscape = params.landscape || false;

    this.texturesID = {
        'tree-leaves01':    0,
        'bush01':           1,
        'bush02':           2
    };

    this.blocksCount = params.blocksCount || 9 * 25;
    this.blocks = [];

    this.textureAtlas = GOT.ResourceMng.getTexture( 'flora' );

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        var group = new NWE.fw.StaticGroup();

        group.material.uniforms.ambient.value.setRGB( 0.95, 0.95, 0.95 );
        group.material.transparent = true;
        group.material.defines[ 'ALPHATEST' ] = '1.0';
        group.material.uniforms[ 'alphaTest' ].value = 0.4;
        group.setAtlasTexture( this.textureAtlas, 4 );

        this.blocks.push( group );

    }

    this.globalSG = new NWE.fw.StaticGroup();
    this.globalSG.material.uniforms.ambient.value.setRGB( 0.95, 0.95, 0.95 );
    this.globalSG.material.transparent = true;
    this.globalSG.material.defines[ 'ALPHATEST' ] = '1.0';
    this.globalSG.material.uniforms[ 'alphaTest' ].value = 0.4;
    this.globalSG.setAtlasTexture( this.textureAtlas, 4 );
    this.globalSG.visible = false;

};

GOT.FloraManager.prototype.add = function ( plant ) {

    var terrainSize = this.landscape.terrain.gridSize;

    // move position coords to +/+ quater
    var x = plant.position.x + 3 * terrainSize / 2;
    var z = plant.position.z + 3 * terrainSize / 2;

    var blockSize = GOT.landscape.mapSize / 15;

    var blockID = Math.floor( x / blockSize ) + 15 * Math.floor( z / blockSize );
    var block = this.blocks[ blockID ];

    var part = '_lod1';
    if ( plant.subtype === '03' || plant.name === 'Bush' ) part = '';

    var instance = block.addInstance({
        type:       plant.name + plant.subtype,
        position:   new NWE.Vec3( plant.position.x, plant.position.y, plant.position.z ),
        rotation:   plant.rotation,
        scale:      plant.scale / 2.5,
        model:      GOT.ResourceMng.getRawGeometry( plant.name + plant.subtype ),
        texturesID: this.texturesID
    });

    this.globalSG.addInstance({
        type:       plant.name + plant.subtype,
        position:   new NWE.Vec3( plant.position.x, plant.position.y, plant.position.z ),
        rotation:   plant.rotation,
        scale:      plant.scale / 2.5,
        model:      GOT.ResourceMng.getRawGeometry( plant.name + plant.subtype + part ),
        texturesID: this.texturesID
    });

    return instance;

};

GOT.FloraManager.prototype.deferredUpdate = function () {

    var mapSize = GOT.landscape.mapSize;
    var blockSize = GOT.landscape.mapSize / 15;

    var shader = new NWE.gfx.ShaderLib.DepthRGBA();

    var material = new NWE.gfx.ShaderMaterial( {
        defines: shader.defines,
        uniforms: shader.uniforms,
        attributes: shader.attributes,
        varyings: shader.varyings,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    } );

    material.uniforms['objectTexture'].value = this.textureAtlas;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        if ( this.blocks[ i ].instances.length ) {

            this.blocks[ i ].updateGeometry();

            this.blocks[ i ].getInternal('mesh').geometry.boundingSphere = null;
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox = new NWE.Box3();
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox.min.set( blockSize / 2 + blockSize * ( i % 15 ) - mapSize / 2 - blockSize / 2, -10, blockSize / 2 + blockSize * Math.floor( i / 15 ) - mapSize / 2 - blockSize / 2 );
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox.max.set( blockSize / 2 + blockSize * ( i % 15 ) - mapSize / 2 + blockSize / 2,  10, blockSize / 2 + blockSize * Math.floor( i / 15 ) - mapSize / 2 + blockSize / 2 );

            this.blocks[ i ].getInternal('mesh').customDepthMaterial = material;

        }

    }

    this.globalSG.updateGeometry();
    this.globalSG.getInternal('mesh').customDepthMaterial = material;

};

GOT.FloraManager.prototype.goToLowDetailed = function () {

    this.globalSG.visible = true;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

};

GOT.FloraManager.prototype.goToHighDetailed = function () {

    this.globalSG.visible = false;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.FloraManager.prototype.update = function () {

    // var i, il, 
    //     windOffset, windDirr;

    // for ( i = 0, il = blocks.length; i < il; i ++ ) {

    //     // update wind [will be changed]
    //     windOffset = blocks[ i ].mesh.material.uniforms.windOffset;

    //     if ( windOffset.value > 1 ) windDirr = -1;
    //     if ( windOffset.value <= 0 ) windDirr = 1;

    //     windOffset.value += windDirr * 0.0005;

    // }

};

GOT.FloraManager.prototype.addToScene = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        if ( this.blocks[ i ].instances.length ) {

            this.blocks[ i ].getInternal('mesh').castShadow = true;
            this.blocks[ i ].getInternal('mesh').receiveShadow = true;
            GOT.view.scene.add( this.blocks[ i ] );
            this.blocks[ i ].visible = false;

        }

    }

    this.globalSG.getInternal('mesh').castShadow = true;
    this.globalSG.getInternal('mesh').receiveShadow = true;
    GOT.view.scene.add( this.globalSG );

};

GOT.FloraManager.prototype.show = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.FloraManager.prototype.hide = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

    this.globalSG.visible = false;

};
