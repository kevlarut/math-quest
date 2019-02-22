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
        this.monsters = [];
        
        this.generateRandomMonsterOfType("division");
        this.generateRandomMonsterOfType("multiplication");

        this.tileSize = 15;
    }

    loop() {
        window.textWriter.clear();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);        
		this.context.drawImage(this.staticImages['plains-map'], 0, 0);
				        
        window.textWriter.write("Math Quest", 10, 10, "black");
        window.textWriter.write("Gold: " + window.player.gold, 235 - 8 * window.player.gold.toString().length, 10, "black");
                             
        this.context.drawImage(this.staticImages['knife-thrower-map'], this.player.x * this.tileSize - 8, this.player.y * this.tileSize - 8);
        
        this.monsters.forEach(monster => {  
            this.context.drawImage(this.staticImages[monster.type + '-monster-map'], monster.x * this.tileSize - 8, monster.y * this.tileSize - 8);
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
                if (this.player.y > 2) {                    
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
                if (this.player.x > 1) {
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
                window.game.startBattle(monster);
                collisionOccurred = true;
            }
        });
        return collisionOccurred;
    }
    
    generateRandomMonsterOfType(monsterType) {
        let random = new Random();
        let x = random.int(1, 17);
        let y = random.int(2, 12);
        let color;
        switch (monsterType) {
            case "division":
                color = "#361F4D";
                break;
            case "multiplication":
                color = "#A91E28";
                break;
            default:
                color = "red";
                break;
        }

        let monster = {
            x: x,
            y: y,
            type: monsterType,
            color: color
        }
        this.monsters.push(monster);
    }

    removeMonster(monster) {
        let index = 0;
        for (let i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].x === monster.x && this.monsters[i].y === monster.y) {
                index = i;
                break;
            }
        }
        this.monsters.splice(index, 1);
        this.generateRandomMonsterOfType(monster.type);
    }
}