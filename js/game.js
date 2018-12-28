class Game {
	constructor() {
		this.world = new World();
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

		this.world.animationUpdate();
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

			obj.x = message.x;
			obj.y = message.y;
			obj.rotation = message.rotation;
			obj.updatePosition();
		}
	}
}