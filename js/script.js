function init()
{
	var scene = new THREE.Scene();
	// scene.fog = new THREE.Fog(0xffffff, .015, 50);
	var fov = 45;
	var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
	
	var renderer = new THREE.WebGLRenderer(
	{
		antialias: true
	});
    renderer.setClearColor(new THREE.Color(0xeeeeee));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	var axes = new THREE.AxisHelper(20);
	scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(100, 100);
	var planeMaterial = new THREE.MeshBasicMaterial(
	{
		color: 0xcccccc
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	plane.rotation.x = -.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	var cubeGemoetry = new THREE.BoxGeometry(10, 10, 10);
	var cubeMaterial = new THREE.MeshBasicMaterial(
	{
		color: 0xe74c3c
	});
	var cube = new THREE.Mesh(cubeGemoetry, cubeMaterial);
	cube.receiveShadow = true;
	cube.castShadow = true;
	cube.position.x = 0;
	cube.position.y = 10;
	cube.position.z = 0;

	scene.add(cube);

	camera.position.x = 15;
	camera.position.y = 30;
	camera.position.z = -70;
	camera.lookAt(scene.position);

	var ambientLight = new THREE.AmbientLight(0xe74c3c);
	scene.add(ambientLight);

	var spotLight = new THREE.SpotLight(0x000000);
	spotLight.position.x = 20; 
	spotLight.position.y = 20;
	spotLight.position.z = 20;
	spotLight.castShadow = true;
	scene.add(spotLight);

	document.getElementById("container").appendChild(renderer.domElement);

	render();

	function render()
	{
		// camera.updateProjectionMatrix();

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
}

// function onResize()
// {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	console.log('fire');
// }

window.onload = init