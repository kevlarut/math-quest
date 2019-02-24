class MapObject {
    constructor(x, y, offsetX, offsetY, assetKey) {
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.assetKey = assetKey;
        
        let random = new Random();
        this.id = random.int(1, 5000);
    }

    render(context, staticImages, tileSize) {
        let x = this.x * tileSize - this.offsetX;
        let y = this.y * tileSize - this.offsetY;
        context.drawImage(staticImages[this.assetKey], x, y);        
    }
}