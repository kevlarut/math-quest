class MapScreen
{
    constructor(canvas, context, sprites, staticImages) {
        this.canvas = canvas;
        this.context = context;
        this.sprites = sprites;
        this.staticImages = staticImages;

        this.player = {
            x: 10,
            y: 10
        }
        this.monsters = [
            {
                x: 15,
                y: 10,
            },
            
            {
                x: 3,
                y: 7,
            }
        ];
        this.tileSize = 15;
    }

    loop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				
		this.context.textAlign = 'left';
		this.context.font = '8px "Here Lies MECC"';
		this.context.fillStyle = 'white';
		this.context.fillText('Math Quest', 0, 10);
                       
        this.context.fillText("P", this.player.x * this.tileSize, this.player.y * this.tileSize);
        this.monsters.forEach(monster => {            
            this.context.fillText("M", monster.x * this.tileSize, monster.y * this.tileSize);
        });

		for (var key in this.sprites) {
			if (this.sprites.hasOwnProperty(key)) {			
				this.sprites[key].update();
			}
		}
    }

    onKeyDown(keyCode) {
        switch (keyCode) {
            case keyboard.UP:
                if (this.player.y > 1) {                    
                    if (!this.detectMonsterCollision(this.player.x, this.player.y - 1)) {
                        this.player.y--;
                    }
                }
                break;
            case keyboard.DOWN:
                if (this.player.y < 12) {
                    if (!this.detectMonsterCollision(this.player.x, this.player.y + 1)) {
                        this.player.y++;
                    }
                }
                break;
            case keyboard.RIGHT:
                if (this.player.x < 17) {
                    if (!this.detectMonsterCollision(this.player.x + 1, this.player.y)) {
                        this.player.x++;
                    }
                }
                break;
            case keyboard.LEFT:
                if (this.player.x > 0) {
                    if (!this.detectMonsterCollision(this.player.x - 1, this.player.y)) {
                        this.player.x--;
                    }
                }
                break;
        }
    }

    detectMonsterCollision(x, y) {
        let collisionOccurred = false;
        this.monsters.forEach(monster => {
            if (monster.x === x && monster.y === y) {
                window.game.startBattle();
                collisionOccurred = true;
            }
        });
        return collisionOccurred;
	}
}