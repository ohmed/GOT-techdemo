/* Rock decoration */

Decoration.Rock = function ( param, deferred ) {

    param = param || {};
    param.rotation.y = Math.floor( 255 * Math.random() );

    Decoration.call( this, param, deferred );

    this.init();

};

Decoration.Rock.prototype = Object.create( Decoration.prototype );

Decoration.Rock.prototype.init = function () {

    var self = this;

};

Decoration.Rock.size = { x: 8, y: 8, z: 8 };

Decoration.registerType( { name: 'Rock01', model: 'Rock01' } );
Decoration.registerType( { name: 'Rock02', model: 'Rock02' } );
Decoration.registerType( { name: 'Rock03', model: 'Rock03' } );
