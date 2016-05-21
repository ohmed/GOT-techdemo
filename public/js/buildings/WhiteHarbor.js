/* WhiteHarbor building */

Building.WhiteHarbor = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.WhiteHarbor.heraldyImg = null;
Building.WhiteHarbor.moviewPreview = 'img/movie-preview/white-harbor.jpg';

Building.WhiteHarbor.prototype = Object.create( Building.prototype );

Building.WhiteHarbor.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.WhiteHarbor.prototype.shortInfo = (function() { 

    return [

        Building.WhiteHarbor.heraldyImg ? '<img class="pull-left" src="' + Building.WhiteHarbor.heraldyImg + '">' : '',
        Building.WhiteHarbor.heraldyImg ? '<img class="pull-right" src="' + Building.WhiteHarbor.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">White Harbor</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.WhiteHarbor.moviewPreview + '"></div>',
        '<p>White Harbor is the only city in the North. It is one of the major cities of Westeros, located where the White Knife River flows into the Bite. It is the seat of House Manderly, a vassal house holding fealty to House Stark of Winterfell. White Harbor is the main seaport of the North and is one of only five settlements in Westeros large enough to be called a city, though it is the smallest of the five (the other four being, in decreasing order of size: King&#39;s Landing, Oldtown, Lannisport, and Gulltown)...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/White_Harbor">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.WhiteHarbor.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.WhiteHarbor.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'WhiteHarbor', model: 'WhiteHarbor' } );
