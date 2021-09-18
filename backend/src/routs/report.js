const express = require("express");
const db = require("../database/connection")

let router = express.Router();

function getEmpDetails(req, res, next) {
    let empid = req.query.empid
    let empname = req.query.empname
    let query;

    query = `SELECT
    employee.EMPLOYEE_ID,
    employee.NAME_ARABIC,
    employee.SECTOR_JOIN_DATE,
    dateofj.TRANS_DATE,
    emp_box.SUP_BOX_NAME,
    (
    SELECT
        JOB_ASSIGNMENT_FORM_ARABIC
    FROM
        job_assignment_form
    WHERE
        job_assignment_form.JOB_ASSIGNMENT_FORM = emp_box.JOB_ASSIGNMENT_FORM
) AS WOG,
(
    SELECT
        CAT_NAME
    FROM
        a_category
    WHERE
        CAT_ID = emp_box.CAT_ID
) AS cat_name,
JOB_GOVERNORATE_AR.GOVERNORATE_ARABIC AS jobGov,
employee.JOB_LOCATION,
employee.JOB_AREA,
emp_status.EMP_STATUS_NAME,
empApp.APPRAISAL_ARABIC,
employee.NATIONAL_ID_CARD_NO,
employee.NATIONAL_ID_CARD_ISSUED_BY,
ADDRESS_GOVERNORATE_AR.GOVERNORATE_ARABIC AS addressgov,
employee.SOCIAL_INSURANCE_NUMBER,
employee.INSURANCE_OFFICE,
employee.ADDRESS,
employee.PHONE_2_HOME,
employee.PHONE_1_OFFICE,
employee.PHONE_3_MOBILE,
GOVERNORATE_OF_BIRTH_AR.GOVERNORATE_ARABIC AS birthGov
FROM
    employee
JOIN emp_status JOIN(
    SELECT
        appraisal.APPRAISAL_ARABIC,
        employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
        appraisal
    JOIN employee_appraisal ON appraisal.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
           employee_appraisal.APPRAISAL_DATE = YEAR(CURRENT_DATE)

) AS empApp
JOIN(
    SELECT
        a_sup_box.sup_box_id,
        a_sup_box.SUP_BOX_NAME,
        a_job_trans.NATIONAL_ID_CARD_NO,
        a_job_trans.JOB_ASSIGNMENT_FORM,
        a_main_box.CAT_ID
    FROM
        a_sup_box
    JOIN a_job_trans JOIN a_main_box ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID AND a_sup_box.MAIN_BOX_ID = a_main_box.MAIN_BOX_ID
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
JOIN(
    SELECT
        GOVERNORATE_ARABIC,
        GOVERNORATE
    FROM
        governorate
) AS ADDRESS_GOVERNORATE_AR
JOIN(
    SELECT
        GOVERNORATE_ARABIC,
        GOVERNORATE
    FROM
        governorate
) AS GOVERNORATE_OF_BIRTH_AR
JOIN(
    SELECT
        GOVERNORATE_ARABIC,
        GOVERNORATE
    FROM
        governorate
) AS JOB_GOVERNORATE_AR
ON
    employee.EMP_STATUS = emp_status.EMP_STATUS AND employee.ADDRESS_GOVERNORATE = ADDRESS_GOVERNORATE_AR.GOVERNORATE AND employee.GOVERNORATE_OF_BIRTH = GOVERNORATE_OF_BIRTH_AR.GOVERNORATE AND employee.JOB_GOVERNORATE = JOB_GOVERNORATE_AR.GOVERNORATE AND employee.NATIONAL_ID_CARD_NO = dateofj.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = emp_box.NATIONAL_ID_CARD_NO AND employee.NATIONAL_ID_CARD_NO = empApp.NATIONAL_ID_CARD_NO
WHERE
    employee.NATIONAL_ID_CARD_NO 🙁
    SELECT
        NATIONAL_ID_CARD_NO
    FROM
        employee
    WHERE
        EMPLOYEE_ID = 397 AND employee.is_shown = "true"
)`

    if (!empid || empid == "undefiened") {
        query = `
        SELECT
        e.EMPLOYEE_ID,
        e.NAME_ARABIC,
        e.SECTOR_JOIN_DATE,
        dateofj.TRANS_DATE,
        emp_box.SUP_BOX_NAME,
        (
        SELECT
            JOB_ASSIGNMENT_FORM_ARABIC
        FROM
            job_assignment_form
        WHERE
            job_assignment_form.JOB_ASSIGNMENT_FORM = emp_box.JOB_ASSIGNMENT_FORM
    ) AS WOG,
    (
        SELECT
            CAT_NAME
        FROM
            a_category
        WHERE
            CAT_ID = emp_box.CAT_ID
    ) AS cat_name,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.JOB_GOVERNORATE = governorate.GOVERNORATE
    ) AS jobGov,
    e.JOB_LOCATION,
    e.JOB_AREA,
    (
        SELECT
            EMP_STATUS_NAME
        FROM
            emp_status
        WHERE
            e.EMP_STATUS = emp_status.EMP_STATUS
    ) AS empstatusar,
    empApp.APPRAISAL_ARABIC,
    e.NATIONAL_ID_CARD_NO,
    e.NATIONAL_ID_CARD_ISSUED_BY,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.ADDRESS_GOVERNORATE = governorate.GOVERNORATE
    ) AS addressgov,
    e.SOCIAL_INSURANCE_NUMBER,
    e.INSURANCE_OFFICE,
    e.ADDRESS,
    e.PHONE_2_HOME,
    e.PHONE_1_OFFICE,
    e.PHONE_3_MOBILE,
    e.EMP_EMAIL,
    (SELECT STATUS_DESC FROM marital_status WHERE e.MARITAL_STATUS = marital_status.MARITAL_STATUS) AS maritalstatear ,
    (SELECT SYNDICATE_NAME FROM syndicate WHERE e.SYNDICATE = syndicate.SYNDICATE) AS syndicatear ,
    e.SYNDICATE_REGISTERATION,
    e.SYNDICATE_REGISTERATION_DATE,
    (
        SELECT
            GENDER_NAME
        FROM
            genders
        WHERE
            e.GENDER = genders.GENDER
    ) AS genderar,
    (
        SELECT
            RELIGION_NAME
        FROM
            religions
        WHERE
            e.RELIGION = religions.RELIGION
    ) AS religinar,
    e.BIRTH_DATE,
    e.PLACE_OF_BIRTH,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.GOVERNORATE_OF_BIRTH = governorate.GOVERNORATE
    ) AS birthGov
    FROM
        employee e
    JOIN(
        SELECT
            employee_appraisal.NATIONAL_ID_CARD_NO,
            appraisal.APPRAISAL_ARABIC,
            employee_appraisal.APPRAISAL_DATE
        FROM
            employee_appraisal
        JOIN appraisal ON appraisal.APPRAISAL = employee_appraisal.APPRAISAL
    ) AS empApp
    ON
        e.NATIONAL_ID_CARD_NO = empApp.NATIONAL_ID_CARD_NO
    JOIN(
        SELECT
            a_sup_box.sup_box_id,
            a_sup_box.SUP_BOX_NAME,
            a_job_trans.NATIONAL_ID_CARD_NO,
            a_job_trans.JOB_ASSIGNMENT_FORM,
            a_main_box.CAT_ID
        FROM
            a_sup_box
        JOIN a_job_trans JOIN a_main_box ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID AND a_sup_box.MAIN_BOX_ID = a_main_box.MAIN_BOX_ID
        WHERE
            INDICATOR = 2
    ) AS emp_box
    ON
        e.NATIONAL_ID_CARD_NO = emp_box.NATIONAL_ID_CARD_NO
    JOIN(
        SELECT
            NATIONAL_ID_CARD_NO,
            TRANS_DATE
        FROM
            a_job_trans
        WHERE
            JOB_ASSIGNMENT_FORM = 1
    ) AS dateofj
    ON
        e.NATIONAL_ID_CARD_NO = dateofj.NATIONAL_ID_CARD_NO
    WHERE
        NAME_ARABIC = ${empname} AND APPRAISAL_DATE = 2020
        `
    } else if (!empname || empname == "undefined") {
        query = `
        SELECT
        e.EMPLOYEE_ID,
        e.NAME_ARABIC,
        e.SECTOR_JOIN_DATE,
        dateofj.TRANS_DATE,
        emp_box.SUP_BOX_NAME,
        (
        SELECT
            JOB_ASSIGNMENT_FORM_ARABIC
        FROM
            job_assignment_form
        WHERE
            job_assignment_form.JOB_ASSIGNMENT_FORM = emp_box.JOB_ASSIGNMENT_FORM
    ) AS WOG,
    (
        SELECT
            CAT_NAME
        FROM
            a_category
        WHERE
            CAT_ID = emp_box.CAT_ID
    ) AS cat_name,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.JOB_GOVERNORATE = governorate.GOVERNORATE
    ) AS jobGov,
    e.JOB_LOCATION,
    e.JOB_AREA,
    (
        SELECT
            EMP_STATUS_NAME
        FROM
            emp_status
        WHERE
            e.EMP_STATUS = emp_status.EMP_STATUS
    ) AS empstatusar,
    empApp.APPRAISAL_ARABIC,
    e.NATIONAL_ID_CARD_NO,
    e.NATIONAL_ID_CARD_ISSUED_BY,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.ADDRESS_GOVERNORATE = governorate.GOVERNORATE
    ) AS addressgov,
    e.SOCIAL_INSURANCE_NUMBER,
    e.INSURANCE_OFFICE,
    e.ADDRESS,
    e.PHONE_2_HOME,
    e.PHONE_1_OFFICE,
    e.PHONE_3_MOBILE,
    e.EMP_EMAIL,
    (SELECT STATUS_DESC FROM marital_status WHERE e.MARITAL_STATUS = marital_status.MARITAL_STATUS) AS maritalstatear ,
    (SELECT SYNDICATE_NAME FROM syndicate WHERE e.SYNDICATE = syndicate.SYNDICATE) AS syndicatear ,
    e.SYNDICATE_REGISTERATION,
    e.SYNDICATE_REGISTERATION_DATE,
    (
        SELECT
            GENDER_NAME
        FROM
            genders
        WHERE
            e.GENDER = genders.GENDER
    ) AS genderar,
    (
        SELECT
            RELIGION_NAME
        FROM
            religions
        WHERE
            e.RELIGION = religions.RELIGION
    ) AS religinar,
    e.BIRTH_DATE,
    e.PLACE_OF_BIRTH,
    (
        SELECT
            GOVERNORATE_ARABIC
        FROM
            governorate
        WHERE
            e.GOVERNORATE_OF_BIRTH = governorate.GOVERNORATE
    ) AS birthGov
    FROM
        employee e
    JOIN(
        SELECT
            employee_appraisal.NATIONAL_ID_CARD_NO,
            appraisal.APPRAISAL_ARABIC,
            employee_appraisal.APPRAISAL_DATE
        FROM
            employee_appraisal
        JOIN appraisal ON appraisal.APPRAISAL = employee_appraisal.APPRAISAL
    ) AS empApp
    ON
        e.NATIONAL_ID_CARD_NO = empApp.NATIONAL_ID_CARD_NO
    JOIN(
        SELECT
            a_sup_box.sup_box_id,
            a_sup_box.SUP_BOX_NAME,
            a_job_trans.NATIONAL_ID_CARD_NO,
            a_job_trans.JOB_ASSIGNMENT_FORM,
            a_main_box.CAT_ID
        FROM
            a_sup_box
        JOIN a_job_trans JOIN a_main_box ON a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID AND a_sup_box.MAIN_BOX_ID = a_main_box.MAIN_BOX_ID
        WHERE
            INDICATOR = 2
    ) AS emp_box
    ON
        e.NATIONAL_ID_CARD_NO = emp_box.NATIONAL_ID_CARD_NO
    JOIN(
        SELECT
            NATIONAL_ID_CARD_NO,
            TRANS_DATE
        FROM
            a_job_trans
        WHERE
            JOB_ASSIGNMENT_FORM = 1
    ) AS dateofj
    ON
        e.NATIONAL_ID_CARD_NO = dateofj.NATIONAL_ID_CARD_NO
    WHERE
        EMPLOYEE_ID = ${empid} AND APPRAISAL_DATE = 2020
        `
    }
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getDeps(req, res, next) {
    const query = `SELECT DISTINCT SUP_BOX_NAME FROM a_job_trans`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getEmpByDeps(req, res, next) {
    const dep = req.params.dep
    const query = `SELECT employee.NATIONAL_ID_CARD_NO, employee.EMPLOYEE_ID, a_job_trans.MAIN_BOX_NAME, a_job_trans.SUP_BOX_NAME, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 AND a_job_trans.SUP_BOX_NAME = "${dep}" ORDER BY a_job_trans.MAIN_BOX_NAME`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getjobgovern(req, res, next) {
    const query = `select DISTINCT employee.JOB_GOVERNORATE, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getjobstation(req, res, next) {
    const govern = req.params.govern
    const query = `SELECT DISTINCT JOB_LOCATION, JOB_GOVERNORATE from employee where JOB_GOVERNORATE = ${govern} `
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {

            res.send(details)
        }
    })
}

function getEmpStationAndGovern(req, res, next) {
    let query;
    const govern = req.params.govern
    const station = req.params.station

    if (station === "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS() , employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                next(err);
            } else {
                res.send(details)
            }
        })
    } else if (station !== "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS(), employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON  employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} AND JOB_LOCATION = "${station}" ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                next(err);
            } else {

                details.length = details.length

                res.send(details)
            }
        })
    }


}


function getqn(req, res, next) {
    let query = `CALL autogetqn();`
    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            details.shift()
            res.send(details)
        }
    })

}

function getEmps(req, res) {
    let query = `
    select COUNT(GENDER) AS MALE from employee WHERE GENDER = 1;
    select COUNT(GENDER) AS FEMALE from employee WHERE GENDER = 2;
    `
    db.query(query, (err, data) => {
        if (err) {
            res.json({ data: null, msg: "there is an error" })
        } else {
            res.json(data)
        }
    })
}

function getgid(req, res) {
    let query = `
      SELECT DISTINCT COUNT(NATIONAL_ID_CARD_NO) AS Technical FROM a_job_trans WHERE G_ID = 1;
      SELECT DISTINCT COUNT(NATIONAL_ID_CARD_NO) AS NON_Technical FROM a_job_trans WHERE G_ID = 2;
    `
    db.query(query, (err, data) => {
        if (err) {
            res.json({ data: null, msg: "there is an error" })
        } else {
            res.json(data)
        }
    })
}

function countEmpsInGoverns(req, res, next) {
    let query = `CALL countEmpsInGoverns();`

    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.json(data)
        }
    })
}

function gethierarchicaldata(req, res, next) {

    jobdesc = req.query.jobdesc
    console.log(jobdesc);
    let query = `SELECT * FROM hierarchicaldata where level_1 = "${jobdesc}"`
    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            for (let i = 0; i < 1436; i++) {
                var ob = data.filter(el => el.level_2 = "مدير ادارة الخدمات الاجتماعية")
            }
            console.log(ob);

        }
    })
}

function getNatIdExpired(req, res, next) {
    let query = `SELECT NAME_ARABIC, EMPLOYEE_ID, NATIONAL_ID_CARD_EXPIRE_DATE FROM employee where NATIONAL_ID_CARD_EXPIRED = "true" ORDER BY NATIONAL_ID_CARD_EXPIRE_DATE`
    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.send(data)
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
    .get('/getemps', getEmps)
    .get('/getgid', getgid)
    .get('/countempsingoverns', countEmpsInGoverns)
    .get('/gethierarchicaldata', gethierarchicaldata)
    .get('/getnatidexpired', getNatIdExpired)





module.exports = router;