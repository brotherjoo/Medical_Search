const express = require("express");

const router = express.Router();

router.use("/", (req, res, next) => {
    next();
})

router.get("/", (req, res, next) => {
    res.render("emt", { title: "Medical Search" });
})

module.exports = router;