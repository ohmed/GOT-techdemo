/* GroundLabel decoration */

Decoration.GroundLabel = function ( param, deferred ) {

    param = param || {};

    Decoration.call( this, param, deferred );

    this.init();

};

Decoration.GroundLabel.prototype = Object.create( Decoration.prototype );

Decoration.GroundLabel.prototype.init = function () {

    var self = this;

};

Decoration.GroundLabel.prototype.setText = function ( text ) {

	// todo

};

Decoration.GroundLabel.prototype.stickGeometryToTerrain = function () {

	// todo

};

Decoration.GroundLabel.size = { x: 0, y: 0, z: 0 };
