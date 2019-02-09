class Random {
    constructor() {        
    }

    int(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}