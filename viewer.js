(function(){

    var scene;
    var camera;
    var controls;
    var renderer;

    var gen_circle = function(radius){
	if(typeof radius === 'undefined') radius = 1.0;
	
	var material = new THREE.MeshBasicMaterial({color:0x0000ff});
	var circleGeometry = new THREE.CircleGeometry(circleGeometry, material);
	return new THREE.Mesh(circleGeometry, material);
    };

    var add_object = function(scene, pos) {
	var sphere = new THREE.Mesh(
	    new THREE.TorusKnotGeometry(0.6, 0.2, 128, 32, 2, 3),
	    new THREE.MeshPhongMaterial({color:0xff0000})
	);
	scene.add(sphere);

	circle = gen_circle();
	circle.position = new THREE.Vector3(pos[0], pos[1], pos[2]);
	scene.add(circle);

    };

    var init = function() {

	scene = new THREE.Scene();

	var width  = 600;
	var height = 400;
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

	add_object(scene, renderer, [1,2,3]);

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
