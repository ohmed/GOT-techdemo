/*
 * GOT
 * @author: ohmed
 * Loader
*/

GOT.Loader = function () {

    this.loader = new NWE.PackLoader();

};

GOT.Loader.prototype.load = function ( callback ) {

    var self = this;

    var res = 'resources/packs/wd1.zip';
    // var res = 'https://s3-eu-west-1.amazonaws.com/nwg-data/data.pack';

    self.loader.load( res, function ( pack ) {

        GOT.ResourceMng = pack;

        ( callback && callback() );

    });

};

GOT.Loader = new GOT.Loader();
