class Game {
	static texLoader = new THREE.TextureLoader();
	static texFacade = Game.texLoader.load( './images/generic_facade.png' );
	static texFacadeDoor = Game.texLoader.load( './images/generic_facade_door.png' );
	static texRooftop = Game.texLoader.load( './images/generic_rooftop.png' );
	static mat = [
			new THREE.MeshBasicMaterial( { map: Game.texFacade } ),
			new THREE.MeshBasicMaterial( { map: Game.texFacade } ),
			new THREE.MeshBasicMaterial( { map: Game.texRooftop } ),
			new THREE.MeshBasicMaterial( { map: Game.texRooftop } ),
			new THREE.MeshBasicMaterial( { map: Game.texFacadeDoor } ),
			new THREE.MeshBasicMaterial( { map: Game.texFacade } )
		];
	static geom = new THREE.BoxBufferGeometry( 10, 5, 10 )

	constructor() {
		this.world = new World();

		this.stats = new Stats();
		document.getElementById( "container" ).appendChild( this.stats.dom );

		this.localPlayer = new LocalPlayer( 35, 35 );
		this.localPlayer.positionCallback = this.localPlayerIsDirty.bind( this );

		this.world.scene.add( this.localPlayer.mesh );

		this.comm = new Comm();
		this.comm.messageCallback = this.messageCallback.bind(this);

		this.remotePlayers = {};

		this.localPlayerIsDirty();
		this.animationUpdate();
	}

	animationUpdate() {
		requestAnimationFrame( this.animationUpdate.bind(this) );

		this.stats.begin();

		this.world.animationUpdate();

		this.stats.end();
	}

	localPlayerIsDirty( ) {
		this.world.camera.position.x = this.localPlayer.x;
		this.world.camera.position.y = this.localPlayer.y;
		this.world.camera.position.z = 20;
		this.comm.sendPlayerUpdate( this.localPlayer );
	}

	messageCallback( message ) {
		//console.log( message );
		if ( message.type == "disconnect" ) {
			if ( typeof this.remotePlayers[ message.client ] == "object" ) {
				let obj = this.remotePlayers[ message.client ];
				this.world.scene.remove( obj.mesh );

				obj.destroy();

				delete this.remotePlayers[ message.client ];
			}
		} else if ( message.type == "data" ) {
			let obj = null;

			if ( typeof this.remotePlayers[ message.client ] == "object" ) {
				obj = this.remotePlayers[ message.client ];
			} else {
				obj = new RemotePlayer( message.client );
				this.remotePlayers[ message.client ] = obj;
				this.world.scene.add( obj.mesh );
			}

			obj.updateFromMessage( message );
		}
	}
}