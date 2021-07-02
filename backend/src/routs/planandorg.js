const express = require("express");
const db = require("../database/connection")

let router = express.Router();
let query = `SELECT DISTINCT a_sup_box.SUP_BOX_NAME AS emp_box_name, emp.SUP_BOX_NAME AS manager_box_name, latest.NATIONAL_ID_CARD_NO FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS emp JOIN( SELECT t1.* FROM a_job_trans t1 WHERE t1.TRANS_DATE =( SELECT MAX(t2.TRANS_DATE) FROM a_job_trans t2 ) ORDER BY "TRANS_DATE" DESC ) AS latest ON a_sup_box.SUP_BOX_ID_P = emp.SUP_BOX_ID AND latest.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_sup_box.MAIN_BOX_ID = 31`

let query2 = `SELECT t1.* FROM a_job_trans t1 WHERE t1.TRANS_DATE =( SELECT MAX(t2.TRANS_DATE) FROM a_job_trans t2 ) ORDER BY "TRANS_DATE" DESC`

function getJobDgByCat(req, res) {
    const catId = req.params.catid
    const query = `SELECT * FROM a_job_dgree JOIN a_main_box ON a_job_dgree.J_D_ID = a_main_box.J_D_ID WHERE a_main_box.CAT_ID = ${catId};`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getSupBoxNames(req, res) {
    const jdid = req.params.jdid
    const catid = req.params.catid
    const query = `SELECT * FROM emp_sup_box WHERE MAIN_BOX_ID IN (SELECT MAIN_BOX_ID FROM A_MAIN_BOX WHERE J_D_ID = ${jdid} AND CAT_ID = ${catid})`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getMaincode(req, res) {
    const jdid = req.params.jdid
    const catid = req.params.catid
    const query = `SELECT MAIN_BOX_ID FROM a_main_box WHERE J_D_ID = ${jdid} and CAT_ID = ${catid} `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }

    })
}

function getsupboxmangers(req, res) {
    const mainid = req.params.mainid
    console.log(mainid);
    let query = `SELECT a_sup_box.SUP_BOX_NAME AS emp_box_name, emp.SUP_BOX_NAME AS manager_box_name,emp.SUP_BOX_ID AS manager_box_id, a_sup_box.SUP_BOX_ID AS emp_box_id, a_sup_box.SUP_BOX_NAME AS emp_box_name , latest.NAME_ARABIC FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS emp JOIN( SELECT employee.NATIONAL_ID_CARD_NO, a_job_trans.TRANS_DATE, a_job_trans.SUP_BOX_ID, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 ) AS latest ON a_sup_box.SUP_BOX_ID_P = emp.SUP_BOX_ID AND latest.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_sup_box.MAIN_BOX_ID = ${mainid}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            console.log(details);
            res.send(details);

        }


    })
}


function getEmpApprails(req, res) {

    let query = `SELECT
    employee.NAME_ARABIC,
    employee_appraisal.APPRAISAL_DATE,
    appraisal.APPRAISAL_ARABIC,
    employee.EMPLOYEE_ID
FROM
    employee_appraisal
JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
WHERE
    employee.EMPLOYEE_ID = 701 AND employee_appraisal.APPRAISAL_DATE = 2019 AND appraisal.APPRAISAL_ARABIC = ""
ORDER BY
            employee_appraisal.APPRAISAL_DATE`

    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            console.log(details);
            res.send(details);
        }
    })
}



router
    .get('/getjobdgbycat/:catid', getJobDgByCat)

    .get(`/getsupboxnames/:jdid/:catid`, getSupBoxNames)

    .get(`/getboxandmangers/:mainid`, getsupboxmangers)

    .get(`/getmaincode/:jdid/:catid`, getMaincode)





module.exports = router;