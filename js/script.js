function init()
{
	var stats = initStats();

	var renderer = new THREE.WebGLRenderer(
	{
		antialias: true
	});
	var scene = new THREE.Scene();
	var axes = new THREE.AxisHelper(100);
	var fov = 45;
	var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, .1, 1000);
	var spotLight = new THREE.SpotLight(0xffffff);
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);

	var planeGeometry = new THREE.PlaneGeometry(1200, 1200);
	var planeMaterial = new THREE.MeshBasicMaterial(
	{
		color: 0xcccccc
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	var torusGeometry = new THREE.TorusGeometry(10, 3, 16, 12);
	var torusMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0xCC1E14
	});
	var torus = new THREE.Mesh(torusGeometry, torusMaterial);

	var octahedronGeometry = new THREE.OctahedronGeometry(12, 0);
	var octahedronMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0xAA9900
	});
	var octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);


	var icosahedronGeometry = new THREE.IcosahedronGeometry(12, 0);
	var icosahedronMaterial = new THREE.MeshLambertMaterial(
	{
		color: 0x00FFF3
	});
	var icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);

    renderer.setClearColor(new THREE.Color(0xeeeeee));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	
	camera.position.x = 90;
	camera.position.y = 45;
	camera.position.z = 90;
	camera.lookAt(scene.position);

	spotLight.position.set(60, 70, -40);
	spotLight.castShadow = true;
	// scene.fog = new THREE.Fog(0xF39BFF, .015, 200);
	
	plane.receiveShadow = true;
	plane.rotation.x = -.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;

	torus.receiveShadow = true;
	torus.castShadow = true;
	torus.position.x = 0;
	torus.position.y = 20;
	torus.position.z = 0;
	torus.rotation.y = 20;

	octahedron.receiveShadow = true;
	octahedron.castShadow = true;
	octahedron.position.x = 0;
	octahedron.position.y = 20;
	octahedron.position.z = 40;

	icosahedron.receiveShadow = true;
	icosahedron.castShadow = true;
	icosahedron.position.x = 0;
	icosahedron.position.y = 20;
	icosahedron.position.z = -40;


	scene.add(axes);
	scene.add(spotLight);
	scene.add(ambientLight);

	// scene.add(plane);
	scene.add(torus);
	scene.add(octahedron);
	scene.add(icosahedron);

	document.getElementById("container").appendChild(renderer.domElement);

	render();

	function render()
	{
		stats.update();

		torus.rotation.y += .04;
		octahedron.rotation.y += .04;
		icosahedron.rotation.y += .04;

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function initStats()
	{
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms
    
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("stats").appendChild(stats.domElement);

        return stats;
    }
}

window.onload = init