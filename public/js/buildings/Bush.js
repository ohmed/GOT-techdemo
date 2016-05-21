/* Bush building */

Building.Bush = function ( param, deferred ) {

    param = param || {};
    this.isFlora = true;

    Building.call( this, param, deferred );

    this.init( deferred );

};

Building.Bush.prototype = Object.create( Building.prototype );

Building.Bush.prototype.init = function ( deferred ) {

    var self = this;

    if ( this.subtype !== '02' ) {

        this.rotation.y = Math.PI * Math.random();
        this.scale.set( 0.5 * Math.random() + 0.8, 0.5 * Math.random() + 0.8, 0.5 * Math.random() + 0.8 );

    } else {

        this.rotation.y = -1.3 + 0.5 * ( Math.random() - 0.5 );
        this.scale.set( 1 * Math.random() + 0.3, 1 * Math.random() + 0.3, 1 * Math.random() + 0.3 );

    }

    this.instance = GOT.landscape.flora.add( self, deferred );

};

Building.Bush.size = {
    '01': { x: 4, y: 14, z: 4 },
    '02': { x: 8, y: 17, z: 8 },
    '03': { x: 5, y: 20, z: 5 }
};

Building.Bush.maxDensity = {
    '01': 3,
    '02': 15,
    '03': 15
};

Building.registerType( { objClass: 'flora', name: 'Bush01', model: 'Bush01' } );
Building.registerType( { objClass: 'flora', name: 'Bush02', model: 'Bush02' } );
Building.registerType( { objClass: 'flora', name: 'Bush03', model: 'Bush03' } );
