class LocalPlayer extends Player {
	constructor( x, y ) {
		super( x, y );

		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = false;

		setInterval( this.updateControls.bind(this), 1000 / 60 );
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
		let moveSpeed = 0.5;
		let rotationSpeed = 4;

		if ( this.moveRight ) {
			this.rotation -= rotationSpeed;
			if ( this.rotation < 0 ) {
				this.rotation = 360 - this.rotation;
			}

			dirty = true;
		}

		if ( this.moveLeft ) {
			this.rotation += rotationSpeed;
			if ( this.rotation >= 360 ) {
				this.rotation = this.rotation % 360;
			}

			dirty = true;
		}

		if ( this.moveUp ) {
			this.x += ( Math.cos( THREE.Math.degToRad( this.rotation ) ) * moveSpeed );
			this.y += ( Math.sin( THREE.Math.degToRad( this.rotation ) ) * moveSpeed );
			dirty = true;
		}

		if ( this.moveDown ) {
			this.x -= ( Math.cos( THREE.Math.degToRad( this.rotation ) ) * moveSpeed );
			this.y -= ( Math.sin( THREE.Math.degToRad( this.rotation ) ) * moveSpeed );
			dirty = true;
		}

		if ( dirty ) {
			this.updatePosition();
		}

	}
}