// 👇️ named import
var Group = require('../models/group.js');
const { Event, Expense, Trip } = require('../models/event.js');

var assert = require('assert');
const exp = require('constants');

describe('Group', function () {
    describe('testGroup', function () {
        it('should add the members', function () {
            const group = new Group('A');
            group.addMember("Peter");
            group.addMember("Joakim");
            assert(group.getMembers().toString() == ['Peter', 'Joakim'].toString());
        });
        it('should add expense', function () {
            const group = new Group('A');
            group.addMember("Peter");
            group.addMember("Joakim");
            for (let index = 0; index < 10; index++) {
                const expense = new Event("expense", 100, "Peter", ["Peter", "Joakim"]);
                group.addExpense(expense);
            }
            assert(group.expenses.length == 10)
        });
        it('should calculate who ows who what', function () {
            const group = new Group('A');
            group.addMember("Peter");
            group.addMember("Joakim");
            const expense1 = new Expense("expense1", 100, "Peter", ["Peter", "Joakim"]);
            const expense2 = new Expense("expense2", 10, "Peter", ["Joakim"]);
            const expense3 = new Expense("expense3", 5, "Peter", ["Joakim", "Peter"]);
            const expense4 = new Expense("expense4", 10, "Joakim", ["Joakim", "Peter"]);
            group.addExpenses([expense1, expense2, expense3, expense4]);
            let owings = group.whoOwsWhatToWho();
            console.log(owings);
            assert(owings["Joakim"]["Peter"] == (100 / 2) + 10 + (5 / 2));
            assert(owings["Joakim"]["Joakim"] == 0);
            assert(owings["Peter"]["Joakim"] == (10 / 2));
            assert(owings["Peter"]["Peter"] == 0);
        })
    });
});
