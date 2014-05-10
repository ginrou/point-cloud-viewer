(function(){

    var scene;
    var camera;
    var controls;
    var renderer;
    var particleSystem;


    var addParticle = function(pt) {
	particleSystem.geometry.vertices.push(pt);
    }

    var init = function() {

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
	document.body.appendChild(renderer.domElement);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 0.7, 0.7 );
	scene.add(directionalLight);

	particleSystem = new THREE.ParticleSystem(
	    new THREE.Geometry(),
	    new THREE.ParticleBasicMaterial({color:0xFF0000})
	);
	scene.add(particleSystem);

	for ( var i = 0; i < 200; ++i ) {
	    addParticle(new THREE.Vector3(
		Math.random() * 20 - 10,
		Math.random() * 20 - 10,
		Math.random() * 20 - 10
	    ));
	}

    }

    var mainLoop = function() {
	requestAnimationFrame(mainLoop);
	controls.update();
	renderer.clear();
	renderer.render(scene, camera);
    }

    var main = function(){
	init();
	mainLoop();
    };

    window.addEventListener( 'DOMContentLoaded', main, false );
})();
