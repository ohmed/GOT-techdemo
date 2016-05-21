/* Braavos building */

Building.Braavos = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Braavos.heraldyImg = 'img/heraldry/braavos.png';
Building.Braavos.moviewPreview = 'img/movie-preview/braavos.jpg';

Building.Braavos.prototype = Object.create( Building.prototype );

Building.Braavos.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Braavos.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.Braavos.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.Braavos.heraldyImg + '">',
        '<h3 class="info-popup-heading">Braavos</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Braavos.moviewPreview + '"></div>',
        '<p>Braavos is one of the Free Cities located on the continent of Essos. It lies east of Westeros, across the Narrow Sea. It is the northern-most, the richest, and arguably the most powerful of the Free Cities. The city spans hundreds of tiny islands connected by small stone bridges. As well as the city itself, the rulers of Braavos also control the surrounding lagoon and a strip of the coastline southwards towards Pentos...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Braavos">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Braavos.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};



Building.Braavos.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Braavos', model: 'Braavos' } );
