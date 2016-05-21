/*
 * GOT
 * @author: ohmed
*/

Editor.Decorations = function () {

    this.activeState = -1;

    this.decorations = GOT.landscape.decorationsObjects;

    this.groupsToUpdate = {};
    this.tmpMeshes = [];

};

Editor.Decorations.prototype.init = function () {

    this.saveState();

};

Editor.Decorations.prototype.saveState = function () {

    this.activeState ++;

    var decorations = [];
    var decoration;

    for ( var i = 0, il = GOT.landscape.decorationsObjects.length; i < il; i ++ ) {

        decoration = GOT.landscape.decorationsObjects[ i ];

        if ( decoration.instance && decoration.instance.active !== false ) {

            decorations.push( decoration );

        }

    }

    GOT.landscape.decorationsObjects = decorations;
    this.decorations = decorations;

};

Editor.Decorations.prototype.undo = function () {

    if ( this.activeState === -1 ) {

        return;

    }

    this.activeState --;

    var decorations = this.decorations;

    for ( var i = 0, il = decorations.length; i < il; i ++ ) {

        if ( decorations[ i ].eid > this.activeState ) {

            decorations[ i ].instance.active = false;

        }

    }

    this.update( true );

};

Editor.Decorations.prototype.redo = function () {

    if ( this.activeState === -1 ) {

        return;

    }

    this.activeState ++;

    var decorations = this.decorations;

    for ( var i = 0, il = decorations.length; i < il; i ++ ) {

        if ( decorations[ i ].eid > this.activeState ) {

            decorations[ i ].instance.active = false;

        } else if ( decorations[ i ].instance ) {

            decorations[ i ].instance.active = true;

        }

    }

    this.update( true );

};

Editor.Decorations.prototype.update = function ( force ) {

    var block;

    if ( force ) {

        this.groupsToUpdate = {};
        var block;

        for ( var i = 0, il = GOT.landscape.decorations.blocks.length; i < il; i ++ ) {

            block = GOT.landscape.decorations.blocks[ i ];
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

    this.tmpMeshes.length = 0;

};

Editor.Decorations.prototype.updateYPositions = function () {

    var mapSize = GOT.landscape.mapSize;
    var decoration;

    for ( var i = 0, il = this.decorations.length; i < il; i ++ ) {

        decoration = this.decorations[ i ];
        decoration.y = GOT.landscape.terrain.getPointHeight( decoration.x / mapSize + 0.5, decoration.y / mapSize + 0.5 );

    }

    this.update( true );

};

Editor.Decorations.prototype.draw = function ( marker ) {

    var mapSize = GOT.landscape.mapSize;

    var type = ( marker.subtype.split('/').length > 1 ) ? marker.subtype.split('/')[ 0 ] : marker.subtype;
    var subtype = ( marker.subtype.split('/').length > 1 ) ? marker.subtype.split('/')[ 1 ] : '';

    var obejctPos = new NWE.Vec3( marker.position.x, GOT.landscape.terrain.getPointHeight( marker.position.x, marker.position.y ), marker.position.y );

    obejctPos.x = mapSize * ( obejctPos.x - 0.5 );
    obejctPos.z = mapSize * ( obejctPos.z - 0.5 );

    //

    object = new Decoration[ type ]({
                name: type,
                subtype: subtype,
                position: obejctPos.clone(),
                rotation: new NWE.Vec3()
            });

    object.eid = this.activeState + 1;
    object.instance.eid = this.activeState + 1;

    GOT.landscape.decorationsObjects.push( object );

    this.groupsToUpdate[ object.instance.group.uuid ] = object.instance.group;

    this.update();

};

Editor.Decorations.prototype.erase = function ( marker ) {

    var self = this;

    var mapSize = GOT.landscape.mapSize;

    var position = { x: marker.position.x, y: marker.position.y };
    var size = marker.size;

    position.x = mapSize * ( position.x - 0.5 );
    position.y = mapSize * ( position.y - 0.5 );

    var decoration;

    for ( var i = 0, il = this.decorations.length; i < il; i ++ ) {

        decoration = this.decorations[ i ];

        if ( Math.sqrt( Math.pow( decoration.position.x - position.x, 2 ) + Math.pow( decoration.position.z - position.y, 2 ) ) < size ) {

            if ( decoration.instance ) {

                decoration.instance.active = false;

            }

        }

    }

    this.update( true );

};

Editor.Decorations.prototype.export = function () {

    var data = [];
    var object;

    for ( var i = 0, il = this.decorations.length; i < il; i ++ ) {

        object = this.decorations[ i ];

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
    a.download = 'decorations.json';

    a.href = 'data:text/json;charset=utf8,' + encodeURIComponent( data );

    var evObj = document.createEvent('Events');
    evObj.initEvent( 'click', true, false );
    a.dispatchEvent( evObj );

};
