class ChallengeGenerator {
    constructor() {
    }

    generateRandomChallengeOfType(monsterType) {
        let challenge;
		switch (monsterType) {
			case "division":			
				challenge = window.challengeGenerator.generateRandomIntegerDivisionChallenge();
				break;
			default:
				challenge = window.challengeGenerator.generateRandomIntegerMultiplicationChallenge();
				break;
        }
        return challenge;
    }

    generateRandomIntegerDivisionChallenge() {
        let min = 0;
        let random = new Random();

        let divisor = random.int(1, 10);
        let quotient = random.int(min, 100);
        let dividend = quotient * divisor;
        let rightAnswerValue = quotient;

        let question = dividend + " ÷ " + divisor + " = ?";

        let answers = [];
        answers.push({
            value: rightAnswerValue,
            correct: true
        });
        for (let i = 0; i < 3; i++) {
            let value;
            do {
                value = rightAnswerValue + random.int(-10, 10);
            } while (value === rightAnswerValue);
            let wrongAnswer = {
                value: value,
                correct: false};
            answers.push(wrongAnswer);
        }

        return new Challenge(question, shuffle(answers));
    }
    
    generateRandomIntegerMultiplicationChallenge() {
        let min = 0;
        let random = new Random();
        let x = random.int(min, 999);
        let y = random.int(min, 10);
        let rightAnswerValue = x * y;

        let question = x + " × " + y + " = ?";

        let answers = [];
        answers.push({
            value: rightAnswerValue,
            correct: true
        });
        for (let i = 0; i < 3; i++) {
            let value;
            do {
                value = rightAnswerValue + random.int(-50, 100);
            } while (value === rightAnswerValue);
            let wrongAnswer = {
                value: value,
                correct: false};
            answers.push(wrongAnswer);
        }

        return new Challenge(question, shuffle(answers));
    }
}

window.challengeGenerator = new ChallengeGenerator();