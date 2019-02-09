class Sprite {
	constructor(frameCount) {
		this.animationIndex = 0;
		this.frameCount = frameCount;
		this.frameWidth = 64;
		this.frameHeight = 64;
		this.height = 0;
		this.width = 0;
		this.image = null;
		
		this.row = 0;
		this.oneShotFramesRemaing = 0;
	}
	
	hasLoaded() {
		if (this.framesLoaded == this.frameImages.length) {
			return true;
		}
		else {
			return false;
		}
	}
	
	startOneShotAnimation(row, oneShotFramesRemaing) {
		this.animationIndex = 0;		
		this.row = row;
		this.oneShotFramesRemaing = oneShotFramesRemaing;
	}

	preLoadImage(source, frameWidth, frameHeight, callback) {
		var image = new Image;

		let sprite = this;
		image.onload = function() {
			sprite.height = this.height;
			sprite.width = this.width;
			sprite.frameCount = sprite.frameCount ? sprite.frameCount : Math.floor(sprite.width / sprite.frameWidth);
			callback();
		}
		
		image.src = source;
		this.image = image;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
	}

	render(context, x, y) {
		let frame = this.animationIndex;
		this.renderFrame(context, frame, x, y);
	}

	renderFrame(context, frame, x, y) {
		let sX = this.frameWidth * frame;
		let sY = this.frameHeight * this.row;
		context.drawImage(this.image, sX, sY, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
	}

	update() {
		this.animationIndex++;

		if (this.row > 0) {
			this.oneShotFramesRemaing--;
			if (this.oneShotFramesRemaing <= 0) {			
				this.animationIndex = 0;
				this.row = 0;
			}
		} else if (this.animationIndex >= this.frameCount) {
			this.animationIndex = 0;
		}
	}
}