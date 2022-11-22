var express = require('express');
const { where, NOW } = require('sequelize');
var router = express.Router();
const db = require("../models");

/* GET group home page. What should be there? */
router.get('/', function (req, res, next) {
    console.log("group root")
    res.status(404).render('group')
});

/* Create new group form */
router.get('/create', function (req, res, next) {
    res.render('create_group', { title: "Create new group" });
});

/* Create new group endpoint */
router.post('/create', function (req, res, next) {
    let title = req.body.title;
    let description = req.body.description;
    let members = req.body.members.split(",");
    let members_list = members.map(function (member) { return { name: member.trim() }; })
    let code = Math.random().toString(36).substr(2, 10).toUpperCase();

    db.group.create({
        title: title,
        description: description,
        code: code,
        members: members_list
    }, {
        include: [{
            association: "members",
        }]
    })
        .then(group => {
            res.redirect("/group/" + group.dataValues.code)
        })
});

/* Renders the group view */
router.get('/:groupID', function (req, res, next) {
    let groupID = req.params.groupID;
    g = db.group.findOne({
        where: {
            code: groupID
        },
        include: ["members",
            {
                model: db.event,
                as: "events",
                include: [
                    { model: db.done_for, include: { model: db.user, as: "user" } },
                    { model: db.done_by, include: { model: db.user, as: "user" } }
                ]
            }]
    }).then(group => {
        let incomes, expenses, trips = [];
        if (group.events != null) {
            incomes = group.events.filter((event) => event.dataValues.type == "income")
            expenses = group.events.filter((event) => event.dataValues.type == "expense")
            trips = group.events.filter((event) => event.dataValues.type == "trip")
        }
        res.render('group', {
            title: "Group",
            group: group.dataValues,
            members: group.members,
            incomes: incomes,
            expenses: expenses,
            trips: trips,
        });
    }).catch(error => {
        res.status(404).render("error", { title: "error", message: "404: The group does not exist.", error: { status: error } });
    })
});

router.get('/:groupID/members', function (req, res, next) {
    let groupID = req.params.groupID;
    g = db.group.findOne({
        where: {
            code: groupID
        },
        include: ["members"]
    }).then(group => {
        res.status(200).send(group.members);
    }).catch(error => {
        res.status(404).render("error", { title: "error", message: "404: The group does not exist.", error: { status: error } });
    })
});

/* Endpoint to add an event to a group */
router.post('/:groupID/:eventType', function (req, res, next) {
    let groupID = req.params.groupID;
    let eventType = req.params.eventType;

    if (["income", "expense", "trip"].indexOf(eventType) < 0) {
        return res.status(400).send({ error: "Event type can not be " + eventType });
    }
    g = db.group.findOne({
        where: {
            code: groupID
        },
        include: 'members'
    }).then(group => {
        let description = req.body.description;
        let sum = req.body.sum;
        let distance = req.body.distance;
        let time = req.body.time;
        let doneFor = (req.body.done_for == undefined) ? [] : req.body.done_for;
        doneFor = (!(doneFor instanceof Array)) ? [doneFor] : doneFor;
        let doneBy = (req.body.done_by == undefined) ? [] : req.body.done_by;
        doneBy = (!(doneBy instanceof Array)) ? [doneBy] : doneBy;

        if (!description || (!sum && !distance) || !time || (!doneBy && !doneFor)) {
            console.log(description + "," + sum + "," + distance + "," + time + "," + doneFor + "," + doneBy)
            return res.status(400).send({ error: "All fields must be set" });
        } else {
            doneFor = doneFor.map(function (id) { return { userId: parseInt(id), part: (1 / doneFor.length) }; })
            doneBy = doneBy.map(function (id) { return { userId: parseInt(id), part: (1 / doneBy.length) }; })
            console.log(doneBy);
            console.log(doneFor);
            group.createEvent({
                type: eventType,
                description: description,
                sum: sum,
                distance: distance,
                date: time,
                done_fors: doneFor,
                done_bies: doneBy
            }, {
                include: [db.done_by, db.done_for]
            }).then(event => {
                event.done_fors
            })
            return res.send("success");
        }
    }).catch(error => {
        console.log(error)
        return res.status(400).send({ "error": JSON.stringify(error) });
    })


});

module.exports = router;
