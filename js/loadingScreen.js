class LoadingScreen {
	constructor() {
		this.canvas = null;
		this.context = null;
		this.sprites = null;
		this.interval = null;
	}	
	
	loop() {
		var horizontalCenter = this.canvas.width / 2;
		var verticalCenter = this.canvas.height / 2;
		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
		window.textWriter.clear();
		window.textWriter.writeCentered("Loading...", horizontalCenter, 70, "white");
	}
	
	end() {
		clearInterval(this.interval);
	}
	
	start(canvas, context, sprites) {	
		this.canvas = canvas;
		this.context = context;
		this.sprites = sprites;
	
		this.interval = setInterval(function() { window.loadingScreen.loop(); }, 200);
	}
}

window.loadingScreen = new LoadingScreen();