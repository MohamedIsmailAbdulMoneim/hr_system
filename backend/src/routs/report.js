const express = require("express");
const db = require("../database/connection")

let router = express.Router();
let query = `SELECT
emp.NAME_ARABIC,
employee_appraisal.APPRAISAL_DATE,
appraisal.APPRAISAL_ARABIC
FROM
employee_appraisal
JOIN
(SELECT employee.NATIONAL_ID_CARD_NO, employee.NAME_ARABIC from employee JOIN employee_appraisal ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO) as emp
JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL WHERE employee_appraisal.APPRAISAL_DATE = 2018`
let query_2 = `SELECT * from t
WHERE id < 5
ORDER BY id DESC
LIMIT 1`


function getEmpDetails(req, res) {
    let empid = req.query.empid
    let empname = req.query.empname
    let query;

    if (!empid || empid == "undefiened") {
        query = `SELECT
        *,
        dateofj.TRANS_DATE,
        (SELECT CAT_NAME FROM a_category WHERE CAT_ID = emp_box.CAT_ID) AS cat_name,
    
        (
        SELECT
            JOB_ASSIGNMENT_FORM_ARABIC
        FROM
            job_assignment_form
        WHERE
            job_assignment_form.JOB_ASSIGNMENT_FORM = emp_box.JOB_ASSIGNMENT_FORM
    ) AS WOG
    FROM
        employee
    JOIN(
        SELECT
            a_sup_box.sup_box_id,
            a_sup_box.SUP_BOX_NAME,
            a_job_trans.NATIONAL_ID_CARD_NO,
            a_job_trans.JOB_ASSIGNMENT_FORM,
            a_main_box.CAT_ID
        FROM
            a_sup_box
        JOIN a_job_trans
        JOIN a_main_box
        ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID AND a_sup_box.MAIN_BOX_ID = a_main_box.MAIN_BOX_ID
        WHERE
            a_job_trans.INDICATOR = 2
    ) AS emp_box
    JOIN(
        SELECT
            NATIONAL_ID_CARD_NO,
            TRANS_DATE
        FROM
            a_job_trans
        WHERE
            a_job_trans.JOB_ASSIGNMENT_FORM = 1
    ) AS dateofj
    JOIN employee_appraisal ON employee.NATIONAL_ID_CARD_NO = dateofj.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = emp_box.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    WHERE
        employee.NATIONAL_ID_CARD_NO =(
        SELECT
            NATIONAL_ID_CARD_NO
        FROM
            employee
        WHERE
            NAME_ARABIC = "${empname}"
    ) AND APPRAISAL_DATE = 2020`
    } else if (!empname || empname == "undefined") {
        query = `SELECT
        *,
        dateofj.TRANS_DATE,
        (SELECT CAT_NAME FROM a_category WHERE CAT_ID = emp_box.CAT_ID) AS cat_name,
    
        (
        SELECT
            JOB_ASSIGNMENT_FORM_ARABIC
        FROM
            job_assignment_form
        WHERE
            job_assignment_form.JOB_ASSIGNMENT_FORM = emp_box.JOB_ASSIGNMENT_FORM
    ) AS WOG
    FROM
        employee
    JOIN(
        SELECT
            a_sup_box.sup_box_id,
            a_sup_box.SUP_BOX_NAME,
            a_job_trans.NATIONAL_ID_CARD_NO,
            a_job_trans.JOB_ASSIGNMENT_FORM,
            a_main_box.CAT_ID
        FROM
            a_sup_box
        JOIN a_job_trans
        JOIN a_main_box
        ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID AND a_sup_box.MAIN_BOX_ID = a_main_box.MAIN_BOX_ID
        WHERE
            a_job_trans.INDICATOR = 2
    ) AS emp_box
    JOIN(
        SELECT
            NATIONAL_ID_CARD_NO,
            TRANS_DATE
        FROM
            a_job_trans
        WHERE
            a_job_trans.JOB_ASSIGNMENT_FORM = 1
    ) AS dateofj
    JOIN employee_appraisal ON employee.NATIONAL_ID_CARD_NO = dateofj.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = emp_box.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    WHERE
        employee.NATIONAL_ID_CARD_NO =(
        SELECT
            NATIONAL_ID_CARD_NO
        FROM
            employee
        WHERE
            EMPLOYEE_ID = ${empid}
    ) AND APPRAISAL_DATE = 2020`
    }
    db.query(query, (err, details) => {
        if (err) {
        } else {
            res.send(details)
        }
    })
}

function getDeps(req, res) {
    const query = `SELECT DISTINCT SUP_BOX_NAME FROM a_job_trans`
    db.query(query, (err, details) => {
        if (err) {
        } else {
            res.send(details)
        }
    })
}

function getEmpByDeps(req, res) {
    const dep = req.params.dep
    const query = `SELECT employee.NATIONAL_ID_CARD_NO, employee.EMPLOYEE_ID, a_job_trans.MAIN_BOX_NAME, a_job_trans.SUP_BOX_NAME, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 AND a_job_trans.SUP_BOX_NAME = "${dep}" ORDER BY a_job_trans.MAIN_BOX_NAME`
    db.query(query, (err, details) => {
        if (err) {
        } else {
            res.send(details)
        }
    })
}

function getjobgovern(req, res) {
    const query = `select DISTINCT employee.JOB_GOVERNORATE, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE`
    db.query(query, (err, details) => {
        if (err) {
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
        } else {

            res.send(details)
        }
    })
}

function getEmpStationAndGovern(req, res) {
    let query;
    const govern = req.params.govern
    const station = req.params.station

    if (station === "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS() , employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
            } else {
                res.send(details)
            }
        })
    } else if (station !== "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS(), employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON  employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} AND JOB_LOCATION = "${station}" ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
            } else {

                details.length = details.length

                res.send(details)
            }
        })
    }


}


function getqn(req, res) {
    let query = `
    SELECT COUNT(DEGREE_LEVEL_ID) AS postgraduate FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 1;
    SELECT COUNT(DEGREE_LEVEL_ID) AS academicqualifications FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 2;
    SELECT COUNT(DEGREE_LEVEL_ID) AS aboveaverage FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 3;
    SELECT COUNT(DEGREE_LEVEL_ID) AS averagequalification FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 4;
    SELECT COUNT(DEGREE_LEVEL_ID) AS preparatory FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 5;
    SELECT COUNT(DEGREE_LEVEL_ID) AS primarydg FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 6;
    SELECT COUNT(DEGREE_LEVEL_ID) AS literacy  FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 7;
    SELECT COUNT(DEGREE_LEVEL_ID) AS without FROM dgree_level JOIN( SELECT education_degree.DEGREE_LEVEL, education_degree.DEGREE FROM education_degree JOIN employee_education_degree ON education_degree.DEGREE = employee_education_degree.DEGREE ) AS deglevel ON deglevel.DEGREE_LEVEL = dgree_level.DEGREE_LEVEL_ID WHERE dgree_level.DEGREE_LEVEL_ID = 8;  
    `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            console.log(details);
            res.send(details)
        }
    })

}



router
    .get('/getdeps', getDeps)
    .get('/getempbydeps/:dep', getEmpByDeps)
    .get('/getjobgovern', getjobgovern)
    .get('/getjobstation/:govern', getjobstation)
    .get('/getempstationandgovern/:govern/:station', getEmpStationAndGovern)
    .get('/getempdetails', getEmpDetails)
    .get('/getqn', getqn)




module.exports = router;