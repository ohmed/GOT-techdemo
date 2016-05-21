/*
 * GOT
 * @author: ohmed
*/

Editor.Flora = function () {

    this.activeState = -1;

    this.trees = GOT.landscape.floraObjects;

    this.groupsToUpdate = {};
    this.tmpMeshes = [];

};

Editor.Flora.prototype.init = function () {

    this.saveState();

};

Editor.Flora.prototype.saveState = function () {

    this.activeState ++;

    var trees = [];
    var tree;

    for ( var i = 0, il = GOT.landscape.floraObjects.length; i < il; i ++ ) {

        tree = GOT.landscape.floraObjects[ i ];

        if ( tree.instance && tree.instance.active !== false ) {

            trees.push( tree );

        }

    }

    GOT.landscape.floraObjects = trees;
    this.trees = trees;

};

Editor.Flora.prototype.undo = function () {

    if ( this.activeState === -1 ) {

        return;

    }

    this.activeState --;

    var trees = this.trees;

    for ( var i = 0, il = trees.length; i < il; i ++ ) {

        if ( trees[ i ].eid > this.activeState ) {

            trees[ i ].instance.active = false;

        }

    }

    this.update( true );

};

Editor.Flora.prototype.redo = function () {

    if ( this.activeState === -1 ) {

        return;

    }

    this.activeState ++;

    var trees = this.trees;

    for ( var i = 0, il = trees.length; i < il; i ++ ) {

        if ( trees[ i ].eid > this.activeState ) {

            trees[ i ].instance.active = false;

        } else if ( trees[ i ].instance ) {

            trees[ i ].instance.active = true;

        }

    }

    this.update( true );

};

Editor.Flora.prototype.canPlace = function ( x, z, type ) {

    var tree;

    for ( var i = 0, il = this.trees.length; i < il; i ++ ) {

        tree = this.trees[ i ];

        if ( Math.sqrt( Math.pow( tree.position.x - x, 2 ) + Math.pow( tree.position.z - z, 2 ) ) < 12 ) {

            return false;

        }

    }

    return true;

};

Editor.Flora.prototype.update = function ( force ) {

    var block;

    if ( force ) {

        this.groupsToUpdate = {};
        var block;

        for ( var i = 0, il = GOT.landscape.flora.blocks.length; i < il; i ++ ) {

            block = GOT.landscape.flora.blocks[ i ];
            this.groupsToUpdate[ block.uuid ] = block;

        }

    }

    for ( var i in this.groupsToUpdate ) {

        block = this.groupsToUpdate[ i ];

        if ( block.instances.length > 0 ) {

            GOT.view.scene.remove( block.getInternal('mesh') );
            block.updateGeometry();
            GOT.view.scene.add( block.getInternal('mesh') );

        }

    }

    this.groupsToUpdate = {};

    for ( var i = 0, il = this.tmpMeshes.length; i < il; i ++ ) {

        GOT.view.scene.remove( this.tmpMeshes[ i ] );

    }

    GOT.view.scene.remove( GOT.landscape.flora.globalSG.getInternal('mesh') );
    GOT.landscape.flora.globalSG.updateGeometry();
    GOT.view.scene.add( GOT.landscape.flora.globalSG.getInternal('mesh') );

    this.tmpMeshes.length = 0;

};

Editor.Flora.prototype.updateYPositions = function () {

    var mapSize = GOT.landscape.mapSize;

    var tree;
    var treePosition;

    for ( var i = 0, il = this.trees.length; i < il; i ++ ) {

        tree = this.trees[ i ];
        treePosition = tree.position;
        treePosition.y = GOT.landscape.terrain.getPointHeight( treePosition.x / mapSize + 0.5, treePosition.z / mapSize + 0.5 );

        tree.instance.position.y = treePosition.y;
        tree.instance.update();

    }

    this.update( true );

};

Editor.Flora.prototype.draw = function ( marker ) {

    var mapSize = GOT.landscape.mapSize;

    var type = ( marker.subtype.split('/').length > 1 ) ? marker.subtype.split('/')[ 0 ] : marker.subtype;
    var subtype = ( marker.subtype.split('/').length > 1 ) ? marker.subtype.split('/')[ 1 ] : '';

    var position = { x: marker.position.x, y: marker.position.y };
    var obejctPos = new NWE.Vec3();
    var size = marker.size;

    obejctPos.y = GOT.landscape.terrain.getPointHeight( position.x, position.y );

    position.x = mapSize * ( position.x - 0.5 );
    position.y = mapSize * ( position.y - 0.5 );

    var mesh, object;

    for ( var i = 0, il = size * size / 400; i < il; i ++ ) {

        obejctPos.x = ( position.x + 2 * size * ( Math.random() - 0.5 ) );
        obejctPos.z = ( position.y + 2 * size * ( Math.random() - 0.5 ) );

        if ( this.canPlace( obejctPos.x, obejctPos.z ) && Math.sqrt( Math.pow( obejctPos.x - position.x, 2 ) + Math.pow( obejctPos.z - position.y, 2 ) ) < size ) {

            object = new Building[ type ]({
                        name: type,
                        subtype: subtype,
                        position: obejctPos.clone(),
                        rotation: new NWE.Vec3()
                    });

            object.eid = this.activeState + 1;
            object.instance.eid = this.activeState + 1;

            GOT.landscape.floraObjects.push( object );

            this.groupsToUpdate[ object.instance.group.uuid ] = object.instance.group;

            mesh = new NWE.gfx.Mesh( GOT.ResourceMng.getGeometry( Building.list.flora[ type + subtype ].model ), new NWE.gfx.MeshBasicMaterial({ color: 0xff0000 }) );
            mesh.position.set( obejctPos.x, obejctPos.y, obejctPos.z );
            GOT.view.scene.add( mesh );

            this.tmpMeshes.push( mesh );

        }

    }

};

Editor.Flora.prototype.erase = function ( marker ) {

    var mapSize = GOT.landscape.mapSize;

    var position = { x: marker.position.x, y: marker.position.y };
    var size = marker.size;

    position.x = mapSize * ( position.x - 0.5 );
    position.y = mapSize * ( position.y - 0.5 );

    var tree;

    for ( var i = 0, il = this.trees.length; i < il; i ++ ) {

        tree = this.trees[ i ];

        if ( Math.sqrt( Math.pow( tree.position.x - position.x, 2 ) + Math.pow( tree.position.z - position.y, 2 ) ) < size ) {

            if ( tree.instance ) {

                tree.instance.active = false;

            }

        }

    }

    this.update( true );

};

Editor.Flora.prototype.export = function () {

    var data = [];
    var object;

    for ( var i = 0, il = this.trees.length; i < il; i ++ ) {

        object = this.trees[ i ];

        if ( ! object.instance.active ) {

            continue;

        }

        data.push({

            type: object.type,
            name: object.name,
            subtype: object.subtype,

            position: { x: object.position.x, y: object.position.y, z: object.position.z },
            scale: { x: object.scale.x, y: object.scale.y, z: object.scale.z },
            rotation: { x: object.rotation.x, y: object.rotation.y, z: object.rotation.z }

        });

    }

    data = JSON.stringify( data );

    var a = document.createElement('a');
    document.body.appendChild( a );
    a.download = 'flora.json';

    a.href = 'data:text/json;charset=utf8,' + encodeURIComponent( data );

    var evObj = document.createEvent('Events');
    evObj.initEvent( 'click', true, false );
    a.dispatchEvent( evObj );

};
