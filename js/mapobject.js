class MapObject extends GameObject {
	constructor( x, y, z ) {
		super();

		this.geomSizeH = 10;
		this.geomSizeV = 5;

		let texLoader = new THREE.TextureLoader();
		let texFacade = texLoader.load( './images/generic_facade.png' );
		let texFacadeDoor = texLoader.load( './images/generic_facade_door.png' );
		let texRooftop = texLoader.load( './images/generic_rooftop.png' );

		texFacade.anisotropy = 4;
		texFacadeDoor.anisotropy = 4;
		texRooftop.anisotropy = 4;

		this.geom = new THREE.BoxBufferGeometry( this.geomSizeH, this.geomSizeV, this.geomSizeH );
		this.mat = [
			new THREE.MeshBasicMaterial( { map: texFacade } ),
			new THREE.MeshBasicMaterial( { map: texFacade } ),
			new THREE.MeshBasicMaterial( { map: texRooftop } ),
			new THREE.MeshBasicMaterial( { map: texRooftop } ),
			new THREE.MeshBasicMaterial( { map: texFacadeDoor } ),
			new THREE.MeshBasicMaterial( { map: texFacade } )
		];

		this.mesh = new THREE.Mesh( this.geom, this.mat );
		this.mesh.receiveShadow = true;
		this.mesh.castShadow = true;

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