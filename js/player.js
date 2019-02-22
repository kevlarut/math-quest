class Player {
    constructor() {
        this.gold = 0;
    }

    penalize() {        
        let random = new Random();
        let gold = random.int(5, 25);
        if (gold > this.gold) {
            gold = this.gold;
        }
        this.gold -= gold;
        window.game.setStatusMessage("You lost " + gold + " gold pieces.");
    }

    reward() {        
        let random = new Random();
        let gold = random.int(5, 25);
        this.gold += gold;
        window.game.setStatusMessage("You earned " + gold + " gold pieces.");
    }
}

window.player = new Player();