const express = require("express");
const db = require("../database/connection")

let router = express.Router();

function getJobDgByCat(req, res) {
    const catId = req.params.catid
    const query = `SELECT * FROM a_job_dgree JOIN a_main_box ON a_job_dgree.J_D_ID = a_main_box.J_D_ID WHERE a_main_box.CAT_ID = ${catId};`
    console.log("hit");
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}


router
    .get('/getjobdgbycat/:catid', getJobDgByCat)




module.exports = router;