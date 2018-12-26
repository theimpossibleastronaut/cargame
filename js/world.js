class World {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		this.renderer.setPixelRatio( window.devicePixelRatio );

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( this.renderer.domElement );

		this.createMap();
		this.createLighting();

		window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
	}

	onWindowResize() {
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	animationUpdate() {
		this.renderer.render( this.scene, this.camera );
	}

	createMap() {
		let map = [ 0, 0, 1, 0, 1, 1, 0,
					0, 1, 0, 2, 1, 0, 0,
					0, 0, 0, 0, 0, 0, 2,
					1, 0, 1, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0,
					1, 0, 1, 0, 0, 0, 1,
					0, 1, 0, 0, 0, 0, 0
				  ];

		for ( let x = 0; x < 8; x++ ) {
			for ( let y = 0; y < 7; y++ ) {
				let index = (x * 7) + y;

				if ( map[index] > 0 ) {
					for ( let z = 0; z < map[index]; z++ ) {
						let block = new MapObject( y, x, z );
						this.scene.add( block.mesh );
					}
				}
			}
		}
	}

	createLighting() {
		let ambient = new THREE.AmbientLight( 0xcccccc, 0.7 );
		let dir = new THREE.DirectionalLight( 0xffffff, 0.5 );

		dir.position.set( 35, 35, 50 );
		dir.castShadow = true;
		dir.shadow.camera.near = 0.1;
		dir.shadow.camera.far = 25;

		this.scene.add( ambient );
		this.scene.add( dir );

		let fog = new THREE.FogExp2( 0xffffff, 0.0015 );
		this.scene.fog = fog;
	}
}