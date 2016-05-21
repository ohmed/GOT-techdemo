/*
 * GOT
 * @author: ohmed
 * Landscape control
*/

GOT.Landscape = function () {

    var self = this;

    this.floraObjects = [];
    this.decorationsObjects = [];
    this.buildingsObjects = [];

    this.mapSize = 2033 * 3;

};

GOT.Landscape.prototype.init = function () {

    this.terrain = new GOT.Terrain();
    this.terrain.generate();

    this.buildings   = new GOT.BuildingManager({ landscape: this });
    this.flora       = new GOT.FloraManager({ landscape: this });
    this.decorations = new GOT.DecorationManager({ landscape: this });

    if ( EDITOR_MODE ) {

        GOT.editor.terrain = new Editor.Terrain();
        GOT.editor.terrain.init();

        GOT.editor.flora = new Editor.Flora();

        GOT.editor.decorations = new Editor.Decorations();

        GOT.editor.init();

    }

};

GOT.Landscape.prototype.parseLandscapeData = function ( name ) {

    var data = JSON.parse( GOT.ResourceMng.getRawConfig( name + '.map') );

    // add flora

    var object, type;
    var list;

    for ( var i = 0, il = data.mapObjects.objects.length; i < il; i ++ ) {

        object = data.mapObjects.objects[ i ];

        if ( object.type === 'Decoration' ) {

            type = Decoration;
            list = this.decorationsObjects;

        } else {

            type = Building;
            list = this.floraObjects;

        }

        object = new type[ object.name ]({
                    name: object.name,
                    subtype: object.subtype,
                    position: new NWE.Vec3( object.position.x, object.position.y, object.position.z ),
                    rotation: new NWE.Vec3()
                });

        list.push( object );

    }

    GOT.landscape.flora.deferredUpdate();
    GOT.landscape.flora.addToScene();

    if ( EDITOR_MODE ) {

        GOT.editor.flora.init();

    }

    // add labels

    for ( var i = 0, il = data.mapObjects.labels.length; i < il; i ++ ) {

        object = data.mapObjects.labels[ i ];

        object = new Decoration.GroundLabel({
                    name: object.name,
                    subtype: '',
                    position: new NWE.Vec3( object.position[ 0 ], object.position[ 1 ], object.position[ 2 ] ),
                    rotation: new NWE.Vec3( 0, object.rotation, 0 )
                });

        this.decorationsObjects.push( object );

    }

    GOT.landscape.decorations.deferredUpdate();
    GOT.landscape.decorations.addToScene();

    // add buildings

    var building;

    for ( var i = 0, il = data.mapObjects.buildings.length; i < il; i ++ ) {

        building = data.mapObjects.buildings[ i ];

        building = new Building[ building.name ]({
                        name: building.name,
                        subtype: building.subtype,
                        position: new NWE.Vec3( building.position[0], building.position[1] + 20, building.position[2] ),
                        scale: new NWE.Vec3( 1 ),
                        rotation: new NWE.Vec3( 0, building.rotation, 0 )
                    });

        this.buildingsObjects.push( building );

    }

    GOT.landscape.buildings.deferredUpdate();
    GOT.landscape.buildings.addToScene();

};
