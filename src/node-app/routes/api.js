var express = require('express');
const { where, NOW } = require('sequelize');
var router = express.Router();
const db = require("../models");

/* Group API endpoints */
/* GET api root page. What should be there? */
router.get('/', function (req, res, next) {
    console.log("api root")
    res.status(400).send({ error: "nothing here" })
});

router.get('/group', function (req, res, next) {
    console.log("api group root")
    res.status(400).send({ error: "nothing here" })
});

/* Endpoint to get a group */
router.get('/group/:groupID', function (req, res, next) {
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
        res.status(200).send(group);
    }).catch(error => {
        res.status(400).send({ error: { status: error } });
    })
});

/* Endpoint to add an event to a group */
router.post('/events/:groupCode', function (req, res, next) {
    let groupCode = req.params.groupCode;
    let eventType = req.body.type;
    console.log(req.body)
    if (["income", "expense", "trip"].indexOf(eventType) < 0) {
        return res.status(400).send({ error: "Event type can not be " + eventType });
    }
    g = db.group.findOne({
        where: {
            code: groupCode
        },
        include: 'members'
    }).then(group => {
        let description = req.body.description;
        let sum = req.body.sum;
        let distance = req.body.distance;
        let time = req.body.time;
        let doneFor = (req.body.donefor == undefined || req.body.donefor.length == 0) ? [] : req.body.donefor;
        doneFor = (!(doneFor instanceof Array)) ? [doneFor] : doneFor;
        let doneBy = (req.body.doneby == undefined || req.body.doneby.length == 0) ? [] : req.body.doneby;
        doneBy = (!(doneBy instanceof Array)) ? [doneBy] : doneBy;
        doneFor = doneFor.map(function (user) { return { userId: parseInt(user.id), part: (1 / doneFor.length) }; })
        doneBy = doneBy.map(function (user) { return { userId: parseInt(user.id), part: (1 / doneBy.length) }; })
        console.log(doneFor)
        console.log(doneBy)
        if (!description || (!sum && !distance) || !time || (!doneBy && !doneFor)) {
            console.log(description + "," + sum + "," + distance + "," + time + "," + doneFor + "," + doneBy)
            return res.status(400).send({ error: "All fields must be set" });
        } else {
            console.log(doneFor)
            console.log(doneBy)
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
                return res.send(event);
            })
        }
    }).catch(error => {
        console.log(error)
        return res.status(400).send({ "error": JSON.stringify(error) });
    })
});

/* Endpoint to delete an event */
router.delete('/events/:eventID/:groupCode', function (req, res, next) {
    console.log("truing to delete")
    let eventID = req.params.eventID;
    let groupCode = req.params.groupCode;

    g = db.event.findOne({
        where: {
            id: eventID,
        },
        include: ["group"]
    }
    ).then(event => {
        console.log(event.group.code);
        if (event.group.code == groupCode) {
            console.log("code matches")
            event.destroy().then(event => {
                res.status(200).send(event);
            })
        }
    }).catch(error => {
        res.status(400).send({ error: { status: error } });
    })
});

/* Endpoint to edit an event */
router.put('/events/:eventID/:groupCode', function (req, res, next) {
    console.log("HELLO THERE!")
    let eventID = req.params.eventID;
    let groupCode = req.params.groupCode;
    let type = req.body.type;
    let description = req.body.description;
    let sum = req.body.sum;
    let distance = req.body.distance;
    let time = req.body.time;
    let doneFor = (req.body.donefor == undefined || req.body.donefor.length == 0) ? [] : req.body.donefor;
    doneFor = (!(doneFor instanceof Array)) ? [doneFor] : doneFor;
    let doneBy = (req.body.doneby == undefined || req.body.doneby.length == 0) ? [] : req.body.doneby;
    doneBy = (!(doneBy instanceof Array)) ? [doneBy] : doneBy;
    console.log(doneFor)
    console.log(doneBy)
    doneFor = doneFor.map(function (user) { return { userId: parseInt(user.id), part: (1 / doneFor.length) }; })
    doneBy = doneBy.map(function (user) { return { userId: parseInt(user.id), part: (1 / doneBy.length) }; })
    console.log(doneFor);
    console.log(doneBy);
    console.log(eventID);

    g = db.event.findOne({
        where: {
            id: eventID,
        },
        include: ["group", db.done_by, db.done_for]
    }
    ).then(event => {
        if (event.group.code == groupCode) {
            console.log("code matches")
            event.update({
                type: type,
                description: description,
                sum: sum,
                distance: distance,
                date: time,
                done_fors: doneFor,
                done_bies: doneBy
            }, { include: [db.done_by, db.done_for] }).then(event => {
                console.log(event);
                return res.send(event);
            })
        } else {
            return res.status(403).send({ error: "forbidden!!!" })
        }
    }).catch(error => {
        res.status(400).send({ error: { status: error } });
    })
});

module.exports = router;
