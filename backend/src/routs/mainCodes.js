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
    console.log(jdId);
    const query = `SELECT * FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID JOIN a_job_dgree ON a_main_box.J_D_ID = a_job_dgree.J_D_ID WHERE a_job_dgree.J_D_ID = ${jdId};`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}

function getMainCodesByCate(req, res) {
    const jdId = req.params.jdid
    console.log(jdId);
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
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpNameById(req, res) {
    const empId = req.params.empid
    const query = `SELECT employee.NAME_ARABIC, empmainbox.MAIN_BOX_ID, employee.NATIONAL_ID_CARD_NO FROM employee JOIN (SELECT a_job_trans.SUP_BOX_ID, a_job_trans.NATIONAL_ID_CARD_NO, a_sup_box.MAIN_BOX_ID FROM a_job_trans JOIN a_sup_box ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_job_trans.INDICATOR = 2 ) AS empmainbox ON employee.NATIONAL_ID_CARD_NO = empmainbox.NATIONAL_ID_CARD_NO WHERE EMPLOYEE_ID = ${empId}`
    console.log("hit");
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpNameByName(req,res){
    let empname = req.params.empname
    let query = `SELECT NAME_ARABIC FROM employee WHERE NAME_ARABIC  LIKE "%${empname}%"`
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
    .get('/getmaincodes/:jdid', getMainCodes)
    .get('/category', getCates)
    .get('/empname/:empid', getEmpNameById)
    .get('/empnamebyName/:empname', getEmpNameByName)





module.exports = router;