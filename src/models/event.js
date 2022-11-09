class Event {
    constructor(type, sum, paidBy, paidFor) {
        this.type = type;
        this.sum = sum;
        this.paidBy = paidBy;
        this.paidFor = paidFor;
    }
}

module.exports = Event;