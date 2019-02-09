class Sprite {
	constructor() {
		this.animationIndex = 0;
		this.frameCount = 4; // This works for the knife-thrower, but it should be changed to something else.
		this.frameWidth = 64;
		this.frameHeight = 64;
		this.height = 0;
		this.width = 0;
		this.image = null;
	}	
	
	hasLoaded() {
		if (this.framesLoaded == this.frameImages.length) {
			return true;
		}
		else {
			return false;
		}
	}
	
	preLoadImage(source, frameWidth, frameHeight, callback) {
		var image = new Image;
			
		image.onload = function() {
			this.height = this.height;
			this.width = this.width;
			this.frameCount = 4; // This is for the knife thrower.  For everyone else, it seems like it should be: this.width / this.frameWidth;
			callback();
		}
		
		image.src = source;
		this.image = image;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
	}

	render(context, x, y) {	
		let sX = this.frameWidth * this.animationIndex;
		let sY = 0; // This will show the idle animation for the knife-thrower and the multiplication monster; we can increase this by 64 to get the attack animation.
		context.drawImage(this.image, sX, sY, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
	}

	update() {
		this.animationIndex++;
		if (this.animationIndex >= this.frameCount) {
			this.animationIndex = 0;
		}
	}
}