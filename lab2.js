
var canvas;
var gl;
var points = [];
var colors = [];


var offset_x;
var offset_y;
	var vertices = [
		vec2(  0,  0),
		vec2(  .05,  -0.1),
		vec2( .1, 0),
		vec2( .05,0.1),
		vec2( -.05,0.1),
		vec2( -.1,0),
		vec2( -.05,-0.1)
	];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }    


    
    shape( vertices[0], vertices[1], vertices[2], vertices[3] , vertices[4] ,vertices[5] ,vertices[6], vertices[7]  );
	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1 );
        
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    gl.enableVertexAttribArray( vPosition );
	//event listeners for buttons

	window.addEventListener("keydown", function() {
	 switch (event.keyCode) {
		 case 65: // ’A’ key
		 
			offset_x=offset_x-1;
			vertices[0]=vec2(0+offset_x,0);
			alert(vertices[0]);
		 break;
		 case 83: // ’S’ key
			offset_y=offset_y-1;
		 break;
		 case 68: // ’D’ key
			offset_x=offset_xy+1;
		 break;
		 case 87: // ’W’ key
			offset_y=offset_y+1;
		 break;
		 case 49: // ’1’ key
			 offset_x=0;
			 offset_y=0;
		 break;
	 }
	 

	});
	
    render();
};



function triangle( a, b, c, color )
{

    // add colors and vertices for one triangle

    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(1, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 1.0, 1.0)
    ];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
	
}


function shape( a, b, c, d, e, f,g )
{
    // tetrahedron with each side using
    // a different color
	
    triangle( a, b, c, 0 );
    triangle( a, c, d, 1 );
    triangle( a, d, e, 2 );
	triangle( a, e, f, 0 );
	triangle( a, f, g, 1 );
	triangle( a, g, b, 2 );
	
}



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
