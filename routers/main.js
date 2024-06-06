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
});

router.post("/", (req, res, next) => {
    const temp = req.body.question.split(",");
    const input = temp.map((x) => x.trim());

    console.log(input);  // 증상 인풋을 내부 배열로 변환

    let concordance_rate = [];

    for (let i = 0; i < symptoms.length; i++) {
        for (let j = 0; j < input.length; j++) {
            for (let k = 0; k < symptoms[i].main_symptom.length; k++) {
                if (input[j] == symptoms[i].main_symptom[k]) {
                    let check = false;
                    for (let l = 0; l < concordance_rate.length; l++) {         //있으면 number++
                        if (typeof concordance_rate[l] !== undefined & concordance_rate[l].name == symptoms[i].name) {
                            concordance_rate[l].number++;
                            check = true;
                            break;
                        }
                    }
                    if (!check) {           // concordance배열에 질병 이름이 없으면 새로 추가
                        concordance_rate.push({ name: symptoms[i].name, number: 1 });
                    }
                }
            }
        }
    }
    // for문 4중 반복의 특성때문에 검색 시간이 길어질것을 염려하여
    // 추후 밑의 코드를 개선해서 삭제 예정

    // const clear_symptom = symptoms.map((x) => {
    //     const temp = x.main_symptom;
    //     return temp;
    // });
    // for (let i = 0; i < clear_symptom.length; i++) {
    //     for (let j = 0; j < result.length; j++) {
    //         if (result[j] == clear_symptom[i]) {
    //             for (let k = 0; k < concordance_rate.length; k++) {
    //                 if (symptoms[i].name == concordance_rate[k].name) {
    //                     concordance_rate[k].number++;
    //                 } else {
    //                     concordance_rate.push({ name: symptoms[i].name, number: 1 });
    //                 }
    //             }
    //         }
    //     }
    // }
    // 개선의 가능성이 보이는 알고리즘
    // 후에 개발해서 개선할 예정

    concordance_rate.sort((a, b) => {
        return b.number - a.number;
    })  //  역순 정렬

    console.log(concordance_rate);
    // console.log(max);

    // let max = [{ name: null, number: null }];
    // let sub_max = []
    // let max_number = null;
    // for (let i = 0; i < concordance_rate.length; i++) {
    //     if (typeof max[0].name === null) {
    //         max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //         sub_max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //         sub_max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //         sub_max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //         max_number = i;
    //     }
    //     if (max[0].number < concordance_rate[i].number) {
    //         max = [];
    //         max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //         max_number = i;
    //     } else if (max[0].number === concordance_rate) {
    //         max.push({ name: concordance_rate[i].name, number: concordance_rate[i].number });
    //     } else if () {

    //     }
    // }



    // console.log(max);   // 전반적으로 상수가 많이 쓰여 개선에 어려움이 있어 보임

    res.render("index", { title: "error" });
});

module.exports = router;