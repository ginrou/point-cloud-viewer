var main = function(){
    console.log("hello world");
    var scene = new THREE.Scene();
    var width  = 600;
    var height = 400;
    var fov    = 60;
    var aspect = width / height;
    var near   = 1;
    var far    = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

    var camera_angle = {theta: 0, psi: 0};
    var camera_distance = 15;

    camera.position.set( camera_distance * Math.cos(camera_angle.theta),
			 camera_distance * Math.sin(camera_angle.theta),
			 camera_distance * Math.sin(camera_angle.psi));

    camera.lookAt(new THREE.Vector3(0,0,0));

    var axis = new THREE.AxisHelper(100);
    scene.add(axis);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7 );
    scene.add(directionalLight);

    var sphere = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.6, 0.2, 128, 32, 2, 3),
	new THREE.MeshPhongMaterial({color:0xff0000})
    );
    scene.add(sphere);


    // var circleGeometry = new THREE.CircleGeometry(2, 128);
    // circleGeometry.vertices.shift();
    // var circleMaeterial = new THREE.LineBasicMaterial({color:0x00ff00});
    // var xCircle = new THREE.Line(circleGeometry, circleMaeterial);
    // scene.add(xCircle);

    // var yCircle = new THREE.Line(circleGeometry, circleMaeterial);
    // yCircle.rotation.set( Math.Pi/2.0, 0, 0);
    // scene.add(yCircle);

    renderer.render(scene, camera);

    // mouse rotation
    var mousedown = false;
    var prevPoint;
    renderer.domElement.addEventListener('mousedown', function(e){
	mousedown = true;
	prevPoint = {x:e.x, y:e.y};
    }, false);

    renderer.domElement.addEventListener('mousemove', function(e){
	if(!mousedown) return;

	camera_angle.theta += 0.01 * (prevPoint.x - e.x);
	camera_angle.psi += 0.01 * (prevPoint.y - e.y);
	camera.position.set( camera_distance * Math.cos(camera_angle.theta),
			     camera_distance * Math.sin(camera_angle.theta),
			     camera_distance * Math.sin(camera_angle.psi));
	camera.lookAt(new THREE.Vector3(0,0,0));

	prevPoint = {x:e.x, y:e.y};
	renderer.render(scene, camera);
    }, false);

    renderer.domElement.addEventListener('mouseup', function(e){
	mousedown = false;
    }, false);

};

window.addEventListener( 'DOMContentLoaded', main, false );

