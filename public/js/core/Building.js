/*
 * GOT
 * @author: ohmed
 * Building base class
*/

function Building ( param, deferred ) {

    param = param || {};

    this.type = 'Building';
    GameObject.call( this, param );

    this.size = Building[ this.name ].size[ this.subtype ] || Building[ this.name ].size || param.size;
    this.subElements = [];

    if ( ! this.isFlora ) {

        this.instance = GOT.landscape.buildings.add( this, deferred );

    }

    this.preInit( deferred );

};

Building.prototype = Object.create( GameObject.prototype );

Building.prototype.preInit = function () {

    var self = this;

    //

};

Building.prototype.getShortInfo = function () {

    return this.shortInfo;

};

Building.prototype.remove = function () {

    var self = this;

    // remove building mesh
    view.buildings.remove( self );

    // remove addition meshes
    if ( self.meshAr ) {

        if ( meshAr.length ) {

            for ( var i = 0, il = self.meshAr.length; i < il; i ++ ) {

                view.remove( self.meshAr[ i ] );

            }

        } else {

            view.remove( self.meshAr );

        }

    }

};

//

Building.lastHovered = false;

Building.registerType = function ( param ) {

    var objClass = param.objClass || 'buildings';

    Building.list = Building.list || {};
    Building.list[ objClass ] = Building.list[ objClass ] || { length: 0 };

    Building.list[ objClass ][ param.name ] = {

        id: Building.list[ objClass ].length,
        name: param.name,
        model: param.model,
        parts: {}

    };

    Building.list[ objClass ].length ++;

};
