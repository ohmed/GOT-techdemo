/* Castle building */

Building.GreatNorthWall = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.GreatNorthWall.heraldyImg = 'img/heraldry/wall.png';
Building.GreatNorthWall.moviewPreview = 'img/movie-preview/wall.jpg';

Building.GreatNorthWall.prototype = Object.create( Building.prototype );

Building.GreatNorthWall.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.GreatNorthWall.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.GreatNorthWall.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.GreatNorthWall.heraldyImg + '">',
        '<h3 class="info-popup-heading">The Wall</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.GreatNorthWall.moviewPreview + '"></div>',
        '<p>The Wall is a colossal fortification which stretches for 300 miles along the northern border of the Seven Kingdoms, defending the realm from the wildlings who live beyond. The Wall is reported to be over 700 feet tall and is made of solid ice. It was supposedly constructed using both magic and mundane means some eight millennia ago, in the aftermath of the Long Night to defend the realm against the White Walkers who apparently dwell in the far north, though they are now considered myths by most...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/The_Wall">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.GreatNorthWall.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.GreatNorthWall.size = { x: 900, y: 100, z: 40 };

Building.registerType( { name: 'GreatNorthWall', model: 'GreatNorthWall' } );
