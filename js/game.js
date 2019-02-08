class Game {
	constructor() {
		this.canvas = document.getElementById('game');
		this.context = this.canvas.getContext('2d');
		this.frameRate = 3;
		this.sprites = {};
		this.staticImages = {};
		this.self = this;
		this.gameLoopInterval = null;
		this.challenge = {
			question: "995 x 9 = ?",
			choices: shuffle([
				{ value: "8955", correct: true},
				{ value: "9959", correct: false},
				{ value: "81815", correct: false},
				{ value: "8945", correct: false}
			])
		};
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
				var currentSprite = new Sprite();
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
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				
		this.context.textAlign = 'left';
		this.context.font = '8px "Here Lies MECC"';
		this.context.fillStyle = 'white';
		this.context.fillText('Math Quest', 0, 10);
		
		game.context.drawImage(game.staticImages['plains-background'], 0, 20);

		game.sprites['knife-thrower'].render(game.context, 0, 20);
		
		for (var key in game.sprites) {
			if (game.sprites.hasOwnProperty(key)) {			
				game.sprites[key].update();
			}
		}

		if (game.challenge) {
			game.context.textAlign = 'left';
			game.context.font = '8px "Here Lies MECC"';
			game.context.fillStyle = 'white';
			game.context.fillText(game.challenge.question, 0, 105);
			let ordinal = 1;
			game.challenge.choices.forEach(choice => {
				game.context.fillText(ordinal + ". " + choice.value, 0, 110 + 10 * ordinal);
				ordinal++;
			});
		}
	}

	onMouseDown(event) {
        event.preventDefault();
		var x = event.pageX - this.canvas.offsetLeft;
		var y = event.pageY - this.canvas.offsetTop;
		this.handleTouchInput(x, y);
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
	}

	startGame() {	
		window.document.onkeydown = function(event) {
			// We can use this to accept global keyboard input, like pausing on ENTER or something.
		}
		this.touchHandler = null;
		
		this.gameLoop();
		let gameLoopInterval = setInterval(function() { window.game.gameLoop(); }, 1000 / this.frameRate);	
	}
}

window.onload = function() {
	let game = new Game();
	window.game = game;
	game.init();
};