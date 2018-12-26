class Game {
	constructor() {
		this.world = new World();
		this.localPlayer = new LocalPlayer( 35, 35 );

		this.world.scene.add( this.localPlayer.mesh );

		this.animationUpdate();
	}

	animationUpdate() {
		requestAnimationFrame( this.animationUpdate.bind(this) );

		this.world.camera.position.x = this.localPlayer.x;
		this.world.camera.position.y = this.localPlayer.y;
		this.world.camera.position.z = 20;

		this.world.animationUpdate();
	}
}