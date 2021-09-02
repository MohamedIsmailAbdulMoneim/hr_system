const express = require("express");
const db = require("../database/connection")

let router = express.Router();

function insertNewEmp(req,res,next){
    const data = req.body
    const milStatusIsCompleted = data.filter(inf => inf == '(SELECT MILITARY_SERVICE_STATUS FROM military_service_status WHERE STATUS_ARABIC ="ادي الخدمه العسكرية")')
    let fData = data.filter(inf => inf != '')

    console.log(fData);
    

    let query = `INSERT INTO employee (ORGANIZATION,EMPLOYEE_ID,NAME_ARABIC,CONTRACT_TYPE,SECTOR_JOIN_DATE,
        JOB_LOCATION,JOB_AREA,JOB_GOVERNORATE,EMP_STATUS,NATIONAL_ID_CARD_NO,NATIONAL_ID_CARD_ISSUED_BY,NATIONAL_CARD_ISSUE_DATE,SOCIAL_INSURANCE_NUMBER
        ,INSURANCE_OFFICE,RESEDNTIAL_ADDRESS,PHONE_3_MOBILE,PHONE_2_HOME,PHONE_1_OFFICE,EMP_EMAIL,MARITAL_STATUS${data[0] == 'added' ? `,SYNDICATE,SYNDICATE_REGISTERATION,
        SYNDICATE_REGISTERATION_DATE` : ''},MILITARY_SERVICE_STATUS${milStatusIsCompleted.length >= 1 ? `,MIL_SERVICE_DAYS,MIL_SERVICE_MONTHS,MIL_SERVICE_YEARS` : ''},RETIRE_DATE,GENDER,RELIGION,BIRTH_DATE,
        BIRTH_PLACE,GOVERNORATE_OF_BIRTH) VALUES ${fData}`
        db.query(query, (err, details) => {
            if (err) {
                next(err);
            } else {
                res.send(details)
            }
        })
        console.log(query);

}

function getJobDgreeCodes(req, res, next) {
    const jDName = req.params.jDName
    const query = `SELECT J_D_ID FROM a_job_dgree WHERE J_D_NAME = '${jDName}'; `
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}


function getMainCodes(req, res, next) {
    const jdId = req.params.jdid
    const query = `SELECT * FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID JOIN a_job_dgree ON a_main_box.J_D_ID = a_job_dgree.J_D_ID WHERE a_job_dgree.J_D_ID = ${jdId};`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getCates(req, res, next) {
    const query = `SELECT CAT_NAME, a_category.CAT_ID FROM a_category JOIN a_category_org ON a_category.CAT_ID = a_category_org.CAT_ID WHERE ORGANIZATION = 30;`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpNameById(req, res, next) {
    const empid = req.params.empid
    // const query = `SELECT employee.NAME_ARABIC, employee.EMPLOYEE_ID ,employee.NATIONAL_ID_CARD_NO ,empmainbox.SUP_BOX_NAME, empmainbox.MAIN_BOX_ID, employee.NATIONAL_ID_CARD_NO FROM employee JOIN (SELECT a_job_trans.SUP_BOX_ID, a_sup_box.SUP_BOX_NAME , a_job_trans.NATIONAL_ID_CARD_NO, a_sup_box.MAIN_BOX_ID FROM a_job_trans JOIN a_sup_box ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_job_trans.INDICATOR = 2 ) AS empmainbox ON employee.NATIONAL_ID_CARD_NO = empmainbox.NATIONAL_ID_CARD_NO WHERE EMPLOYEE_ID = ${empid}`
    let query = `SELECT NAME_ARABIC FROM employee WHERE EMPLOYEE_ID = ${empid}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            console.log(details);
            res.send(details);
        }
    })
}

function getEmpNameByName(req, res, next) {
    let empname = req.params.empname
    let query = `SELECT NAME_ARABIC, EMPLOYEE_ID, NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC  LIKE "%${empname}%"`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}


function getQulSpeciality(req, res, next) {
    let specarabic = req.query.specarabic
    let query = `SELECT SPECIALITY_ARABIC FROM dgree_speciality WHERE SPECIALITY_ARABIC LIKE "%${specarabic}%";`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getSpecDetail(req, res, next){

    let specDetail = req.query.specDetail;
    let query = `SELECT SPECIALITY_DETAIL_ARABIC FROM dgree_speciality_detail WHERE SPECIALITY_DETAIL_ARABIC LIKE "%${specDetail}%";`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })

}

function getUneSchool(req, res, next) {
    let uneschool = req.query.uneschool
    let query = `SELECT UNIVERSITY_SCHOOL_ARABIC FROM university_school WHERE UNIVERSITY_SCHOOL_ARABIC LIKE "%${uneschool}%" `
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}




router
    .get('/getjobdgreecodes/:jDName', getJobDgreeCodes)
    .get('/getmaincodes/:jdid', getMainCodes)
    .get('/category', getCates)
    .get('/empnamebyid/:empid', getEmpNameById)
    .get('/empnamebyName/:empname', getEmpNameByName)
    .get('/specarabic', getQulSpeciality)
    .get('/specDetail', getSpecDetail)
    .get('/uneschool', getUneSchool)
    .post('/insertnewemp',insertNewEmp)

module.exports = router;