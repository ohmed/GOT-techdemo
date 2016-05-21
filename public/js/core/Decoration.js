/*
 * GOT
 * @author: ohmed
 * Decoration base class
*/

function Decoration ( param, deferred ) {

    param = param || {};

    this.type = 'Decoration';
    GameObject.call( this, param );

    this.instance = GOT.landscape.decorations.add( this, deferred );

};

Decoration.prototype = Object.create( GameObject.prototype );

//

Decoration.registerType = function ( param ) {

    Decoration.list = Decoration.list || { length: 0 };
    Decoration.list[ param.name ] = {

        id: Decoration.list.length,
        name: param.name

    };

    Decoration.list.length ++;

};
