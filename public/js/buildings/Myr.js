/* Myr building */

Building.Myr = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Myr.heraldyImg = null;
Building.Myr.moviewPreview = 'img/movie-preview/myr.jpg';

Building.Myr.prototype = Object.create( Building.prototype );

Building.Myr.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Myr.prototype.shortInfo = (function() { 

    return [

        Building.Myr.heraldyImg ? '<img class="pull-left" src="' + Building.Myr.heraldyImg + '">' : '',
        Building.Myr.heraldyImg ? '<img class="pull-right" src="' + Building.Myr.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Myr</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Myr.moviewPreview + '"></div>',
        '<p>Myr is one of the Free Cities located to the east of Westeros, on the coast of Essos. Myr is a major seaport located on a large body of water known as the Sea of Myrth, an inlet of the Narrow Sea. It is located south of Pentos and north of the Disputed Lands...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Myr">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Myr.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Myr.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Myr', model: 'Castle' } );
