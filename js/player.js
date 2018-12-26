class Player extends GameObject {
	constructor( x, y ) {
		super();

		this.x = x;
		this.y = y;
		this.rotation = 90;

		this.geomSize = 1;

		this.createMesh();

		this.updatePosition();
	}

	createMesh() {
		let texLoader = new THREE.TextureLoader();

		this.geom = new THREE.PlaneGeometry( this.geomSize, this.geomSize, this.geomSize, this.geomSize );
		this.tex = texLoader.load( './images/player.png' );
		this.mat = new THREE.MeshLambertMaterial( {map: this.tex, transparent: true} );
		this.mesh = new THREE.Mesh( this.geom, this.mat );
	}

	updatePosition() {
		this.mesh.position.x = this.x * this.geomSize;
		this.mesh.position.y = this.y * this.geomSize;
		this.mesh.position.z = this.z * this.geomSize;
		this.mesh.rotation.z = THREE.Math.degToRad( this.rotation );
	}

}