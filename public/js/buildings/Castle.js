/* Castle building */

Building.Castle = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Castle.prototype = Object.create( Building.prototype );

Building.Castle.prototype.init = function () {

    var self = this;

    // ..

};

Building.Castle.size = { x: 36, y: 16, z: 36 };

Building.registerType( { name: 'Castle', model: 'Castle' } );
