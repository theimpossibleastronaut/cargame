class MapObject extends GameObject {
	constructor( x, y, z ) {
		super();

		this.geomSizeH = 10;
		this.geomSizeV = 5;

		this.mesh = new THREE.Mesh( Game.geom, Game.mat );

		this.x = x;
		this.y = y;
		this.z = z;

		this.mesh.rotation.x = THREE.Math.degToRad(90);

		this.updatePosition();
	}

	updatePosition() {
		this.mesh.position.x = this.x * this.geomSizeH;
		this.mesh.position.y = this.y * this.geomSizeH;
		this.mesh.position.z = this.z * this.geomSizeV;
	}
}