/*
 * GOT
 * @author: ohmed
 * Terrain control
*/

GOT.Terrain = function () {

    this.gridNodeCount = 101; // 100x100
    
    this.gridSize = 2033; // 2033x2033

    this.textureMapSize = 1024;

};

GOT.Terrain.prototype.generate = function () {

    var self = this;

    this.blocks = [];

    //

    var texture = GOT.ResourceMng.getTexture( 'landscape' );
    var k = 0;

    if ( EDITOR_MODE ) {

        for ( var j = 0; j < 3; j ++ ) {

            for ( var i = 0; i < 3; i ++ ) {

                var terrain = new NWE.fw.DynamicTerrain({
                    width: this.gridSize,
                    height: this.gridSize,
                    gridWidthNodeCount: 200,
                    gridHeightNodeCount: 200,
                    visiblePartSize: this.gridSize
                });

                terrain.getInternal('material').uniforms.noiseTexture.value = GOT.ResourceMng.getTexture( 'wind01' );
                terrain.getInternal('material').uniforms.zoom.value = 1;

                terrain.setAtlasTexture( texture, 4 );

                this.blocks.push( terrain );

                var dx = - this.gridSize + i * this.gridSize;
                var dz = - this.gridSize + j * this.gridSize;

                terrain.position.set( dx, 0, dz );

                if ( ! EDITOR_MODE ) {

                    ( function ( id, object ) {

                        GOT.map.loadMapping( 'map' + ( id + 1 ), function ( mapping ) {

                            object.setMapping( mapping );

                        });

                    }) ( k, terrain );

                } else {

                    GOT.map.loadMapping( 'mappingDev', function ( mapping ) {

                        GOT.editor.terrain.prepareMapping( mapping );
                        GOT.editor.terrain.updateMapping();

                    });

                }

                GOT.view.add( terrain );

                terrain.getInternal('mesh').geometry.boundingSphere = null;
                terrain.getInternal('mesh').geometry.boundingBox = new NWE.Box3();
                terrain.getInternal('mesh').geometry.boundingBox.min.set( - this.gridSize / 2, -10, - this.gridSize / 2 );
                terrain.getInternal('mesh').geometry.boundingBox.max.set( + this.gridSize / 2,  10, + this.gridSize / 2 );

                k ++;

            }

        }

    } else {

        var terrain = new NWE.fw.StaticTerrain( { width: 3 * this.gridSize, height: 3 * this.gridSize, zoom: 1, blocksXCount: 3, blocksYCount: 3 } );
        terrain.setup();

        var geometry;

        geometry = GOT.ResourceMng.getGeometry( 'Terrain1' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 0 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain2' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 1 ].setGeometryLevel( geometry, 800 );

        terrain.blocks[ 2 ].enabled = false;

        geometry = GOT.ResourceMng.getGeometry( 'Terrain4' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 3 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain5' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 4 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain6' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 5 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain7' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 6 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain8' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 7 ].setGeometryLevel( geometry, 800 );

        geometry = GOT.ResourceMng.getGeometry( 'Terrain9' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        geometry.applyMatrix( new NWE.Matrix4().makeTranslation( 0, -12, 0 ) );
        terrain.blocks[ 8 ].setGeometryLevel( geometry, 800 );

        terrain.matchEdges();

        for ( var i = 0; i < 9; i ++ ) {

            terrain.blocks[ i ].setAtlasTexture( texture, 4 );

            if ( terrain.blocks[ i ].enabled ) {

                terrain.blocks[ i ].object.objects[0].object.receiveShadow = true;
                terrain.blocks[ i ].object.objects[0].object.castShadow = false;
                terrain.blocks[ i ].material.uniforms.noiseTexture.value = GOT.ResourceMng.getTexture( 'random' );

            }

            ( function ( id, object ) {

                GOT.map.loadMapping( 'map' + ( id + 1 ), function ( mapping ) {

                    object.blocks[ id ].useMappingTexture( mapping );

                });

            }) ( i, terrain );

        }

        terrain.position.y = 1;

        GOT.view.scene.add( terrain );

        GOT.landscape.terrain.object = terrain;

        // add bottom ground plane

        var bottomTexture = GOT.ResourceMng.getTexture( 'ground' );
        bottomTexture.repeat.set( 20, 20 );
        bottomTexture.wrapS = NWE.gfx.Const.RepeatWrapping;
        bottomTexture.wrapT = NWE.gfx.Const.RepeatWrapping;
        geometry = GOT.ResourceMng.getGeometry( 'BottomGround' );
        geometry.applyMatrix( new NWE.Matrix4().makeScale( 10, 10, 10 ) );
        this.bottom = new NWE.gfx.Mesh( geometry, new NWE.gfx.MeshLambertMaterial({ ambient: 0x888888, map: bottomTexture }) );
        this.bottom.position.set( 0, -45, 0 );
        GOT.view.scene.add( this.bottom );

    }

    // add water plane

    this.water = new GOT.Water();

};

GOT.Terrain.prototype.update = function ( delta ) {

    if ( EDITOR_MODE ) {

        for ( var i = 0, il = this.blocks.length; i < il; i ++ ) {

            this.blocks[ i ].update( GOT.view.scene, GOT.view.camera );

        }

    }

    this.water.update( delta );

};

GOT.Terrain.prototype.createEdges = function () {

    // todo

};

GOT.Terrain.prototype.enableCliffUVCounting = function () {

    if ( EDITOR_MODE ) {

        for ( var i = 0, il = this.blocks.length; i < il; i ++ ) {

            this.blocks[ i ].getInternal('mesh').material.uniforms.useCliffTexture.value = 1;

        }

    } else {

        for ( var i = 0, il = this.object.blocks.length; i < il; i ++ ) {

            this.object.blocks[ i ].material.uniforms.useCliffTexture.value = 1;

        }

    }

};

GOT.Terrain.prototype.disableCliffUVCounting = function () {

    if ( EDITOR_MODE ) {

        for ( var i = 0, il = this.blocks.length; i < il; i ++ ) {

            this.blocks[ i ].getInternal('mesh').material.uniforms.useCliffTexture.value = 0;

        }

    } else {

        for ( var i = 0, il = this.object.blocks.length; i < il; i ++ ) {

            this.object.blocks[ i ].material.uniforms.useCliffTexture.value = 0;

        }

    }

};

GOT.Terrain.prototype.getPoint = function ( x, z ) {

    // ctx = this.textureMapCanvasCtx[ 0 ];
    // tmp

    var offset = 22;

    var ctx = GOT.editor.terrain.ctx;
    var size = ctx.canvas.width;
    var sizeReal = size - 2 * offset;
    var data = this.tmpHCache = this.tmpHCache || ctx.getImageData( offset, offset, sizeReal, sizeReal ).data;

    // convert position to canvas position
    x = Math.round( ( size / 2 ) * Math.max( x, 0 ) ) - 4;
    z = Math.round( ( size / 2 ) * Math.max( z, 0 ) ) - 4;

    // get mapping Points
    var id1 = 4 * ( x + z * sizeReal ),
        id2 = 4 * ( ( x + sizeReal / 2 ) + z * sizeReal ),
        id3 = 4 * ( x + ( z + sizeReal / 2 ) * sizeReal ),
        id4 = 4 * ( ( x + sizeReal / 2 ) + ( z + sizeReal / 2 ) * sizeReal );

    return [

        data[ id1 + 0 ],  // [0] ground01
        data[ id1 + 1 ],  // [1] grass01
        data[ id1 + 2 ],  // [2] grass02
        data[ id2 + 0 ],  // [3] stone01
        data[ id2 + 1 ],  // [4] iron01
        data[ id2 + 2 ],  // [5] swamp01
        // ...
        0, 0, 0, 0, 0, 0, 0,
        // ...
        data[ id4 + 1 ],  // [13] building height
        data[ id4 + 2 ] - 128  // [14] terrain height

    ];

};

GOT.Terrain.prototype.getPointHeight = function ( x, z, asColor ) {

    var height = this.getPoint( x, z )[14];

    if ( ! asColor ) {

        return height;

    } else {

        return height + 128;

    }

};

GOT.Terrain.prototype.show = function () {

    for ( var i = 0, il = this.blocks.length; i < il; i ++ ) {

        this.blocks[ i ].visible = true;

    }

};

GOT.Terrain.prototype.hide = function () {

    for ( var i = 0, il = this.blocks.length; i < il; i ++ ) {

        this.blocks[ i ].visible = false;

    }

};
