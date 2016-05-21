/* Winterfell building */

Building.Winterfell = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Winterfell.heraldyImg = 'img/heraldry/stark.webp';
Building.Winterfell.moviewPreview = 'img/movie-preview/winterfell.jpg';

Building.Winterfell.prototype = Object.create( Building.prototype );

Building.Winterfell.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Winterfell.prototype.shortInfo = (function() { 

    return [

        '<img class="pull-left" src="' + Building.Winterfell.heraldyImg + '">',
        '<img class="pull-right" src="' + Building.Winterfell.heraldyImg + '">',
        '<h3 class="info-popup-heading">Winterfell</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Winterfell.moviewPreview + '"></div>',
        '<p>Winterfell is the seat of House Stark. It is a large castle located at the center of the North, from where the head of House Stark rules over his people. It is the capital of the North under King Robb Stark. The castle is located alongside the Kingsroad as it makes its way from the Wall to the capital at King&#39;s Landing, more than a thousand miles to the south. It is situated atop hot springs which keep the castle warm even in the worst winters. Winding tombs below the castle contain the remains of Stark kings and lords and record the history of the ancient family. The castle has stood for millennia...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Winterfell">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Winterfell.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Winterfell.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Winterfell', model: 'Winterfell' } );
