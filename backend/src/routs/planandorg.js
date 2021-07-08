const express = require("express");
const db = require("../database/connection")

let router = express.Router();
let query = `SELECT DISTINCT a_sup_box.SUP_BOX_NAME AS emp_box_name, emp.SUP_BOX_NAME AS manager_box_name, latest.NATIONAL_ID_CARD_NO FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS emp JOIN( SELECT t1.* FROM a_job_trans t1 WHERE t1.TRANS_DATE =( SELECT MAX(t2.TRANS_DATE) FROM a_job_trans t2 ) ORDER BY "TRANS_DATE" DESC ) AS latest ON a_sup_box.SUP_BOX_ID_P = emp.SUP_BOX_ID AND latest.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_sup_box.MAIN_BOX_ID = 31`

let query2 = `SELECT t1.* FROM a_job_trans t1 WHERE t1.TRANS_DATE =( SELECT MAX(t2.TRANS_DATE) FROM a_job_trans t2 ) ORDER BY "TRANS_DATE" DESC`

let query3 = `SELECT * FROM a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN( SELECT job_level.JOB_LEVEL_NAME, a_job_dgree.J_D_NAME FROM a_job_dgree JOIN job_level ON a_job_dgree.JOB_LEVEL = job_level.JOB_LEVEL ) AS emp_level ON emp_level.J_D_NAME = a_job_trans.MAIN_BOX_NAME AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.EMPLOYEE_ID = 701 ORDER BY a_job_trans.TRANS_DATE`

let query4 = `SELECT * FROM employee_education_degree JOIN education_degree JOIN dgree_speciality JOIN dgree_speciality_detail JOIN UNIVERSITY_SCHOOL JOIN GRADUATION_GRADE JOIN employee ON employee_education_degree.DEGREE = education_degree.DEGREE AND employee_education_degree.SPECIALITY = dgree_speciality.SPECIALITY AND employee_education_degree.SPECIALITY_DETAIL = dgree_speciality_detail.SPECIALITY_DETAIL AND employee_education_degree.UNIVERSITY_SCHOOL = university_school.UNIVERSITY_SCHOOL AND employee_education_degree.GRADUATION_GRADE = graduation_grade.GRADUATION_GRADE AND employee_education_degree.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO`
let query5 = `UPDATE a_job_trans JOIN job_assignment_form JOIN employee JOIN indicators JOIN a_sup_box join a_category JOIN a_job_groups SET a_job_trans.JOB_ASSIGNMENT_FORM = job_assignment_form.JOB_ASSIGNMENT_FORM, a_job_trans.INDICATOR = indicators.INDICATOR , a_job_trans.SUP_BOX_ID = a_sup_box.SUP_BOX_ID, a_job_trans.CAT_ID = a_category.CAT_ID WHERE job_assignment_form.JOB_ASSIGNMENT_FORM_ARABIC = "أخرى" AND indicators.INDICATOR_NAME = "أصلية" AND a_sup_box.SUP_BOX_NAME = "مدير عام مساعد لشئون العاملين و علاقات العمل" AND a_category.CAT_NAME = "تنمية الموارد البشرية" and employee.NAME_ARABIC = "محمد محمد محمد الديب" AND a_job_trans.TRANS_DATE = "2021-01-01"`

let query6 = `INSERT INTO a_job_trans(
    NATIONAL_ID_CARD_NO,
    TRANS_DATE,
    SUP_BOX_NAME,
    G_ID,
    JOB_ASSIGNMENT_FORM,
    INDICATOR,
    CAT_ID
)
VALUES(
    (
    SELECT
        NATIONAL_ID_CARD_NO
    FROM
        employee
    WHERE
        EMPLOYEE_ID = 701
),
"1-1-2022",
"مدير عام مساعد",
(
    SELECT
        G_ID
    FROM
        a_job_groups
    WHERE
        G_NAME = "إداري"
),
(
    SELECT
        JOB_ASSIGNMENT_FORM
    FROM
        job_assignment_form
    WHERE
        JOB_ASSIGNMENT_FORM_ARABIC = "أخرى"
),
(
    SELECT
        INDICATOR
    FROM
        indicators
    WHERE
        INDICATOR_NAME = "حالية"
),
(
    SELECT
        CAT_ID
    FROM
        a_category
    WHERE
        CAT_NAME = "تنمية الموارد البشرية"
)
)`

let query7 = `SELECT * FROM a_job_dgree JOIN( SELECT a_main_box.CAT_ID, a_main_box.J_D_ID, a_category.CAT_NAME FROM a_main_box JOIN a_category ON a_category.CAT_ID = a_main_box.CAT_ID ) AS maincate ON a_job_dgree.J_D_ID = maincate.J_D_ID WHERE maincate.CAT_NAME = "تنمية الموارد البشرية" AND a_job_dgree.J_D_ID > 172 ORDER BY a_job_dgree.J_D_ID LIMIT 1`
let query8 =`SELECT * FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID`
function getJobDgByCat(req, res) {
    const catId = req.params.catid
    const mainboxid = req.params.mainboxid
    const query = `SELECT * FROM a_job_dgree JOIN a_main_box ON a_job_dgree.J_D_ID = a_main_box.J_D_ID WHERE a_main_box.CAT_ID = ${catId};`
    db.query(query, (err, details) => {
        if (err) {
            db.query(`SELECT * ,maincate.MAIN_BOX_ID  FROM a_job_dgree JOIN( SELECT a_main_box.CAT_ID, a_main_box.MAIN_BOX_ID, a_main_box.J_D_ID, a_category.CAT_NAME FROM a_main_box JOIN a_category ON a_category.CAT_ID = a_main_box.CAT_ID ) AS maincate ON a_job_dgree.J_D_ID = maincate.J_D_ID WHERE maincate.CAT_NAME = "${catId}" AND maincate.MAIN_BOX_ID  < ${mainboxid} `, (err, details) => {
                if (err) {
                  console.log(err);  
                } else {
                    console.log(details);
                    res.send(details.reverse());
                }
            })
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
    let query = `SELECT a_sup_box.SUP_BOX_NAME AS emp_box_name, emp.SUP_BOX_NAME AS manager_box_name,emp.SUP_BOX_ID AS manager_box_id, a_sup_box.SUP_BOX_ID AS emp_box_id, a_sup_box.SUP_BOX_NAME AS emp_box_name , latest.NAME_ARABIC FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS emp JOIN( SELECT employee.NATIONAL_ID_CARD_NO, a_job_trans.TRANS_DATE, a_job_trans.SUP_BOX_ID, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 ) AS latest ON a_sup_box.SUP_BOX_ID_P = emp.SUP_BOX_ID AND latest.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_sup_box.MAIN_BOX_ID = ${mainid}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);

        }


    })
}



function getEmpApprails(req, res) {
    let query;
    const empid = req.params.empid
    const appraisal = req.params.appraisal
    const year = req.params.year

    console.log("hit");
    if (empid === "null" && (appraisal === "null" || appraisal === "اختر التقييم")) {
        db.query(`SELECT employee.NAME_ARABIC, employee_appraisal.APPRAISAL_DATE, appraisal.APPRAISAL_ARABIC,
        employee.EMPLOYEE_ID, employee_appraisal.NATIONAL_ID_CARD_NO
        FROM
        employee_appraisal
        JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
        JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
        WHERE
        employee_appraisal.APPRAISAL_DATE = ${year}
        ORDER BY
        appraisal.APPRAISAL_ARABIC`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details);
            }
        })
    } else if ((appraisal === "null" || appraisal === "اختر التقييم") && (year === "null" || year === "اختر السنة")) {
        db.query(`SELECT employee.NAME_ARABIC, employee_appraisal.APPRAISAL_DATE ,appraisal.APPRAISAL_ARABIC , employee.EMPLOYEE_ID, employee_appraisal.NATIONAL_ID_CARD_NO FROM employee_appraisal JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL WHERE employee.EMPLOYEE_ID = ${empid} ORDER BY employee_appraisal.APPRAISAL_DATE`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                console.log(details);
                res.send(details);
            }
        })
    }
    else if (empid === "null" && (year === "null" || year === "اختر السنة")) {

        db.query(db.query(`SELECT
        employee.NAME_ARABIC,
        employee_appraisal.APPRAISAL_DATE,
        appraisal.APPRAISAL_ARABIC,
        employee.EMPLOYEE_ID,
        employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
        employee_appraisal
    JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
    appraisal.APPRAISAL_ARABIC = "${appraisal}"
    ORDER BY
                employee_appraisal.APPRAISAL_DATE`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details);
            }
        }))
    } else if (empid === "null") {
        db.query(`SELECT employee.NAME_ARABIC,
        employee_appraisal.APPRAISAL_DATE,
        appraisal.APPRAISAL_ARABIC,
        employee.EMPLOYEE_ID,
        employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
        employee_appraisal
    JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
        employee_appraisal.APPRAISAL_DATE = ${year} AND appraisal.APPRAISAL_ARABIC = "${appraisal}"
    ORDER BY employee_appraisal.APPRAISAL_DATE`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details);
            }
        })
    } else if (appraisal === "null" || appraisal === "اختر التقييم") {
        db.query(`SELECT
        employee.NAME_ARABIC,
        employee_appraisal.APPRAISAL_DATE,
        appraisal.APPRAISAL_ARABIC,
        employee.EMPLOYEE_ID,
        employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
        employee_appraisal
    JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
        employee.EMPLOYEE_ID = ${empid} AND employee_appraisal.APPRAISAL_DATE = ${year}
    ORDER BY
        employee_appraisal.APPRAISAL_DATE`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details);
            }
        })
    } else if (year === "null" || year === "اختر السنة") {
        db.query(`SELECT
        employee.NAME_ARABIC,
        employee_appraisal.APPRAISAL_DATE,
        appraisal.APPRAISAL_ARABIC,
        employee.EMPLOYEE_ID,
        employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
        employee_appraisal
    JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
        employee.EMPLOYEE_ID = ${empid} AND appraisal.APPRAISAL_ARABIC = "${appraisal}"
    ORDER BY
        employee_appraisal.APPRAISAL_DATE`, (err, details) => {
            if (err) {
                console.log(err);
            } else {
                res.send(details);
            }
        })
    }

}

function updateAppraisal(req, res) {
    console.log(req.body);
    let query = `UPDATE employee_appraisal JOIN employee ON employee_appraisal.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO JOIN appraisal SET employee_appraisal.APPRAISAL = appraisal.APPRAISAL WHERE appraisal.APPRAISAL_ARABIC = "${req.body.appraisal}" AND employee_appraisal.APPRAISAL_DATE = ${req.body.year} AND employee_appraisal.NATIONAL_ID_CARD_NO = ${req.body.empNat}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpTrans(req, res) {
    const empid = req.params.empid
    let query = `select * from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.EMPLOYEE_ID = ${empid} ORDER by a_job_trans.TRANS_DATE`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpAvljd (req,res){
    const catname = req.params.catname;
    const mainboxid = req.params.mainboxid
let d = `WHERE id < 5
ORDER BY id DESC
LIMIT 1`
    let query1 = `SELECT SUP_BOX_NAME from a_sup_box WHERE MAIN_BOX_ID IN (SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID WHERE a_category.CAT_NAME = "${catname}" AND a_job_dgree.J_D_NAME = "${jdname}")`

    let query = `SELECT * FROM a_job_dgree JOIN( SELECT a_main_box.CAT_ID, a_main_box.J_D_ID, a_category.CAT_NAME FROM a_main_box JOIN a_category ON a_category.CAT_ID = a_main_box.CAT_ID ) AS maincate ON a_job_dgree.J_D_ID = maincate.J_D_ID WHERE maincate.CAT_NAME = "${catname}" AND a_job_dgree.J_D_ID = ${mainboxid} ORDER BY a_job_dgree.J_D_ID LIMIT 1`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getCurrentJD(req,res){
    let empid = req.params.empid
    let query = `SELECT
    *
FROM
    a_job_trans
JOIN employee JOIN(
    SELECT
        a_main_box.J_D_ID,
        a_job_dgree.J_D_NAME,
        a_job_dgree.J_D_ID_P,
        a_main_box.MAIN_BOX_ID
    FROM
        a_main_box
    JOIN a_job_dgree ON a_job_dgree.J_D_ID = a_main_box.J_D_ID 
) AS latestjobdg JOIN a_sup_box 
ON
    a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND latestjobdg.MAIN_BOX_ID = a_job_trans.MAIN_BOX_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID 
WHERE
    employee.EMPLOYEE_ID = ${empid} AND a_job_trans.INDICATOR = 2 `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}


function getEmpEdu(req, res) {
    const empid = req.params.empid
    let query = `SELECT * FROM employee_education_degree JOIN education_degree JOIN dgree_speciality JOIN dgree_speciality_detail JOIN UNIVERSITY_SCHOOL JOIN GRADUATION_GRADE JOIN employee ON employee_education_degree.DEGREE = education_degree.DEGREE AND employee_education_degree.SPECIALITY = dgree_speciality.SPECIALITY AND employee_education_degree.SPECIALITY_DETAIL = dgree_speciality_detail.SPECIALITY_DETAIL AND employee_education_degree.UNIVERSITY_SCHOOL = university_school.UNIVERSITY_SCHOOL AND employee_education_degree.GRADUATION_GRADE = graduation_grade.GRADUATION_GRADE AND employee_education_degree.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE employee.EMPLOYEE_ID = ${empid}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function updateEmpTrans(req, res) {
    console.log(req.body);
    let query = `UPDATE a_job_trans SET SUP_BOX_NAME = "${req.body.catname}", MAIN_BOX_NAME = "${req.body.jdname}", SUP_BOX_ID = (SELECT SUP_BOX_ID FROM a_sup_box WHERE SUP_BOX_NAME = "${req.body.supboxname}"), G_ID = (SELECT G_ID FROM a_job_groups WHERE G_NAME = "${req.body.gname}"), job_assignment_form = (SELECT JOB_ASSIGNMENT_FORM FROM job_assignment_form WHERE JOB_ASSIGNMENT_FORM_ARABIC = "${req.body.jasi}"), INDICATOR = (SELECT INDICATOR FROM indicators WHERE INDICATOR_NAME = "${req.body.indname}" ) WHERE NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID  = ${req.body.empid} ) `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getAvailSupBox(req, res){
    const catname = req.params.catname
    const jdname = req.params.jdname

    console.log(catname, jdname);
    let query =`SELECT SUP_BOX_NAME, SUP_BOX_ID from a_sup_box WHERE MAIN_BOX_ID IN (SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID WHERE a_category.CAT_NAME = "${catname}" AND a_job_dgree.J_D_NAME = "${jdname}")`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details);
        }
    })
}

function getUpJd(req,res){
    const len = req.params.len
    const supboxname = req.params.supboxname
    let query = `CALL GTT(${len},(SELECT SUP_BOX_ID FROM a_sup_box WHERE SUP_BOX_NAME = "${supboxname}"))`
    console.log(len,supboxname);
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.send(details.reverse());
        }
    })
}

// function getAvailSupBox(req, res){
//     const catname = req.params.catname
//     const jdname = req.params.jdname

//     console.log(catname, jdname);
//     let query =`SELECT SUP_BOX_NAME from a_sup_box WHERE MAIN_BOX_ID IN (SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID WHERE a_category.CAT_NAME = "${catname}" AND a_job_dgree.J_D_NAME = "${jdname}")`
//     db.query(query, (err, details) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(details);
//         }
//     })
// }

function postnewtrans(req, res){

    console.log(req.body);
}

router
    .get('/getjobdgbycat/:catid/:mainboxid', getJobDgByCat)

    .get(`/getsupboxnames/:jdid/:catid`, getSupBoxNames)

    .get(`/getboxandmangers/:mainid`, getsupboxmangers)

    .get(`/getmaincode/:jdid/:catid`, getMaincode)

    .get('/getempappraisal/:empid/:appraisal/:year', getEmpApprails)
    .put('/appraisalupdate', updateAppraisal)

    .get('/getemptrans/:empid', getEmpTrans)
    .put('/updateemptrans', updateEmpTrans)

    .get('/getempedu/:empid', getEmpEdu)

    .get('/currentjd/:empid',getCurrentJD)
    

    .get('/availjd/:catname/:jdname',getEmpAvljd)
    .get('/getavailsupbox/:catname/:jdname',getAvailSupBox)
    .post('/postnewtrans', postnewtrans)

    .get('/getUpJd/:len/:supboxname', getUpJd)






module.exports = router;