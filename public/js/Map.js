/*
 * GOT
 * @author: ohmed
 * Map loading
*/

// var HOST = window.location.origin;

GOT.map = (function () {

    function load ( path, id, fn ) {

        var img = new Image();

        img.onload = function () {

            fn( img );

        };

        img.src = path + '/' + id + '.png';

    }

    this.loadMapping = function ( id, fn ) {

        load( 'mappings', id, fn );

    };

    this.loadPreview = function( id, fn ) {

        load( 'previews', id, fn );

    };

    return this;

}) ();
