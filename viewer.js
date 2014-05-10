(function(){

    var scene;
    var camera;
    var controls;
    var renderer;
    var particleSystem;

    var initGraphics = function() {

	scene = new THREE.Scene();

	var width  = 700;
	var height = 700;
	var fov    = 60;
	var aspect = width / height;
	var near   = 1;
	var far    = 1000;

	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 20, 20, 20);
	camera.up.set(0, 0, 1);
	camera.lookAt(new THREE.Vector3(0,0,0));

	controls = new THREE.TrackballControls(camera);

	var axis = new THREE.AxisHelper(100);
	scene.add(axis);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	$("#renderArea").append(renderer.domElement);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 0.7, 0.7 );
	scene.add(directionalLight);

    }

    var reRenderParticleSystem = function(points) {
	if(particleSystem) {
	    scene.remove(particleSystem);
	}

	particleSystem = new THREE.ParticleSystem(
	    new THREE.Geometry(),
	    new THREE.ParticleBasicMaterial({color:0xFF0000})
	);

	for(var i = 0; i < points.length; ++i ) {
	    particleSystem.geometry.vertices.push(points[i]);
	}
	scene.add(particleSystem);
    }

    var mainLoop = function() {
	controls.update();
	renderer.clear();
	renderer.render(scene, camera);
	requestAnimationFrame(mainLoop);
    }

    var handleDragOver = function(event){
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy';
    };

    var handleFileSelect = function(event){
	event.stopPropagation();
	event.preventDefault();
	var files = event.dataTransfer.files;

	var outpus = [];
	for( var i = 0, f; f = files[i]; ++i ) {

	    // output file name
	    var elem = $("<ul>");
	    elem.append( $("<li>name : "+f.name+"</li>") );
	    elem.append( $("<li>size : "+f.size+" bytes</li>") );
	    elem.append( $("<li>lastMotified :"+f.lastModifiedDate.toLocaleDateString()+"</li>") );
	    $("#fileList").append(elem);

	    var reader = new FileReader();
	    reader.onload = function(loadEvent){

		var lines = loadEvent.target.result.split("\n");
		var points = new Array();
		for( var i = 0; i < lines.length; ++i ){
		    v = lines[i].split(",")
		    points.push(new THREE.Vector3(v[0], v[1], v[2]));
		}
		reRenderParticleSystem(points);
	    }
	    reader.readAsText(f);
	}
    };

    var initFileLoader = function(){
	var dropArea = document.getElementById("dropArea");
	dropArea.addEventListener('dragover', handleDragOver, false);
	dropArea.addEventListener('drop', handleFileSelect, false);
    };

    var main = function(){
	initGraphics();
	initFileLoader();
	mainLoop();
    };

    window.addEventListener( 'DOMContentLoaded', main, false );
})();
