'use strict';
const {
    Model
} = require('sequelize');
const { EventEmitter } = require('stream');
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

        sortByDate(events) {
            return events.sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        }

        whoOwsWhatToWho() {
            // Per transaction:
            // What did everyone pay
            // What did everyone receive
            // -> What they owe each other
            var whatTheyOwe = {};
            let total_travel_since_last_fillup = 0;
            let travel_since_last_fillup = {};

            // Generate N x N matrix (who ows who what)
            for (const i in this.members) {
                var name = this.members[i].name;
                whatTheyOwe[name] = {};
                travel_since_last_fillup[name] = 0;
                for (const j in this.members) {
                    let name2 = this.members[j].name
                    whatTheyOwe[name][name2] = 0;
                }
            }

            // Important to sort by date
            let events = this.sortByDate(this.events);

            for (const i in events) {
                var event = events[i];
                var doneBy = event.done_bies;
                var doneFor = event.done_fors;
                var sum = event.sum;
                var distance = event.distance;

                // Add cost to each member that used the car according to their travel since last fillup
                if (event.type == "fillupgas") {
                    console.log("Filling up gas after travelled " + total_travel_since_last_fillup + " km");
                    for (const i in this.members) {
                        let receiver = this.members[i].name;
                        console.log(receiver + " travelled " + travel_since_last_fillup[receiver]);
                        for (const j in doneBy) {
                            var payer = doneBy[j].user.name;
                            if (total_travel_since_last_fillup > 0) {
                                let part = (travel_since_last_fillup[receiver] / total_travel_since_last_fillup);
                                whatTheyOwe[receiver][payer] += part * sum;
                                travel_since_last_fillup[receiver] = 0;
                            }
                        }
                    }
                    total_travel_since_last_fillup = 0; // Gas just filled up ;)
                }


                // Add expenses and trip length to user standings
                for (const i in doneFor) {
                    var receiver = doneFor[i].user.name;
                    if (event.type == "trip") {
                        travel_since_last_fillup[receiver] += doneFor[i].part * distance;
                        total_travel_since_last_fillup += doneFor[i].part * distance;
                    }
                    for (const j in doneBy) {
                        var payer = doneBy[j].user.name;
                        if (event.type == "expense") {
                            whatTheyOwe[receiver][payer] += doneFor[i].part * doneBy[j].part * sum;
                        }
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

                    let smallest_owing = Math.min(person_owes, owes_person);
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
