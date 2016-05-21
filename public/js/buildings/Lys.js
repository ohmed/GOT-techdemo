/* Lys building */

Building.Lys = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Lys.heraldyImg = null;
Building.Lys.moviewPreview = 'img/movie-preview/lys.png';

Building.Lys.prototype = Object.create( Building.prototype );

Building.Lys.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Lys.prototype.shortInfo = (function() { 

    return [

        Building.Lys.heraldyImg ? '<img class="pull-left" src="' + Building.Lys.heraldyImg + '">' : '',
        Building.Lys.heraldyImg ? '<img class="pull-right" src="' + Building.Lys.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Lys</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Lys.moviewPreview + '"></div>',
        '<p>Lys is one of the Free Cities to the east of Westeros. It is located far to the south of Pentos, southwest of Volantis and north of the Summer Islands. The city is actually located on an island separated from the mainland of Essos by narrow straits, though it has territorial possessions in the nearby regions of the mainland, east of Tyrosh and south of Myr. The city spans several islands...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Lys">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Lys.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Lys.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Lys', model: 'Lys' } );
