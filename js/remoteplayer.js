class RemotePlayer extends Player {
	constructor( clientId ) {
		super( 0, 0 );

		this.clientId = clientId;
		this.interval = null;
		this.timeout = null;
		this.lastMessage = null;
		this.extrapolateIteration = 0;

		this.moveInterval = 1000 / 25;
	}

	destroy() {
		if ( this.interval !== null) {
			clearInterval( this.interval );
			this.interval = null;
		}
	}

	updateFromMessage( message ) {
		this.x = message.x;
		this.y = message.y;
		this.rotation = message.rotation;
		this.moveSpeed = message.moveSpeed;
		this.rotationSpeed = message.rotationSpeed;
		this.moveUp = message.moveUp;
		this.moveDown = message.moveDown;
		this.moveLeft = message.moveLeft;
		this.moveRight = message.moveRight;

		this.updatePosition();

		this.killLingeringInterval();

		if ( this.timeout !== null ) {
			clearTimeout( this.timeout );
		}

		this.lastMessage = message;
		this.extrapolateIteration = 0;
		this.interval = setInterval( this.extrapolate.bind( this ), this.moveInterval );
		this.timeout = setTimeout( this.killLingeringInterval.bind( this ), 1000 );
	}

	killLingeringInterval() {
		if ( this.interval !== null) {
			clearInterval( this.interval );
		}
	}

	extrapolate() {
		this.extrapolateIteration++;

		if ( this.lastMessage !== null) {
			// Smoothing / extrapolation here

			this.updatePosition();
		}
	}
}