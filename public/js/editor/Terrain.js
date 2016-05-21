/*
 * GOT
 * @author: ohmed
*/

Editor.Terrain = function () {

};

Editor.Terrain.prototype.init = function () {

    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024 * 3;
    this.canvas.height = 1024 * 3;

    this.ctx = this.canvas.getContext('2d');

    this.mappingsList = [];

    this.states = [];
    this.activeState = -1;

};

Editor.Terrain.prototype.prepareMapping = function ( mapping ) {

    var size = 512 * 6;

    this.ctx.drawImage( mapping, 0, 0, size, size, 0, 0, size, size );

    //

    this.saveState();

};

Editor.Terrain.prototype.updateMapping = function () {

    var mapping;
    var id = 0;
    var part;
    var size = 512;

    var offset = [ 8, 0, -8 ];

    for ( var j = 0; j < 3; j ++ ) {

        for ( var i = 0; i < 3; i ++ ) {

            if ( ! this.mappingsList[ id ] ) {

                var canvas = document.createElement('canvas');
                canvas.width = 1024;
                canvas.height = 1024;

                GOT.landscape.terrain.blocks[ id ].setMapping( canvas );
                this.mappingsList[ id ] = { canvas: canvas, ctx: canvas.getContext('2d') };

            }

            var ctx = this.mappingsList[ id ].ctx;

            part = this.ctx.getImageData( i * size + offset[ i ], j * size + offset[ j ], size, size );
            ctx.putImageData( part, 0, 0 );

            part = this.ctx.getImageData( i * size + 3 * size + offset[ i ], j * size + offset[ j ], size, size );
            ctx.putImageData( part, size, 0 );

            part = this.ctx.getImageData( i * size + offset[ i ], j * size + 3 * size + offset[ j ], size, size );
            ctx.putImageData( part, 0, size );

            part = this.ctx.getImageData( i * size + 3 * size + offset[ i ], j * size + 3 * size + offset[ j ], size, size );
            ctx.putImageData( part, size, size );

            GOT.landscape.terrain.blocks[ id ].updateMapping();

            id ++;

        }

    }

};

Editor.Terrain.prototype.draw = function ( marker ) {

    var mappingSize = 512; 

    var type = marker.subtype;
    var position = marker.position;
    var size = ( marker.size / GOT.landscape.terrain.gridSize ) * mappingSize * 2;
    size = size - ( size % 2 );

    if ( size <= 0 ) size = 2;

    //

    var x = 8 + Math.floor( position.x * ( mappingSize - 8 ) * 3 );
    var y = 8 + Math.floor( position.y * ( mappingSize - 8 ) * 3 );

    //

    function paint ( opacity, intensity, textureType ) {

        var localIntensity;
        var dist;
        var id;

        var mappingColor = textureType % 4;

        var deltaX = ( Math.floor( textureType / 4 ) % 2 ) * 3 * mappingSize;
        var deltaY = Math.floor( Math.floor( textureType / 4 ) / 2 ) * 3 * mappingSize;

        var mapData = this.ctx.getImageData( x + deltaX - size / 2, y + deltaY - size / 2, size, size );

        for ( var i = -size / 2, il = size / 2; i < il; i ++ ) {

            for ( var j = -size / 2, jl = size / 2; j < jl; j ++ ) {

                dist = Math.sqrt( i * i + j * j );
                if ( dist > size / 2 ) continue;

                localIntensity = intensity * ( size - dist ) / size;

                id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );
                mapData.data[ id + mappingColor ] = Math.min( mapData.data[ id + mappingColor ] + 255 * localIntensity, 255 * opacity );

            }

        }

        this.ctx.putImageData( mapData, x + deltaX - size / 2, y + deltaY - size / 2 );

    };

    function erase () {

        var mappingColor;
        var deltaX, deltaY;
        var mapData;
        var i, j;
        var dist, id;

        for ( var textureType = 0; textureType < 15; textureType ++ ) {

            if ( textureType === 14 || ( textureType + 1 ) % 4 === 0 ) continue;

            mappingColor = textureType % 4;

            deltaX = ( Math.floor( textureType / 4 ) % 2 ) * 3 * mappingSize;
            deltaY = Math.floor( Math.floor( textureType / 4 ) / 2 ) * 3 * mappingSize;

            mapData = this.ctx.getImageData( x + deltaX - size / 2, y + deltaY - size / 2, size, size );

            for ( i = -size / 2, il = size / 2; i < il; i ++ ) {

                for ( j = -size / 2, jl = size / 2; j < jl; j ++ ) {

                    dist = Math.sqrt( i * i + j * j );
                    if ( dist > size / 2 ) continue;

                    id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );

                    if ( textureType === 0 ) {

                        mapData.data[ id + mappingColor ] = 255;

                    } else {

                        mapData.data[ id + mappingColor ] = 0;

                    }

                }

            }

            this.ctx.putImageData( mapData, x + deltaX - size / 2, y + deltaY - size / 2 );

        }

    };

    //

    function smooth () {

        var mappingColor = 2;
        var dist;
        var newValue;
        var id;

        var deltaX = mappingSize * 3;
        var deltaY = mappingSize * 3;

        var mapData = this.ctx.getImageData( x + deltaX - size / 2, y + deltaY - size / 2, size, size );

        for ( var i = -size / 2 + 1, il = size / 2 - 1; i < il; i ++ ) {

            for ( var j = -size / 2 + 1, jl = size / 2 - 1; j < jl; j ++ ) {

                dist = Math.sqrt( i * i + j * j );
                if ( dist > size / 2 ) continue;

                id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );

                newValue  = mapData.data[ id + mappingColor ];
                newValue += mapData.data[ id + mappingColor + 4 ];
                newValue += mapData.data[ id + mappingColor - 4 ];
                newValue += mapData.data[ id + mappingColor + 4 * size ];
                newValue += mapData.data[ id + mappingColor - 4 * size ];
                newValue += mapData.data[ id + mappingColor + 4 * size + 4 ];
                newValue += mapData.data[ id + mappingColor + 4 * size - 4 ];
                newValue += mapData.data[ id + mappingColor - 4 * size + 4 ];
                newValue += mapData.data[ id + mappingColor - 4 * size - 4 ];

                newValue /= 9;

                mapData.data[ id + mappingColor ] = newValue;

            }

        }

        this.ctx.putImageData( mapData, x + deltaX - size / 2, y + deltaY - size / 2 );

    };

    function smoothX2 () {

        var mappingColor = 2;
        var dist;
        var newValue;
        var id;

        var deltaX = mappingSize * 3;
        var deltaY = mappingSize * 3;

        var mapData = this.ctx.getImageData( x + deltaX - size / 2, y + deltaY - size / 2, size, size );

        var sum = 0;
        var pixelCount = 0;

        for ( var i = -size / 2 + 2, il = size / 2 - 2; i < il; i ++ ) {

            for ( var j = -size / 2 + 2, jl = size / 2 - 2; j < jl; j ++ ) {

                dist = Math.sqrt( i * i + j * j );
                if ( dist > size / 2 ) continue;

                id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );

                sum += mapData.data[ id + mappingColor ];
                pixelCount ++;

            }

        }

        var middleValue = sum / pixelCount;
        var k;

        for ( var i = -size / 2 + 2, il = size / 2 - 2; i < il; i ++ ) {

            for ( var j = -size / 2 + 2, jl = size / 2 - 2; j < jl; j ++ ) {

                dist = Math.sqrt( i * i + j * j );
                if ( dist > size / 2 ) continue;

                id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );

                k = Math.min( 2 * dist / size, 0.5 );

                mapData.data[ id + mappingColor ] = ( 1 - k ) * mapData.data[ id + mappingColor ] + k * middleValue;

            }

        }

        this.ctx.putImageData( mapData, x + deltaX - size / 2, y + deltaY - size / 2 );

    };

    function noise () {

        var mappingColor = 2;
        var dist;
        var newValue;
        var id;

        var deltaX = mappingSize * 3;
        var deltaY = mappingSize * 3;

        var mapData = this.ctx.getImageData( x + deltaX - size / 2, y + deltaY - size / 2, size, size );

        for ( var i = -size / 2 + 1, il = size / 2 - 1; i < il; i ++ ) {

            for ( var j = -size / 2 + 1, jl = size / 2 - 1; j < jl; j ++ ) {

                dist = Math.sqrt( i * i + j * j );
                if ( dist > size / 2 ) continue;

                id = 4 * ( ( i + size / 2 ) + size * ( j + size / 2 ) );

                newValue  = mapData.data[ id + mappingColor ];
                newValue += mapData.data[ id + mappingColor + 4 ];
                newValue += mapData.data[ id + mappingColor - 4 ];
                newValue += mapData.data[ id + mappingColor + 4 * size ];
                newValue += mapData.data[ id + mappingColor - 4 * size ];
                newValue += mapData.data[ id + mappingColor + 4 * size + 4 ];
                newValue += mapData.data[ id + mappingColor + 4 * size - 4 ];
                newValue += mapData.data[ id + mappingColor - 4 * size + 4 ];
                newValue += mapData.data[ id + mappingColor - 4 * size - 4 ];

                newValue /= 9;

                mapData.data[ id + mappingColor ] = newValue + 5 * ( Math.random() - 0.5 );

            }

        }

        this.ctx.putImageData( mapData, x + deltaX - size / 2, y + deltaY - size / 2 );

    };

    // zero bg ground

    paint.call( this, 0.08, 0.001, 0 );

    switch ( type ) {

        case 'SMOOTHX2':

            smoothX2.call( this );
            break;

        case 'SMOOTH':

            smooth.call( this );
            break;

        case 'DOWN':

            paint.call( this, 1, -0.02, 14 );
            break;

        case 'UP':

            paint.call( this, 1, 0.02, 14 );
            break;

        case 'GRASS01':

            paint.call( this, 1, 0.05, 1 );
            break;

        case 'GRASS02':

            paint.call( this, 1, 0.05, 2 );
            break;

        case 'CLIFF':

            paint.call( this, 1, 0.05, 4 );
            break;

        case 'SNOW':

            paint.call( this, 1, 0.05, 5 );
            break;

        case 'SWAMP':

            paint.call( this, 1, 0.05, 6 );
            break;

        case 'ERASER':

            erase.call( this );
            break;

        case 'NOISE':

            noise.call( this );
            break;

    }

    //

    this.updateMapping();

};

Editor.Terrain.prototype.saveState = function () {

    for ( var i = this.activeState + 1, il = this.states.length; i < il; i ++ ) {

        this.states.pop();

    }

    this.activeState ++;

    this.states.push( this.canvas.toDataURL() );

};

Editor.Terrain.prototype.undo = function () {

    var self = this;

    var canvasPic = new Image();

    if ( ! this.states[ this.activeState - 1 ] ) {

        return;

    }

    this.activeState --;

    canvasPic.src = this.states[ this.activeState ];
    canvasPic.onload = function () {

        self.ctx.drawImage( canvasPic, 0, 0 );
        self.updateMapping();

    };

};

Editor.Terrain.prototype.redo = function () {

    var self = this;

    var canvasPic = new Image();

    if ( ! this.states[ this.activeState + 1 ] ) {

        return;

    }

    this.activeState ++;

    canvasPic.src = this.states[ this.activeState ];

    canvasPic.onload = function () {

        self.ctx.drawImage( canvasPic, 0, 0 );
        self.updateMapping();

    };

};

Editor.Terrain.prototype.exportDev = function () {

    var a = document.createElement('a');
    document.body.appendChild( a );

    a.download = 'mappingDev.png';
    a.href = this.canvas.toDataURL().replace( 'image/png', 'image/octet-stream' );

    var evObj = document.createEvent('Events');
    evObj.initEvent( 'click', true, false );
    a.dispatchEvent( evObj );

};

Editor.Terrain.prototype.exportForStatic = function () {

    var a = document.createElement('a');
    document.body.appendChild( a );

    var self = this;

    var size = 512;

    var offset = [ 8, 0, -8 ];

    for ( var j = 0; j < 3; j ++ ) {

        for ( var i = 0; i < 3; i ++ ) {

            setTimeout( function ( ti, tj ) {

                var canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;

                var ctx = canvas.getContext('2d');

                var part = self.ctx.getImageData( ti * size + 3 * size + offset[ ti ], tj * size + 3 * size + offset[ tj ], size, size );
                ctx.putImageData( part, 0, 0 );

                a.download = 'map' + ( ti + tj * 3 + 1 ) + '.png';
                a.href = canvas.toDataURL().replace( 'image/png', 'image/octet-stream' );

                var evObj = document.createEvent('Events');
                evObj.initEvent( 'click', true, false );
                a.dispatchEvent( evObj );

            }, 100 * i, i, j );

        }

    }

};

Editor.Terrain.prototype.export = function () {

    var a = document.createElement('a');
    document.body.appendChild( a );

    var self = this;

    for ( var i = 0; i < 9; i ++ ) {

        setTimeout( function ( id ) {

            a.download = 'map' + ( id + 1 ) + '.png';
            a.href = self.mappingsList[ id ].canvas.toDataURL().replace( 'image/png', 'image/octet-stream' );

            var evObj = document.createEvent('Events');
            evObj.initEvent( 'click', true, false );
            a.dispatchEvent( evObj );

        }, 100 * i, i );

    }

};
