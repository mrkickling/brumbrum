'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.user, { as: 'members' })
            this.hasMany(models.event, { sourceKey: 'id', foreignKey: 'groupId', as: 'events' })
        }

        sumEvents(eventType, field) {
            let sum = 0;
            for (const i in this.events) {
                var event = this.events[i]
                if (event.type != eventType) {
                    continue;
                }
                sum += event[field];
            }
            return sum;
        }

        whoOwsWhatToWho() {
            // Per transaction:
            // What did everyone pay
            // What did everyone receive
            // -> What they owe each other
            var whatTheyOwe = {};
            for (const i in this.members) {
                var name = this.members[i].name;
                whatTheyOwe[name] = {};
                for (const j in this.members) {
                    let name2 = this.members[j].name
                    whatTheyOwe[name][name2] = 0;
                }
            }

            for (const i in this.events) {
                var event = this.events[i]
                if (event.type != "expense") {
                    continue;
                }
                var paidBy = event.done_bies;
                var paidFor = event.done_fors;
                var sum = event.sum;

                for (const i in paidFor) {
                    var receiver = paidFor[i].user.name;
                    for (const j in paidBy) {
                        var payer = paidBy[j].user.name;
                        whatTheyOwe[receiver][payer] += paidFor[i].part * paidBy[j].part * sum;
                    }
                }

            }

            for (const person in whatTheyOwe) {
                for (const owes in whatTheyOwe[person]) {
                    if (owes == person) {
                        whatTheyOwe[person][owes] = 0;
                        whatTheyOwe[owes][person] = 0;
                        continue;
                    }
                    let person_owes = whatTheyOwe[person][owes];
                    let owes_person = whatTheyOwe[owes][person];
                    console.log(person_owes);
                    console.log(owes_person);

                    let smallest_owing = Math.min(person_owes, owes_person);
                    console.log(smallest_owing);
                    whatTheyOwe[person][owes] -= smallest_owing;
                    whatTheyOwe[owes][person] -= smallest_owing;
                }
            }
            return whatTheyOwe;
        }


    }
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'group',
    });
    return Group;
}
