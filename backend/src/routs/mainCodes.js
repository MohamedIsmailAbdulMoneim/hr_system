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
    console.log('hit');
    const query = `SELECT * FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID JOIN a_job_dgree ON a_main_box.J_D_ID = a_job_dgree.J_D_ID WHERE a_job_dgree.J_D_ID = ${jdId};`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}





router
    .get('/getjobdgreecodes/:jDName', getJobDgreeCodes)

router
    .get('/getmaincodes/:jdid', getMainCodes)


module.exports = router;