/*
 * GOT
 * @author: ohmed
 * Intersect sys for view.scene objects
*/

var Picker = function () {

    this.objSelector = new NWE.gfx.GpuSelector();
    this.objSelector.addEventListener( 'onSelect', this.onObjectSelect );

    this.projector = new NWE.gfx.Projector();

    this._vector = new NWE.Vec3();
    this._ray = new NWE.Ray();

    this.pickableObjects = {};

};

Picker.prototype.onObjectSelect = function ( event ) {

    var selectedObject = GOT.view.picker.pickableObjects[ 'id' + event.objectID ];

    if ( selectedObject && selectedObject.onClick ) {

        selectedObject.onClick();

    }

};

Picker.prototype.deltaScreenToWorld = function ( x, y, dx, dy ) {

    var landscapePoint1, landscapePoint2;

    landscapePoint1 = GOT.view.picker.pick({
                            x: x,
                            y: y
                        }, GOT.view.camera, 'landscape').point;

    landscapePoint2 = GOT.view.picker.pick({
                            x: x - dx,
                            y: y - dy
                        }, GOT.view.camera, 'landscape').point;

    var dx = landscapePoint2.x - landscapePoint1.x;
    var dz = landscapePoint2.z - landscapePoint1.z;

    return { dx: dx, dz: dz };

};

Picker.prototype.getPointedObj = function ( x, y, intersectPoint, camera ) {

    this.objSelector.pick( x / window.innerWidth, y / window.innerHeight, camera );

};

Picker.prototype.getScreenPos = function ( point, camera ) {

    point = new NWE.Vec3( point.x, point.y, point.z );

    var widthHalf = window.innerWidth / 2,
        heightHalf = window.innerHeight / 2,
        vector = this.projector.projectVector( point, camera );

    return {

        x: ( vector.x * widthHalf ) + widthHalf,
        y: - ( vector.y * heightHalf ) + heightHalf

    };

};

Picker.prototype.removeObjectPickable = function ( gameObj ) {

    gameObj.pickable = false;
    this.objSelector.removeObject( gameObj );

};

Picker.prototype.addObjectPickable = function ( gameObj ) {

    this.objSelector.addObject({

        id:       gameObj.id,
        size:     gameObj.size,
        rotation: gameObj.rotation.clone(),
        position: gameObj.position.clone(),

        staticObject: true

    });

    gameObj.pickable = true;
    this.pickableObjects[ 'id' + gameObj.id ] = gameObj;

};

Picker.prototype.pick = function ( point, camera, param ) {

    var self = this,

        alpha, dx, dy, dz,
        k, steps, terrainSize;

    //

    self._vector.set( ( point.x / window.innerWidth ) * 2 - 1, - ( point.y / window.innerHeight ) * 2 + 1, 0.5 );
    self.projector.unprojectVector( self._vector, camera );

    self._ray.set( camera.position, self._vector.sub( camera.position ).normalize() );
    alpha = - Math.atan( self._ray.direction.z / self._ray.direction.x ) - Math.PI / 2;

    k = camera.position.y / self._ray.direction.y;
    dx = - self._ray.direction.x * k;
    dz = - self._ray.direction.z * k;
    steps = 300;

    var pos = new NWE.Vec3();
    var intrPoint = new NWE.Vec3();

    for ( var i = 0, h; i <= steps; i ++ ) {

        intrPoint.set(
            camera.position.x + ( i + 3 ) * dx / steps,
            0,
            camera.position.z + ( i + 3 ) * dz / steps
        );

        h = 5;

        if ( h >= camera.position.y - i * camera.position.y / steps ) {

            if ( param === 'landscape' ) {

                return {

                    type:     null,
                    objects:  [],
                    point:    new NWE.Vec3( intrPoint.x, 0, intrPoint.z )

                };

            } else {

                return self.getPointedObj( point.x, point.y, new NWE.Vec3( intrPoint.x, 0, intrPoint.z ), camera );
            
            }

        }

    }

    return self.getPointedObj( point.x, point.y, intrPoint, camera );

};
