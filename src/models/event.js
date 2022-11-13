class Event {
    constructor(type, doneBy, doneFor) {
        this.type = type;
        this.doneBy = doneBy;
        this.doneFor = doneFor;
    }
}

class Expense extends Event {
    constructor(type, sum, doneBy, doneFor) {
        super(type, doneBy, doneFor);
        this.sum = sum;
    }
}

class Trip extends Event {
    constructor(type, distance, doneBy, doneFor) {
        super(type, doneBy, doneFor);
        this.distance = distance;
    }
}


module.exports = { Event, Expense, Trip };