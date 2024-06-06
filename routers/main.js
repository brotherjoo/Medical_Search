const express = require("express");
const symptoms = require("../submodels/symptoms.js");

const router = express.Router();

router.use("/", (req, res, next) => {
    //console.log(req.body);
    // res.render("index", { title: "tlqkf" });
    next();
});

router.get("/", (req, res, next) => {
    res.render("index", { title: "get /" });
})

router.post("/", (req, res, next) => {
    const temp = req.body.question.split(",");
    const result = temp.map((x) => x.trim());

    console.log(result);  // 증상 인풋을 내부 배열로 변환

    let concordance_rate = [];

    for (let i = 0; i < symptoms.length; i++) {
        for (let j = 0; j < result.length; j++) {
            for (let k = 0; k < symptoms[i].main_symptom.length; k++) {
                if (result[j] == symptoms[i].main_symptom[k]) {
                    for (let l = 0; l < concordance_rate.length; k++) {
                        if (symptoms[i].name == concordance_rate[k].name) {
                            concordance_rate[k].number++;
                        } else {
                            concordance_rate.push({ name: symptoms[i].name, number: 1 });
                        }
                    }
                }
            }
        }
    }

    console.log(concordance_rate);

    // console.log(symptom);
    // let concordance_rate = [];
    // for (let i = 0; i < symptoms.length; i++) {

    //     concordance_rate.push()
    // }



    // for (let i = 0; i < symptoms.length; i++) {
    //     for (let j = 0; i < symptom.length; i++) {
    //         if (symptom[j] == symptoms[i].main_symptom) {
    //             symptom[i].concordance_rate++;
    //         }
    //     }
    // }

    res.render("index", { title: "error" })
})

module.exports = router;