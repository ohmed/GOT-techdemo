/* Tyrosh building */

Building.Tyrosh = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Tyrosh.heraldyImg = null;
Building.Tyrosh.moviewPreview = 'img/movie-preview/tyrosh.png';

Building.Tyrosh.prototype = Object.create( Building.prototype );

Building.Tyrosh.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Tyrosh.prototype.shortInfo = (function() { 

    return [

        Building.Tyrosh.heraldyImg ? '<img class="pull-left" src="' + Building.Tyrosh.heraldyImg + '">' : '',
        Building.Tyrosh.heraldyImg ? '<img class="pull-right" src="' + Building.Tyrosh.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Tyrosh</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Tyrosh.moviewPreview + '"></div>',
        '<p>Tyrosh is one of the Free Cities located to the east of Westeros. It is situated on an island off the southwestern coast of Essos, in the Narrow Sea. It is located at the eastern end of the Stepstones, an island chain that extends from Essos to Westeros, which according to legend used to be a land-bridge linking the two continents. Therefore, Tyrosh is the closest of the Free Cities to Westeros, located not far from Dorne and the Stormlands (fairly close to the island of Tarth)...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Tyrosh">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Tyrosh.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Tyrosh.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Tyrosh', model: 'Tyrosh' } );
