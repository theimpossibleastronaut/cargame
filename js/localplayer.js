class LocalPlayer extends Player {
	constructor( x, y ) {
		super( x, y );

		this.positionCallback = null;

		setInterval( this.updateControls.bind(this), this.moveInterval );
		window.addEventListener( 'keydown', this.keydown.bind(this), false );
		window.addEventListener( 'keyup', this.keyup.bind(this), false );
	}

	keydown( ev ) {
		if ( ev.keyCode == 37 ) {
			this.moveLeft = true;
		} else if ( ev.keyCode == 38 ) {
			this.moveUp = true;
		} else if ( ev.keyCode == 39 ) {
			this.moveRight = true;
		} else if ( ev.keyCode == 40 ) {
			this.moveDown = true;
		}
	}

	keyup( ev ) {
		if ( ev.keyCode == 37 ) {
			this.moveLeft = false;
		} else if ( ev.keyCode == 38 ) {
			this.moveUp = false;
		} else if ( ev.keyCode == 39 ) {
			this.moveRight = false;
		} else if ( ev.keyCode == 40 ) {
			this.moveDown = false;
		}
	}

	updateControls() {

		let dirty = false;

		if ( this.moveRight || this.moveLeft ) {
			this.rotationSpeed = this.ROTATION_SPEED;
		} else {
			this.rotationSpeed = 0;
		}

		if ( this.moveRight ) {
			this.rotation -= this.rotationSpeed;
			if ( this.rotation < 0 ) {
				this.rotation = 360 - this.rotation;
			}

			dirty = true;
		}

		if ( this.moveLeft ) {
			this.rotation += this.rotationSpeed;
			if ( this.rotation >= 360 ) {
				this.rotation = this.rotation % 360;
			}

			dirty = true;
		}

		if ( this.moveUp || this.moveDown ) {
			this.moveSpeed = this.MOVE_SPEED;
		} else {
			this.moveSpeed = 0;
		}

		if ( this.moveUp ) {
			this.x += ( Math.cos( THREE.Math.degToRad( this.rotation ) ) * this.moveSpeed );
			this.y += ( Math.sin( THREE.Math.degToRad( this.rotation ) ) * this.moveSpeed );
			dirty = true;
		}

		if ( this.moveDown ) {
			this.x -= ( Math.cos( THREE.Math.degToRad( this.rotation ) ) * this.moveSpeed );
			this.y -= ( Math.sin( THREE.Math.degToRad( this.rotation ) ) * this.moveSpeed );
			dirty = true;
		}

		if ( dirty ) {
			this.updatePosition();

			if ( typeof this.positionCallback == "function" ) {
				this.positionCallback.call();
			}
		}

	}
}