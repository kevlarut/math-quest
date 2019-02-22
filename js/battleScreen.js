class BattleScreen {
    constructor(canvas, context, sprites, staticImages) {
        this.canvas = canvas;
        this.context = context;
        this.sprites = sprites;
        this.staticImages = staticImages;
        this.challenge = null;
        this.monster = null;
    }

    startBattle(monster) {
        this.playerHealth = 5;
        this.monsterHealth = 3;
        this.monster = monster;
    }

    loadChallenge(challenge) {
        this.challenge = challenge;
    }

    loop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);        
        window.textWriter.clear();
		
		this.context.drawImage(this.staticImages['clouds'], 0, 0);
		this.context.drawImage(this.staticImages['grass'], 0, 60);
		this.context.drawImage(this.staticImages['plains-background'], 0, 0);

        for (let i = 0; i < 5; i++) {
            let frame = 1;
            if (this.playerHealth > i) {
                frame = 0;
            }
            this.sprites['health'].renderFrame(this.context, frame, i * 7, 0);
        }

		this.sprites['knife-thrower'].render(this.context, 0, 16);
		this.sprites[this.monster.type + "-monster"].render(this.context, 150, 16);
                
        for (let i = 2; i >= 0; i--) {
            let frame = 1;
            if (this.monsterHealth > i) {
                frame = 0;
            }
            let rightBoundary = 272;
            this.sprites['health'].renderFrame(this.context, frame, rightBoundary - i * 7, 0);
        }

		this.context.drawImage(this.staticImages['plains-foreground'], 0, 20);
        
		for (var key in this.sprites) {
			if (this.sprites.hasOwnProperty(key)) {			
				this.sprites[key].update();
			}
		}

        this.context.fillStyle = this.monster.color;
        this.context.fillRect(0, 80, 280, 10);
        window.textWriter.write("A " + this.monster.type + " monster appears!", 0, 89, "white");

		if (this.challenge) {            
            window.textWriter.write(this.challenge.question, 0, 105, "white");

			let ordinal = 1;
			this.challenge.choices.forEach(choice => {
                window.textWriter.write(ordinal + ". " + choice.value, 0, 110 + 10 * ordinal, "white");
				ordinal++;
			});
		}
    }
    
    doCorrectAnswer() {
        this.sprites["knife-thrower"].startOneShotAnimation(1, 6);

        this.monsterHealth -= 1;
        if (this.monsterHealth <= 0) {
            window.player.reward();
            window.mapScreen.removeMonster(this.monster);
            window.game.loadChallenge(null);
        } else {
            window.game.loadChallenge(window.challengeGenerator.generateRandomChallengeOfType(this.monster.type));
        }
    }

    doWrongAnswer() {
        let random = new Random();
        if (random.int(1, 8) === 8) {
            console.log("The monster missed!");
        } else {
            this.playerHealth -= 1;
        if (this.playerHealth <= 0) {
            window.player.penalize();
            window.game.challenge = null;
        }
        }
    }

    onKeyDown(keyCode) {
        switch (keyCode) {
            case keyboard.ONE:
                if (this.challenge.choices[0].correct) {
                    this.doCorrectAnswer();
                } else {
                    this.doWrongAnswer();
                }
                break;
            case keyboard.TWO:
                if (this.challenge.choices[1].correct) {
                    this.doCorrectAnswer();
                } else {
                    this.doWrongAnswer();
                }
                break;
            case keyboard.THREE:
                if (this.challenge.choices[2].correct) {
                    this.doCorrectAnswer();
                } else {
                    this.doWrongAnswer();
                }
                break;
            case keyboard.FOUR:
                if (this.challenge.choices[3].correct) {
                    this.doCorrectAnswer();
                } else {
                    this.doWrongAnswer();
                }
                break;

        }
    }
}