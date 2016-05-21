/*
 * GOT
 * @author: ohmed
 * ALL decorations [visual meshes] handling
*/

GOT.DecorationManager = function ( params ) {

    params = params || {};

    this.landscape = params.landscape || false;

    this.texturesID = {
        'stone01':          0,
        'ground-block01':   1,
        'ground-block02':   2,
        'gold01':           3,
        'SRocks':           4
    },

    this.blocksCount = params.blocksCount || 9 * 25;
    this.blocks = [];

    var textureAtlas = GOT.ResourceMng.getTexture( 'decorations' );

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        var group = new NWE.fw.StaticGroup();
        group.material.transparent = true;
        group.material.defines[ 'ALPHATEST' ] = '1.0';
        group.material.uniforms[ 'alphaTest' ].value = 0.4;
        group.setAtlasTexture( textureAtlas, 4 );

        this.blocks.push( group );

    }

    this.globalSG = new NWE.fw.StaticGroup();
    this.globalSG.material.transparent = true;
    this.globalSG.material.defines[ 'ALPHATEST' ] = '1.0';
    this.globalSG.material.uniforms[ 'alphaTest' ].value = 0.4;
    this.globalSG.setAtlasTexture( textureAtlas, 4 );
    this.globalSG.visible = false;

};

GOT.DecorationManager.prototype.add = function ( decoration ) {

    var TYPE = decoration.name + decoration.subtype;
    var terrainSize = this.landscape.terrain.gridSize;

    // move position coords to +/+ quater
    var x = decoration.position.x + 3 * terrainSize / 2;
    var z = decoration.position.z + 3 * terrainSize / 2;

    var blockSize = GOT.landscape.mapSize / 15;

    var blockID = Math.floor( x / blockSize ) + 15 * Math.floor( z / blockSize );
    var block = this.blocks[ blockID ];

    var instance = block.addInstance({
        type:       TYPE,
        position:   decoration.position.clone(),
        rotation:   decoration.rotation.clone(),
        scale:      new NWE.Vec3( 1 ),
        model:      GOT.ResourceMng.getRawGeometry( TYPE ),
        texturesID: this.texturesID
    });

    this.globalSG.addInstance({
        type:       TYPE,
        position:   decoration.position.clone(),
        rotation:   decoration.rotation.clone(),
        scale:      new NWE.Vec3( 1 ),
        model:      GOT.ResourceMng.getRawGeometry( TYPE ),
        texturesID: this.texturesID
    });

    return instance;

};

GOT.DecorationManager.prototype.deferredUpdate = function () {

    var mapSize = GOT.landscape.mapSize;
    var blockSize = GOT.landscape.mapSize / 15;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        if ( this.blocks[ i ].instances.length ) {

            this.blocks[ i ].updateGeometry();

            this.blocks[ i ].getInternal('mesh').geometry.boundingSphere = null;
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox = new NWE.Box3();
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox.min.set( blockSize / 2 + blockSize * ( i % 15 ) - mapSize / 2 - blockSize / 2, -10, blockSize / 2 + blockSize * Math.floor( i / 15 ) - mapSize / 2 - blockSize / 2 );
            this.blocks[ i ].getInternal('mesh').geometry.boundingBox.max.set( blockSize / 2 + blockSize * ( i % 15 ) - mapSize / 2 + blockSize / 2,  10, blockSize / 2 + blockSize * Math.floor( i / 15 ) - mapSize / 2 + blockSize / 2 );

        }

    }

    this.globalSG.updateGeometry();

};

GOT.DecorationManager.prototype.goToLowDetailed = function () {

    this.globalSG.visible = true;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

};

GOT.DecorationManager.prototype.goToHighDetailed = function () {

    this.globalSG.visible = false;

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.DecorationManager.prototype.addToScene = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        if ( this.blocks[ i ].instances.length ) {

            this.blocks[ i ].getInternal('mesh').castShadow = true;
            this.blocks[ i ].getInternal('mesh').receiveShadow = true;

            GOT.view.scene.add( this.blocks[ i ] );

        }

    }

    this.globalSG.getInternal('mesh').castShadow = true;
    // this.globalSG.getInternal('mesh').receiveShadow = true;
    GOT.view.scene.add( this.globalSG );

};

GOT.DecorationManager.prototype.show = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.DecorationManager.prototype.hide = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

    this.globalSG.visible = false;

};
