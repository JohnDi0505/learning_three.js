function init() {
    // initialize stats
    var stats = initStats();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(); // new THREE.Color(0xEEEEEE, 0.5)
    renderer.setSize(window.innerWidth, window.innerHeight);
    // enable shadow in the scene
    renderer.shadowMapEnabled = true;
    
    // add axes & geometries
    var axes = new THREE.AxesHelper(10);
    scene.add(axes);
    
    // add lights & shadows
    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-40, 60, -10);
    spotlight.castShadow = true;
    scene.add(spotlight);
    // add lights & shadows
    
    var planeGeometry = new THREE.PlaneGeometry(80, 20);
    var planeMeterial = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( planeGeometry, planeMeterial);
    plane.receiveShadow = true;
    scene.add(plane);
    
    plane.rotation.x = -0.5 * Math.PI;
                
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMeterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    
    scene.add(cube);
    
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMeterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMeterial);
    sphere.castShadow = true;
    
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    
    scene.add(sphere);
    // add axes & geometries
    
    camera.position.x = -20;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    
    // function to stylize stats box
    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById("Stats-output")
                .appendChild(stats.domElement);
        return stats;
    };
    // function to stylize stats box
    
    // initialize bouncing step
    var step = 0;
    function renderScene() {
        stats.update();
        
        // rotate the cube
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;
        // rotate the cube
        
        // bounce the ball
        step += 0.04;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
        // bounce the ball
        
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
        }

        document.getElementById("WebGL-output")
                .appendChild(renderer.domElement);
        renderScene();
};

window.onload = init;