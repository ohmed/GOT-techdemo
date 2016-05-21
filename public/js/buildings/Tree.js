/* flora Tree */

Building.Tree = function ( param, deferred ) {

    param = param || {};
    this.isFlora = true;

    Building.call( this, param, deferred );

    this.init( deferred );

};

Building.Tree.prototype = Object.create( Building.prototype );

Building.Tree.prototype.init = function ( deferred ) {

    var self = this;

    this.rotation.y = Math.PI * Math.random();
    this.scale.set( 0.5 * Math.random() + 0.8, 0.5 * Math.random() + 0.8, 0.5 * Math.random() + 0.8 );

    this.instance = GOT.landscape.flora.add( self, deferred );

};

Building.Tree.size = {
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

Building.registerType({ objClass: 'flora', name: 'Tree01', model: 'Tree01' });
Building.registerType({ objClass: 'flora', name: 'Tree02', model: 'Tree02' });
Building.registerType({ objClass: 'flora', name: 'Tree03', model: 'Tree03' });
