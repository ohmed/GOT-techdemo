/* TheTwins building */

Building.TheTwins = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.TheTwins.heraldyImg = 'img/heraldry/the-twins.webp';
Building.TheTwins.moviewPreview = 'img/movie-preview/the-twins.webp';

Building.TheTwins.prototype = Object.create( Building.prototype );

Building.TheTwins.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.TheTwins.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.TheTwins.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.TheTwins.heraldyImg + '">',
        '<h3 class="info-popup-heading">The Twins</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.TheTwins.moviewPreview + '"></div>',
        '<p><b>The Twins</b>, sometimes known as <b>The Crossing</b>, is a castle in the Riverlands. It is the seat of House Frey, a vassal house of House Tully of Riverrun. It consists of two near-identical towers and a fortified bridge over the Green Fork of the River Trident...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/The_Twins">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.TheTwins.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.TheTwins.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'TheTwins', model: 'TheTwins' } );
