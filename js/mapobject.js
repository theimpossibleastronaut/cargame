class MapObject extends GameObject {
	constructor( x, y, z ) {
		super();

		this.geomSizeH = 10;
		this.geomSizeV = 5;

		let texLoader = new THREE.TextureLoader();
		this.geom = new THREE.BoxBufferGeometry( this.geomSizeH, this.geomSizeH, this.geomSizeV );
		this.mat = [
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_facade.png' ) } ),
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_facade.png' ) } ),
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_facade.png' ) } ),
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_facade_door.png' ) } ),
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_rooftop.png' ) } ),
			new THREE.MeshLambertMaterial( { map: texLoader.load( './images/generic_rooftop.png' ) } )
		];

		this.mesh = new THREE.Mesh( this.geom, this.mat );

		this.x = x;
		this.y = y;
		this.z = z;

		this.updatePosition();
	}

	updatePosition() {
		this.mesh.position.x = this.x * this.geomSizeH;
		this.mesh.position.y = this.y * this.geomSizeH;
		this.mesh.position.z = this.z * this.geomSizeV;
	}
}