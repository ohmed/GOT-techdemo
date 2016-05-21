/*
 * GOT
 * @author: ohmed
 * ALL building [visual meshes] handling
*/

GOT.BuildingManager = function ( params ) {

    params = params || {};

    this.landscape = params.landscape || false;

    this.texturesID = {
        'Castle01': 0,
        'Roof01': 0,
        'Roof02': 0,
        'Roof03': 0,
        'Wall01': 0,
        'Wall02': 0,
        'Wall03': 0,
        'Wall04': 0,
        'Field01': 0,
        'stone1': 0
    };

    this.blocksCount = params.blocksCount || 9 * 25;
    this.blocks = [];

    var textureAtlas = GOT.ResourceMng.getTexture( 'buildings' );

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        var group = new NWE.fw.StaticGroup();
        group.setAtlasTexture( textureAtlas, 4 );

        this.blocks.push( group );

    }

};

GOT.BuildingManager.prototype.add = function ( building ) {

    var TYPE = building.name + building.subtype;
    var terrainSize = this.landscape.terrain.gridSize;

    // move position coords to +/+ quater
    var x = building.position.x + 3 * terrainSize / 2;
    var z = building.position.z + 3 * terrainSize / 2;

    var blockSize = GOT.landscape.mapSize / 15;

    var blockID = Math.floor( x / blockSize ) + 15 * Math.floor( z / blockSize );
    var block = this.blocks[ blockID ];

    var instance = block.addInstance({
        type:       TYPE,
        position:   building.position.clone(),
        rotation:   building.rotation.clone(),
        scale:      building.scale.clone(),
        model:      GOT.ResourceMng.getRawGeometry( Building.list.buildings[ TYPE ].model ),
        texturesID: this.texturesID
    });

    return instance;

};

GOT.BuildingManager.prototype.deferredUpdate = function () {

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

};

GOT.BuildingManager.prototype.addToScene = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        if ( this.blocks[ i ].instances.length ) {

            this.blocks[ i ].getInternal('mesh').castShadow = true;
            this.blocks[ i ].getInternal('mesh').receiveShadow = true;

            GOT.view.scene.add( this.blocks[ i ] );

        }

    }

};

GOT.BuildingManager.prototype.show = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.BuildingManager.prototype.hide = function () {

    for ( var i = 0, il = this.blocksCount; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

};
