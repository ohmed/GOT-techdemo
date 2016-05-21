/* Town building */

Building.Town = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Town.prototype = Object.create( Building.prototype );

Building.Town.prototype.init = function () {

    var self = this;

    // GOT.view.picker.addObjectPickable( self );

};

Building.Town.size = {
    '01': {
        x: 13,
        y: 25,
        z: 13
    },
    '02': {
        x: 13,
        y: 20,
        z: 13
    },
    '03': {
        x: 16,
        y: 20,
        z: 16
    }
};

Building.registerType( { name: 'Town01', model: 'Town01' } );
Building.registerType( { name: 'Town02', model: 'Town02' } );
Building.registerType( { name: 'Town03', model: 'Town03' } );
