class ChallengeGenerator {
    constructor() {
    }

    generateRandomIntegerMultiplicationChallenge() {
        let min = 0;
        let random = new Random();
        let x = random.int(min, 999);
        let y = random.int(min, 10);
        let rightAnswerValue = x * y;

        let question = x + " x " + y + " = ?";

        let answers = [];
        answers.push({
            value: rightAnswerValue,
            correct: true
        });
        for (let i = 0; i < 3; i++) {
            let wrongAnswer = {
                value: rightAnswerValue + random.int(-50, 100),
                correct: false};
            answers.push(wrongAnswer);
        }

        return new Challenge(question, shuffle(answers));
    }
}

window.challengeGenerator = new ChallengeGenerator();