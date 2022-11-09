// 👇️ named import
var Group = require('../models/group.js');
var Event = require('../models/event.js');

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
            for (let index = 0; index < 10; index++) {
                const expense = new Event("expense", 100, "Peter", ["Peter", "Joakim"]);
                group.addExpense(expense);
            }
            let owings = group.whoOwsWhatToWho();
            assert(owings["Joakim"]["Peter"] == 500);
            assert(owings["Joakim"]["Joakim"] == 0);
            assert(owings["Peter"]["Joakim"] == 0);
            assert(owings["Peter"]["Peter"] == 0);
        })
    });
});
