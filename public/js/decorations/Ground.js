/* Ground decoration */

Decoration.Ground = function ( param, deferred ) {

    param = param || {};

    Decoration.call( this, param, deferred );

    this.init();

};

Decoration.Ground.prototype = Object.create( Decoration.prototype );

Decoration.Ground.prototype.init = function () {

    var self = this;

};

Decoration.Ground.size = { x: 8, y: 8, z: 8 };

Decoration.registerType( { name: 'Ground01', model: 'Ground01' } );
Decoration.registerType( { name: 'Ground02', model: 'Ground02' } );
