class Game {
	constructor() {
		this.canvas = document.getElementById('game');
		this.context = this.canvas.getContext('2d');
		this.frameRate = 3;
		this.sprites = {};
		this.staticImages = {};
		this.self = this;
		this.gameLoopInterval = null;
		this.challenge = null;
	}

	loadChallenge(challenge) {
		this.challenge = challenge;
		window.battleScreen.loadChallenge(challenge);
	}

	preLoadImages() {	
		var countOfImagesToLoad = Object.keys(spriteAssets).length + Object.keys(staticImageAssets).length;
		var loaded = 0;
	
		var callback = function() {			
			if (++loaded >= countOfImagesToLoad) {
				window.loadingScreen.end();
				window.game.startGame();
			}
		}
		
		for (var key in spriteAssets) {
			if (spriteAssets.hasOwnProperty(key)) {
				var spriteAsset = spriteAssets[key];
				var currentSprite = new Sprite(spriteAsset.frameCount);
				currentSprite.preLoadImage(spriteAsset.file, spriteAsset.frameWidth, spriteAsset.frameHeight, callback);
				this.sprites[key] = currentSprite;
			}
		}

		for (var key in staticImageAssets) {
			if (staticImageAssets.hasOwnProperty(key)) {
				var asset = staticImageAssets[key];
				var image = new Image();
				image.onload = function() {
					callback();
				}				
				image.src = asset;
				this.staticImages[key] = image;
			}
		}
	}

	gameLoop() {
		if (this.challenge)	{
			window.battleScreen.loop();
		} else {
			window.mapScreen.loop();
		}

		this.displayStatusMessage();
	}

	onMouseDown(event) {
		//TODO
        /*event.preventDefault();
		var x = event.pageX - this.canvas.offsetLeft;
		var y = event.pageY - this.canvas.offsetTop;
		this.handleTouchInput(x, y);*/
	}
	
	onTouchStart(event) {
        event.preventDefault();
		var x = event.targetTouches[0].pageX - this.canvas.offsetLeft;
		var y = event.targetTouches[0].pageY - this.canvas.offsetTop;
		this.handleTouchInput(x, y);
	}
	
	handleTouchInput(x, y) {
		console.log('Touch input happened at (' + x + ',' + y + ')');		
	}
	
	init() {
		window.loadingScreen.start(this.canvas, this.context, this.sprites);	
		this.preLoadImages();
		
		this.canvas.addEventListener("touchstart", this.onTouchStart, false);
        this.canvas.addEventListener("mousedown", this.onMouseDown, false);
		document.addEventListener("mousedown", this.onMouseDown, false);
		
		window.mapScreen = new MapScreen(this.canvas, this.context, this.sprites, this.staticImages);

		window.battleScreen = new BattleScreen(this.canvas, this.context, this.sprites, this.staticImages);
	}

	startBattle(monster) {
		let challenge = window.challengeGenerator.generateRandomChallengeOfType(monster.type);
        window.game.loadChallenge(challenge);
		window.battleScreen.startBattle(monster);
	}

	startGame() {	
		window.document.onkeydown = function(event) {
			event.preventDefault();
			if (window.game.challenge) {
				window.battleScreen.onKeyDown(event.keyCode);
			} else {
				window.mapScreen.onKeyDown(event.keyCode);
			}
		}
		this.touchHandler = null;
		
		this.gameLoop();
		let gameLoopInterval = setInterval(function() { window.game.gameLoop(); }, 1000 / this.frameRate);	
	}

	displayStatusMessage() {
		if (this.statusMessage) {
			if (Date.now() > this.statusMessageEndTime) {
				this.statusMessage = null;
				this.statusMessageEndTime = null;
			}
			else {				
				let boxWidth = this.statusMessage.length * 8 + 10;

				let pixelHorizontalCenter = 140;
				this.context.fillStyle = "black";
				this.context.fillRect(pixelHorizontalCenter - boxWidth / 2, 0, boxWidth, 15);

				var textHorizontalCenter = this.canvas.width / 2;
				window.textWriter.writeCentered(this.statusMessage, textHorizontalCenter, 10, "white");
			}
		}
	}

	setStatusMessage(message) {
		this.statusMessage = message;
		this.statusMessageEndTime = Date.now() + 3000;
	}
}

window.onload = function() {
	let game = new Game();
	window.game = game;
	game.init();
};