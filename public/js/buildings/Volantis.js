/* Volantis building */

Building.Volantis = function ( param, deferred ) {

    Building.call( this, param, deferred );

    param = param || {};

    this.init();

};

Building.Volantis.heraldyImg = null;
Building.Volantis.moviewPreview = 'img/movie-preview/volantis.png';

Building.Volantis.prototype = Object.create( Building.prototype );

Building.Volantis.prototype.onClick = function () {

    if ( GOT.settings.showBuildingsPopups ) {

        GOT.vent.trigger('showBuildingPopup', this);

    }

};

Building.Volantis.prototype.shortInfo = (function() { 

    return [

        Building.Volantis.heraldyImg ? '<img class="pull-left" src="' + Building.Volantis.heraldyImg + '">' : '',
        Building.Volantis.heraldyImg ? '<img class="pull-right" src="' + Building.Volantis.heraldyImg + '">' : '',
        '<h3 class="info-popup-heading">Volantis</h3>',
        '<br>',
        '<div><img class="moview-preview-thumb" src="' + Building.Volantis.moviewPreview + '"></div>',
        '<p>Volantis is one of the Free Cities located east of Westeros. It is the southern-most and oldest of the Free Cities, located on the southern coast of Essos along the Summer Sea, at the mouth of the Rhoyne River. It was founded as a colony of Valyria many centuries ago. It is a great port...</p>',
        '<p><a target="_blank" href="http://gameofthrones.wikia.com/wiki/Volantis">Read more at <b>Game Of Thrones Wiki</b></a></p>'

    ].join('');

}());

Building.Volantis.prototype.init = function () {

    var self = this;

    GOT.view.picker.addObjectPickable( self );

};

Building.Volantis.size = { x: 100, y: 100, z: 100 };

Building.registerType( { name: 'Volantis', model: 'Castle' } );
