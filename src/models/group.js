class Group {
    constructor(name) {
        this.name = name;
        this.members = [];
        this.expenses = [];
        this.incomes = [];
    }

    addMember(name) {
        this.members.push(name);
    }

    getMembers() {
        return this.members
    }

    addExpense(event) {
        this.expenses.push(event);
    }

    addExpenses(events) {
        for (const id in events) {
            if (Object.hasOwnProperty.call(events, id)) {
                const event = events[id];
                this.expenses.push(event);
            }
        }
    }

    whoOwsWhatToWho() {
        // Per transaction:
        // What did everyone pay
        // What did everyone receive
        // -> What they owe each other
        var whatTheyOwe = {};
        for (const i in this.members) {
            var name = this.members[i];
            whatTheyOwe[name] = {};
            for (const j in this.members) {
                let name2 = this.members[j]
                whatTheyOwe[name][name2] = 0;
            }
        }

        for (const i in this.expenses) {
            var expense = this.expenses[i]
            var paidBy = expense.paidBy;
            var paidFor = expense.paidFor;
            var sum = expense.sum;

            // Withdraw from what they owe
            for (const i in paidFor) {
                var receiver = paidFor[i];
                if (receiver == paidBy) {
                    continue; // You don't owe yourself anything ...
                }
                // Insert into all receivers wallet
                whatTheyOwe[receiver][paidBy] += sum / paidFor.length;
            }

        }
        return whatTheyOwe;
    }
}

module.exports = Group;