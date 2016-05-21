/*
 * GOT
 * @author: ohmed
 * Terrain water sys
*/

GOT.Water = function () {

    // add water plane

    var geometry = new NWE.gfx.PlaneGeometry( GOT.landscape.mapSize, GOT.landscape.mapSize, 2, 2 );
    geometry.applyMatrix( new NWE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    geometry.boundingSphere = new NWE.Sphere();
    geometry.boundingSphere.center.set( 0, 0, 0 );
    geometry.boundingSphere.radius = 8000;

    //

    var vertexShader = [

        'void main () {',

        '    vUv = uv;',
        '    vUv2 = 20.0 * vUv;',

        '    vec4 mvPosition;',
        '    mvPosition = modelViewMatrix * vec4( position, 1.0 );',
        '    gl_Position = projectionMatrix * mvPosition;',

        '}'

    ].join( '\n' );

    var fragmentShader = [

        'void main () {',

        '    float koef = 2.0 * texture2D( noiseMap, vUv ).r;',
        '    gl_FragColor = vec4( normalize( vec3( 0.3 + koef / 2.0, 0.8 + koef / 2.0, 1.0 + koef * 2.0 ) ), 0.5 );',

        '    vec2 uv2 = vec2( mod( vUv2.s + offset.x, 1.0 ), mod( vUv2.t + offset.y, 1.0 ) );',

        '    vec3 texture = texture2D( textureMap, uv2 ).rgb;',
        '    gl_FragColor = vec4( 0.3 * texture.r + 0.8 * gl_FragColor.r, 0.3 * texture.g + 0.8 * gl_FragColor.g, 0.3 * texture.b + 0.8 * gl_FragColor.b, gl_FragColor.a );',

        '}'

    ].join('\n');

    var material = new NWE.gfx.ShaderMaterial({
                        vertexShader: vertexShader,
                        fragmentShader: fragmentShader,
                        varyings: {
                            'vUv':      { type: 'v2' },
                            'vUv2':     { type: 'v2' },
                        },
                        attributes: {
                            'position': { type: 'v3' },
                            'uv':       { type: 'v2' }
                        },
                        uniforms: {
                            'noiseMap':     { type: 't', value: GOT.ResourceMng.getTexture('wind01'), global: -1 },
                            'textureMap':   { type: 't', value: GOT.ResourceMng.getTexture('water'), global: -1 },
                            'offset':       { type: 'v2', value: new  NWE.Vec2( 0, 0 ), global: -1 },

                            'modelViewMatrix':  { type: 'm4', value: null, global: 2 },
                            'projectionMatrix': { type: 'm4', value: null, global: 2 }
                        },
                        transparent: true
                    });

    material.uniforms.textureMap.value.image.id = 'WATER';

    material.programId = 1000000;

    //

    var waterMesh = new NWE.gfx.Mesh( geometry, material );
    waterMesh.type = 'Water';
    GOT.view.add( waterMesh );

    this.mesh = waterMesh;
    this.offset = material.uniforms.offset.value;

};

GOT.Water.prototype.update = function ( delta ) {

    this.offset.x += delta / 50;
    this.offset.y += delta / 50;

};

GOT.Water.prototype.show = function () {

    this.mesh.visible = true;

};

GOT.Water.prototype.hide = function () {

    this.mesh.visible = false;

};
