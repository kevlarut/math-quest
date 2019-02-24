class MapScreen
{
    constructor(canvas, context, sprites, staticImages) {
        this.canvas = canvas;
        this.context = context;
        this.mapObjects = [];
        this.sprites = sprites;
        this.staticImages = staticImages;
        let random = new Random();

        this.player = new MapObject(10, 10, 8, 8, 'knife-thrower-map');
        this.mapObjects.push(this.player);
        
        this.generateRandomMonsterOfType("division");
        this.generateRandomMonsterOfType("division");
        this.generateRandomMonsterOfType("multiplication");
        this.generateRandomMonsterOfType("multiplication");

        this.tileSize = 15;
        
        for (let i = 0; i < 4; i++) {
            let x = random.int(1, 15);
            let y = random.int(2, 15);
            let tree = new MapObject(x, y, 32, 40, 'acacia-tree');
            this.mapObjects.push(tree);
        }
        this.sortMapObjects();
    }

    sortMapObjects() {
        this.mapObjects.sort(function(a, b){
            if (a.y === b.y) {
                if (a.assetKey === "knife-thrower-map") {
                    return 1;
                } else if (b.assetKey === "knife-thrower-map") {
                    return - 1;
                } else {
                    return a.hasOwnProperty("monsterType") ? 1 : -1;
                }
            } else {
                return a.y - b.y;
            }
        });
    }

    loop() {
        window.textWriter.clear();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);        
        this.context.drawImage(this.staticImages['plains-map'], 0, 0);
        
        this.mapObjects.forEach(object => {
            let x = object.x * this.tileSize - 32;
            let y = object.y * this.tileSize - 40;
            object.render(this.context, this.staticImages, this.tileSize);
        });
				        
        window.textWriter.write("Math Quest", 10, 10, "black");
        window.textWriter.write("Gold: " + window.player.gold, 235 - 8 * window.player.gold.toString().length, 10, "black");
                                    
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
                        this.sortMapObjects();
                    }
                }
                break;
            case keyboard.DOWN:
                if (this.player.y < 12) {
                    if (!this.detectMonsterCollision(this.player.x, this.player.y + 1)) {
                        this.player.y++;
                        this.sortMapObjects();
                    }
                }
                break;
            case keyboard.RIGHT:
                if (this.player.x < 17) {
                    if (!this.detectMonsterCollision(this.player.x + 1, this.player.y)) {
                        this.player.x++;
                        this.sortMapObjects();
                    }
                }
                break;
            case keyboard.LEFT:
                if (this.player.x > 1) {
                    if (!this.detectMonsterCollision(this.player.x - 1, this.player.y)) {
                        this.player.x--;
                        this.sortMapObjects();
                    }
                }
                break;
        }
    }

    detectMonsterCollision(x, y) {
        let collisionOccurred = false;
        this.mapObjects.forEach(mapObject => {
            if (mapObject.hasOwnProperty("monsterType") && mapObject.x === x && mapObject.y === y) {
                window.game.startBattle(mapObject);
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

        let monster = new MapObject(x, y, 8, 8, monsterType + '-monster-map');
        monster.color = color;
        monster.monsterType = monsterType;

        this.mapObjects.push(monster);
        this.sortMapObjects();
    }

    removeMonster(monster) {
        let index = 0;
        for (let i = 0; i < this.mapObjects.length; i++) {
            let mapObject = this.mapObjects[i];
            if (mapObject.hasOwnProperty("monsterType") && mapObject.x === monster.x && mapObject.y === monster.y) {
                index = i;
                break;
            }
        }
        this.mapObject.splice(index, 1);
        this.generateRandomMonsterOfType(monster.type);
    }
}