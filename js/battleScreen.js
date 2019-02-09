class BattleScreen {
    constructor(canvas, context, sprites, staticImages) {
        this.canvas = canvas;
        this.context = context;
        this.sprites = sprites;
        this.staticImages = staticImages;
        this.challenge = null;
        this.monsterType = "multiplication";
    }

    startBattle(monsterType) {
        this.playerHealth = 5;
        this.monsterHealth = 3;
        this.monsterType = monsterType;
    }

    loadChallenge(challenge) {
        this.challenge = challenge;
    }

    loop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				
		this.context.textAlign = 'left';
		this.context.font = '8px "Here Lies MECC"';
		this.context.fillStyle = 'white';
		this.context.fillText('Math Quest', 0, 10);
		
		this.context.drawImage(this.staticImages['plains-background'], 0, 20);

		this.sprites['knife-thrower'].render(this.context, 0, 20);
		this.sprites[this.monsterType + "-monster"].render(this.context, 150, 20);
		
		for (var key in this.sprites) {
			if (this.sprites.hasOwnProperty(key)) {			
				this.sprites[key].update();
			}
		}

		if (this.challenge) {
			this.context.textAlign = 'left';
			this.context.font = '8px "Here Lies MECC"';
			this.context.fillStyle = 'white';
			this.context.fillText(this.challenge.question, 0, 105);
			let ordinal = 1;
			this.challenge.choices.forEach(choice => {
				this.context.fillText(ordinal + ". " + choice.value, 0, 110 + 10 * ordinal);
				ordinal++;
			});
		}
    }
    
    doCorrectAnswer() {
        console.log("Correct answer!");

        this.monsterHealth -= 1;
        console.log("Monster health is now " + this.monsterHealth);
        if (this.monsterHealth <= 0) {
            console.log("You get a reward.");
            window.game.loadChallenge(null);
        } else {
            window.game.loadChallenge(window.challengeGenerator.generateRandomChallengeOfType(this.monsterType));
        }
    }

    doWrongAnswer() {
        console.log("Wrong answer!");
        let random = new Random();
        if (random.int(1, 8) === 8) {
            console.log("The monster missed!");
        } else {
            this.playerHealth -= 1;
            console.log("Player health is now " + this.playerHealth);
        if (this.playerHealth <= 0) {
            console.log("You get a penalty.");
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