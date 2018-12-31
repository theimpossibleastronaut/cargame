class Player extends GameObject {
	constructor( x, y ) {
		super();

		this.MOVE_SPEED = 0.5;
		this.ROTATION_SPEED = 4;

		this.x = x;
		this.y = y;
		this.rotation = 90;

		this.geomSize = 1;

		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = false;

		this.moveSpeed = 0;
		this.rotationSpeed = 0;
		this.moveInterval = 1000 / 25;

		this.createMesh();

		this.updatePosition();
	}

	createMesh() {
		this.geom = new THREE.PlaneGeometry( this.geomSize, this.geomSize, this.geomSize, this.geomSize );
		this.tex = Game.texLoader.load( './images/player.png' );
		this.mat = new THREE.MeshLambertMaterial( {map: this.tex, transparent: true} );
		this.mesh = new THREE.Mesh( this.geom, this.mat );
	}

	updatePosition() {
		this.mesh.position.x = this.x;
		this.mesh.position.y = this.y;
		this.mesh.position.z = this.z;
		this.mesh.rotation.z = THREE.Math.degToRad( this.rotation );
	}

}