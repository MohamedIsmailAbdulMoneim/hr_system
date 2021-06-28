const express = require("express");
const db = require("../database/connection")

let router = express.Router();

function getJobDgreeCodes(req, res) {
    const jDName = req.params.jDName
    const query = `SELECT J_D_ID FROM a_job_dgree WHERE J_D_NAME = '${jDName}'; `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}


function getMainCodes(req, res) {
    const jdId = req.params.jdid
    const query = `SELECT * FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID JOIN a_job_dgree ON a_main_box.J_D_ID = a_job_dgree.J_D_ID WHERE a_job_dgree.J_D_ID = ${jdId};`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}

function getCates(req, res) {
    const query = `SELECT CAT_NAME, a_category.CAT_ID FROM a_category JOIN a_category_org ON a_category.CAT_ID = a_category_org.CAT_ID WHERE ORGANIZATION = 30;`
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
    .get('/getjobdgreecodes/:jDName', getJobDgreeCodes)

router
    .get('/getmaincodes/:jdid', getMainCodes)

router
    .get('/category', getCates)



module.exports = router;