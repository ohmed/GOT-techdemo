/* KingsLanding building */

Building.KingsLanding = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.KingsLanding.heraldyImg = 'img/heraldry/kings-landings.png';
Building.KingsLanding.moviewPreview = 'img/movie-preview/kings-landings.jpg';

Building.KingsLanding.prototype = Object.create( Building.prototype );

Building.KingsLanding.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.KingsLanding.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.KingsLanding.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.KingsLanding.heraldyImg + '">',
        '<h3 class="info-popup-heading">King&#39;s Landing</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.KingsLanding.moviewPreview + '"></div>',
        '<p>King&#39;s Landing is the capital of the Seven Kingdoms. It is located on the east coast of Westeros in the Crownlands, overlooking Blackwater Bay. It is the site of the Iron Throne and the Red Keep, the seat of the King of the Andals and the First Men. The walled city is located on uplands just north of where the Blackwater Rush flows into Blackwater Bay. It enjoys a warm climate and life there is luxurious for those that can afford it, although it is not without its slums such as Flea Bottom. The city is overpopulated and dangerous at the best of times, despite being policed by a City Watch...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/King&#39;s_Landing">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.KingsLanding.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.KingsLanding.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'KingsLanding', model: 'KingsLanding' } );
