/* Pentos building */

Building.Pentos = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Pentos.heraldyImg = null;
Building.Pentos.moviewPreview = 'img/movie-preview/pentos.png';

Building.Pentos.prototype = Object.create( Building.prototype );

Building.Pentos.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Pentos.prototype.shortInfo = (function() { 

    return [

        Building.Pentos.heraldyImg ? '<img class="pull-left" src="' + Building.Pentos.heraldyImg + '">' : '',
        Building.Pentos.heraldyImg ? '<img class="pull-right" src="' + Building.Pentos.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Pentos</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Pentos.moviewPreview + '"></div>',
        '<p>Pentos is one of the Free Cities, located on the western coastline of Essos, across the Narrow Sea to the east of Westeros. It is a large, rich city...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Pentos">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Pentos.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Pentos.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Pentos', model: 'Pentos' } );
