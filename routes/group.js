var express = require('express');
var router = express.Router();

groups = {
    "AKFI4F5":
    {
        name: "Akademikernas Bilkassa",
        description: "En trevlig grupp",
        members: ["Joakim", "Frej", "Jakob"],
        id: "AKFI4F5",
        incomes: [{ description: "TestIncome", cost: "100", time: "2022-03-45" }],
        expenses: [{ description: "TestExpense", cost: "100", time: "2022-03-45" }],
        trips: [{ description: "TestTrips", cost: "100", time: "2022-03-45" }]
    }
}

/* GET group home page. */
router.get('/', function (req, res, next) {
    console.log("group root")
});

router.get('/:groupID', function (req, res, next) {
    let groupID = req.params.groupID;
    if (groups[groupID]) {
        res.render('group', { group: groups[groupID] });
    } else {
        res.status(404).render("error", { message: "404: The group does not exist.", error: { status: "Do you want to create a new group?" } });
    }
});

router.post('/:groupID/income', function (req, res, next) {
    let description = req.body.description;
    let cost = req.body.cost;
    let time = req.body.time;
    let groupID = req.params.groupID;
    groups[groupID].incomes.push({ description: description, cost: cost, time: time })
    res.send("success");
});

router.post('/:groupID/expense', function (req, res, next) {
    let description = req.body.description;
    let cost = req.body.cost;
    let time = req.body.time;
    let groupID = req.params.groupID;
    groups[groupID].expenses.push({ description: description, cost: cost, time: time })
    res.send("success");
});

router.post('/:groupID/trip', function (req, res, next) {
    let description = req.body.description;
    let cost = req.body.cost;
    let time = req.body.time;
    let groupID = req.params.groupID;
    groups[groupID].trips.push({ description: description, cost: cost, time: time })
    res.send("success");
});


module.exports = router;
