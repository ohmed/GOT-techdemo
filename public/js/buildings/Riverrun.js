/* Riverrun building */

Building.Riverrun = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Riverrun.heraldyImg = 'img/heraldry/tully.png';
Building.Riverrun.moviewPreview = 'img/movie-preview/riverrun.png';

Building.Riverrun.prototype = Object.create( Building.prototype );

Building.Riverrun.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Riverrun.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.Riverrun.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.Riverrun.heraldyImg + '">',
        '<h3 class="info-popup-heading">Riverrun</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Riverrun.moviewPreview + '"></div>',
        '<p>Riverrun is the former seat of House Tully, who continue to hold it in defiance of the Iron Throne and its new lawful rulers, House Frey. It is a large castle located in the central-western part of the Riverlands. It sits at the point where the Red Fork of the Trident River is joined by its major tributary, the Tumblestone River flowing out of the west. In times of danger, sluice gates can be opened to flood a channel cut to the west of the castle, turning Riverrun into an island. Its walls rise sheer from the waters and its towers command the opposite shores, making assaulting it almost impossible without huge casualties...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Riverrun">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Riverrun.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Riverrun.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Riverrun', model: 'Riverrun' } );
