const express = require("express");
const db = require("../database/connection")

let router = express.Router();

let query_2 = `SELECT * from t
WHERE id < 5
ORDER BY id DESC
LIMIT 1`
function getDeps(req, res) {
    const query = `SELECT DISTINCT SUP_BOX_NAME FROM a_job_trans`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}

function getEmpByDeps(req, res) {
    const dep = req.params.dep
    const query = `SELECT employee.NATIONAL_ID_CARD_NO, employee.EMPLOYEE_ID, a_job_trans.MAIN_BOX_NAME, a_job_trans.SUP_BOX_NAME, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 AND a_job_trans.SUP_BOX_NAME = "${dep}" ORDER BY a_job_trans.MAIN_BOX_NAME`
    db.query(query, (err, details) => {
        console.log('hit');
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}

function getjobgovern(req, res) {
    const query = `select DISTINCT employee.JOB_GOVERNORATE, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details)
        }
    })
}

function getjobstation(req, res) {
    const govern = req.params.govern
    const query = `SELECT DISTINCT JOB_LOCATION, JOB_GOVERNORATE from employee where JOB_GOVERNORATE = ${govern} `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {

            res.send(details)
        }
    })
}

function getEmpStationAndGovern(req, res) {
    let query;
    const govern = req.params.govern
    const station = req.params.station
    console.log(station, govern);

    if (station === "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS() , employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details)
            }
        })
    } else if (station !== "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS(), employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON  employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} AND JOB_LOCATION = "${station}" ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                console.log(err);
            } else {

                details.length = details.length
                console.log(details.length);

                res.send(details)
            }
        })
    }


}



router
    .get('/getdeps', getDeps)
    .get('/getempbydeps/:dep', getEmpByDeps)
    .get('/getjobgovern', getjobgovern)
    .get('/getjobstation/:govern', getjobstation)
    .get('/getempstationandgovern/:govern/:station', getEmpStationAndGovern)



module.exports = router;