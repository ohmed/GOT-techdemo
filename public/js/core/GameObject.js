/*
 * GOT
 * @author: ohmed
 * GameObject base class [everything]
*/

function GameObject ( param ) {

    param = param || {};

    var objType = this.type;

    this.rotation = new NWE.Euler();
    this.position = new NWE.Vec3();
    this.scale = new NWE.Vec3( 1 );

    this.size = this.size || {
        x: 0,
        y: 0,
        z: 0
    };

    this.id = param.id || (GameObject.idCount ++);

    this.name = param.name || 0;
    this.subtype = param.subtype || '';

    this.state = param.state || 0;
    this.selected = false;

    this.info = false;

    this.effects = [];

    if ( param.position ) {
        this.position.x = param.position.x !== undefined ? Math.floor(param.position.x * 10) / 10 : 0;
        this.position.y = param.position.y !== undefined ? Math.floor(param.position.y * 10) / 10 : 0;
        this.position.z = param.position.z !== undefined ? Math.floor(param.position.z * 10) / 10 : 0;
    }

    if ( param.rotation ) {
        this.rotation.x = param.rotation.x !== undefined ? (Math.floor(param.rotation.x * 100) / 100) % (2 * Math.PI) : 0;
        this.rotation.y = param.rotation.y !== undefined ? (Math.floor(param.rotation.y * 100) / 100) % (2 * Math.PI) : 0;
        this.rotation.z = param.rotation.z !== undefined ? (Math.floor(param.rotation.z * 100) / 100) % (2 * Math.PI) : 0;
    }

    if ( param.scale ) {
        this.scale.x = param.scale.x !== undefined ? (Math.floor(param.scale.x * 100) / 100) % (2 * Math.PI) : 1;
        this.scale.y = param.scale.y !== undefined ? (Math.floor(param.scale.y * 100) / 100) % (2 * Math.PI) : 1;
        this.scale.z = param.scale.z !== undefined ? (Math.floor(param.scale.z * 100) / 100) % (2 * Math.PI) : 1;
    }

    if ( this.rotation.y < 0 ) {

        this.rotation.y = (2 * Math.PI + this.rotation.y) % (2 * Math.PI);

    }

};

GameObject.idCount = 0;

GameObject.prototype = {

    update: function () {

        // is reloaded

    },

    dispose: function () {

        var id = this.id;

        delete this.owner.buildings[id];
        delete this.owner.units[id];

    }

};
