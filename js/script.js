function init()
{
	var stats = initStats();

	var scene = new THREE.Scene();
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

	var planeGeometry = new THREE.PlaneGeometry(60, 20);
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

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 0;
	camera.lookAt(scene.position);

	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLight);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
	scene.add(spotLight);

	document.getElementById("container").appendChild(renderer.domElement);

	var step = 0;
	var controls = new function()
	{
		this.rotationSpeed = .02;
		this.numberOfObjects = scene.children.length;

		this.cameraX = 0;
		this.cameraY = 0;
		this.cameraZ = 0;
		this.cameraRotationX = 0;
		this.cameraRotationY = 0;
		this.cameraRotationZ = 0;
		this.fov = 45;

		this.removeCube = function()
		{
			var allChildren = scene.children;
			var lastObject = allChildren[allChildren.length - 1];

			if(lastObject instanceof THREE.Mesh)
			{
				scene.remove(lastObject);
				this.numberOfObjects = scene.children.length;
			}
		};

		this.addCube = function()
		{
			var cubeSize = Math.ceil((Math.random() * 3));
			var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
			var cubeMaterial = new THREE.MeshLambertMaterial(
			{
				color: Math.random() * 0xffffff
			});
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.castShadow = true;
			cube.name = "cube-1" + scene.children.length;

			cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
			cube.position.y = Math.round((Math.random() * 5));
			cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

			scene.add(cube);
			this.numberOfObjects = scene.children.length;	
		};

		this.outputObjects = function()
		{
			console.log(scene.children);
		};
	};

	var gui = new dat.GUI();
	gui.add(controls, 'rotationSpeed', 0, .5);
	gui.add(controls, 'addCube');
	gui.add(controls, 'removeCube');
	gui.add(controls, 'outputObjects');
	gui.add(controls, 'numberOfObjects').listen();
	gui.add(controls, 'cameraX', -90, 90);
	gui.add(controls, 'cameraY', -90, 90);
	gui.add(controls, 'cameraZ', -90, 90);
	gui.add(controls, 'cameraRotationX', -90, 90);
	gui.add(controls, 'cameraRotationY', -90, 90);
	gui.add(controls, 'cameraRotationZ', -90, 90);
	gui.add(controls, 'fov', 45, 120);

	render();

	function render()
	{
		stats.update();

		scene.traverse(function(e)
		{
			if(e instanceof THREE.Mesh && e != plane)
			{
				e.rotation.x += controls.rotationSpeed;
				e.rotation.y += controls.rotationSpeed;
				e.rotation.z += controls.rotationSpeed;
			}
		});

		camera.position.x = controls.cameraX;
		camera.position.y = controls.cameraY;
		camera.position.z = controls.cameraZ;

		camera.rotation.x = controls.cameraRotationX;
		camera.rotation.y = controls.cameraRotationY;
		camera.rotation.z = controls.cameraRotationZ;
		camera.fov = controls.fov;

		camera.updateProjectionMatrix();

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function initStats()
	{
		var stats = new Stats();

		stats.setMode(0);
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';


		document.getElementById("stats").appendChild(stats.domElement);

		return stats;
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