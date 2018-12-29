class Comm {
	constructor() {
		this.connected = false;
		this.clientId = "cargame-" + Math.ceil( Math.random() * 100 );
		this.messageCallback = null;
		this.lastLocalMessage = new Date();

		let lastWill = new Paho.MQTT.Message(JSON.stringify({
				client: this.clientId,
				type: "disconnect"
			}));
		lastWill.destinationName = "gameplay";

		this.client = new Paho.MQTT.Client(
			"m21.cloudmqtt.com",
			30339,
			this.clientId
		);

		this.client.onConnectionLost = this.onConnectionLost.bind(this);
		this.client.onMessageArrived = this.onMessageArrived.bind(this);

		this.client.connect({
			onSuccess: this.onConnect.bind(this),
			onFailure: this.onFailure.bind(this),
			userName: "mkvwffak",
			password: "YaovIPLubaKG",
			useSSL: true,
			willMessage: lastWill
		});
	}

	onConnectionLost( responseObject ) {
		console.warn( responseObj );
	}

	onMessageArrived( message ) {
		//console.log( message );
		let m = JSON.parse(message.payloadString);

		if ( m.client !== this.clientId ) {
			if ( typeof this.messageCallback == "function" ) {
				this.messageCallback(m);
			}
		}
	}

	onFailure( repsonseObject ) {
		console.warn( responseObject );
	}

	onConnect( responseObject ) {
		this.connected = true;
		this.client.subscribe( "gameplay" );
	}

	sendPlayerUpdate( player ) {
		if ( this.connected && ((new Date()) - this.lastLocalMessage > 200) ) {
			let obj = {
				client: this.clientId,
				type: "data",
				x: player.x,
				y: player.y,
				rotation: player.rotation,
				moveSpeed: player.moveSpeed,
				rotationSpeed: player.rotationSpeed,
				moveInterval: player.moveInterval,
				moveUp: player.moveUp,
				moveDown: player.moveDown,
				moveLeft: player.moveLeft,
				moveRight: player.moveRight
			}

			let message = new Paho.MQTT.Message(JSON.stringify(obj));
			message.destinationName = "gameplay";
			this.client.send(message);

			this.lastLocalMessage = new Date();
		}
	}
}