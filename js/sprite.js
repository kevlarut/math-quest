function sprite() {
	this.animationIndex = 0;
	this.frameCount = 0;
	this.frameWidth = 64;
	this.frameHeight = 64;
	this.height = 0;
	this.width = 0;
	this.image = null;
	
	var self = this;
	
	this.hasLoaded = function() {
		if (self.framesLoaded == self.frameImages.length) {
			return true;
		}
		else {
			return false;
		}
	}
	
	this.preLoadImage = function(source, frameWidth, frameHeight, callback) {
		var image = new Image;
			
		image.onload = function() {
			self.height = this.height;
			self.width = this.width;
			self.frameCount = 4; // This is for the knife thrower.  For everyone else, it seems like it should be: self.width / self.frameWidth;
			callback();
		}
		
		image.src = source;
		this.image = image;
		self.frameWidth = frameWidth;
		self.frameHeight = frameHeight;
	}
}

sprite.prototype.render = function(context, x, y) {	
	let sX = this.frameWidth * this.animationIndex;
	let sY = 64; // This is so it shows the beathing animation for the knife thrower instead of the throwing animation.
	context.drawImage(this.image, sX, sY, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
}

sprite.prototype.update = function() {
	this.animationIndex++;
	if (this.animationIndex >= this.frameCount) {
		this.animationIndex = 0;
	}
}