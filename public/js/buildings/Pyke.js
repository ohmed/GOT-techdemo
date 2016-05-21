/* Pyke building */

Building.Pyke = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Pyke.heraldyImg = 'img/heraldry/pyke.png';
Building.Pyke.moviewPreview = 'img/movie-preview/pyke.jpg';

Building.Pyke.prototype = Object.create( Building.prototype );

Building.Pyke.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Pyke.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.Pyke.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.Pyke.heraldyImg + '">',
        '<h3 class="info-popup-heading">Pyke</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Pyke.moviewPreview + '"></div>',
        '<p>Pyke is the stronghold and seat of House Greyjoy, located on the island of the same name, which is one of the seven major Iron Islands. The castle is the regional capital of the Iron Islands as a whole. Pyke is an ancient stronghold and the cliff it was built on has been eroded by the sea leaving the towers standing on stone stacks. The towers are connected by swaying rope bridges. The rocky moss covered stone at its base is not suitable for ships landing so traffic to the island flows through the nearby harbor town Lordsport...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Pyke_(castle)">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Pyke.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Pyke.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Pyke', model: 'Pyke' } );
