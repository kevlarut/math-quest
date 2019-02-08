var game = new function() {

	this.touchHandler = null;

	var canvas = null;
	var context = null;
	var frameRate = 3;
	var sprites = {};
	var staticImages = {};
	//var background = {};
	var self = this;
	var gameLoopInterval = null;
	var challenge = {
		question: "995 x 9 = ?",
		choices: shuffle([
			{ value: "8955", correct: true},
			{ value: "9959", correct: false},
			{ value: "81815", correct: false},
			{ value: "8945", correct: false}
		])
	};

	var preLoadImages = function() {	
		var countOfImagesToLoad = Object.keys(spriteAssets).length + Object.keys(staticImageAssets).length;
		var loaded = 0;
	
		var callback = function() {			
			if (++loaded >= countOfImagesToLoad) {
				loadingScreen.end();
				startGame();
			}
		}
		
		for (var key in spriteAssets) {
			if (spriteAssets.hasOwnProperty(key)) {
				var spriteAsset = spriteAssets[key];
				var currentSprite = new sprite();
				currentSprite.preLoadImage(spriteAsset.file, spriteAsset.frameWidth, spriteAsset.frameHeight, callback);
				sprites[key] = currentSprite;
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
				staticImages[key] = image;
			}
		}
	}
				
	this.gameLoop = function() {			
		context.clearRect(0, 0, canvas.width, canvas.height);
				
		context.textAlign = 'left';
		context.font = '8px "Here Lies MECC"';
		context.fillStyle = 'white';
		context.fillText('Math Quest', 0, 10);
		
		context.drawImage(staticImages['plains-background'], 0, 20);

		sprites['knife-thrower'].render(context, 0, 20);
		
		for (var key in sprites) {
			if (sprites.hasOwnProperty(key)) {			
				sprites[key].update();
			}
		}

		if (challenge) {
			context.textAlign = 'left';
			context.font = '8px "Here Lies MECC"';
			context.fillStyle = 'white';
			context.fillText(challenge.question, 0, 105);
			let ordinal = 1;
			challenge.choices.forEach(choice => {
				context.fillText(ordinal + ". " + choice.value, 0, 110 + 10 * ordinal);
				ordinal++;
			});
		}

		//background.update();
	}

	var onMouseDown = function(event) {
        event.preventDefault();
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		handleTouchInput(x, y);
	}
	
	var onTouchStart = function(event) {
        event.preventDefault();
		var x = event.targetTouches[0].pageX - canvas.offsetLeft;
		var y = event.targetTouches[0].pageY - canvas.offsetTop;
		handleTouchInput(x, y);
	}
	
	var handleTouchInput = function(x, y) {
		console.log('(' + x + ',' + y + ')');
		if (self.touchHandler != null) {
			self.touchHandler(x, y);
		}
	}
	
	this.init = function() {
		canvas = document.getElementById('game');		
		context = canvas.getContext('2d');
		loadingScreen.start(canvas, context, sprites);	
		preLoadImages();
		
		canvas.addEventListener("touchstart", onTouchStart, false);
        canvas.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mousedown", onMouseDown, false);
	}

	var startGame = function() {	
		window.document.onkeydown = function(event) {
			// We can use this to accept global keyboard input, like pausing on ENTER or something.
		}
		this.touchHandler = null;
		
		self.gameLoop();
		gameLoopInterval = setInterval(self.gameLoop, 1000 / frameRate);	
	}
}

window.onload = function() {
	game.init();
};