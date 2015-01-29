/*


ALLISON MONTROY
1/21/15



*/
var gl;
var points;
var i=1;
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	var t_vertices = [-.75, -.75, 0, .75, .75, -.75]; 
	var sq_vertices = [-.75, -.75, -.75, .75, .75, .75, .75,-.75]; 
	var st_vertices = [ 0, .75, .75, .25, .5, -.75, -.5, -.75, -.75,.25]; 	
	
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU

	var bt = gl.createBuffer();
	var bsq = gl.createBuffer();
	var bst = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bt );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(t_vertices), gl.STATIC_DRAW ); 
	
    // Associate our shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render(3);
	
	canvas.onclick = function () { 
		
		// Load the data into the GPU
		if(i==0){
		gl.bindBuffer( gl.ARRAY_BUFFER, bt );
		gl.bufferData( gl.ARRAY_BUFFER,flatten(t_vertices), gl.STATIC_DRAW ); 
		}
		else if (i==1){
		gl.bindBuffer( gl.ARRAY_BUFFER, bsq );
		gl.bufferData( gl.ARRAY_BUFFER,flatten(sq_vertices), gl.STATIC_DRAW );
		}
		else if(i==2){
		gl.bindBuffer( gl.ARRAY_BUFFER, bst );
		gl.bufferData( gl.ARRAY_BUFFER,flatten(st_vertices), gl.STATIC_DRAW );
		}
		
		// Associate our shader variables with our data buffer
		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );

		if(i==0){ render(3); i=1;}
		else if(i==1){ render(4); i=2;}
		else if(i==2){ render(5); i=0;}  
	};
	
};

function render(num) {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, num);
}
