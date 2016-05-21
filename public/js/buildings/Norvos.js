/* Norvos building */

Building.Norvos = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Norvos.heraldyImg = null;
Building.Norvos.moviewPreview = 'img/movie-preview/norvos.png';

Building.Norvos.prototype = Object.create( Building.prototype );

Building.Norvos.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Norvos.prototype.shortInfo = (function() { 

    return [

        Building.Norvos.heraldyImg ? '<img class="pull-left" src="' + Building.Norvos.heraldyImg + '">' : '',
        Building.Norvos.heraldyImg ? '<img class="pull-right" src="' + Building.Norvos.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Norvos</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Norvos.moviewPreview + '"></div>',
        '<p>Norvos is one of the Free Cities, located to the east of Westeros. It lies in the interior of Essos, between Pentos and Qohor, on the Noyne, a tributary of the massive River Rhoyne. It is on the route leading from the Narrow Sea to the Dothraki sea, and as such pays tribute to passing Dothraki khalasars...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Norvos">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Norvos.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Norvos.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Norvos', model: 'Norvos' } );
