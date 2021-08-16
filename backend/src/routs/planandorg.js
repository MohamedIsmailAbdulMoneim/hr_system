const express = require("express");
const db = require("../database/connection")

let router = express.Router();

function getEmpExprerience(req, res, next) {
    const empid = req.query.empid
    const empname = req.query.empname

    const query = `
    SELECT * FROM employee_experince WHERE EXP_TYP_CODE = 1 AND NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO  FROM employee WHERE ${empid.length !== 0 ? `EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `NAME_ARABIC = "${empname}"` : null});
    SELECT * FROM employee_experince WHERE EXP_TYP_CODE = 3 AND NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO  FROM employee WHERE ${empid.length !== 0 ? `EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `NAME_ARABIC = "${empname}"` : null});
    SELECT * FROM employee_experince WHERE EXP_TYP_CODE = 4 AND NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO  FROM employee WHERE ${empid.length !== 0 ? `EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `NAME_ARABIC = "${empname}"` : null});
    `
    db.query(query, (err, details) => {
        if (err) {
            next(err)
            console.log(err);
        } else {
            res.send(details);
        }

    })
}

function getJobDgByCat(req, res, next) {
    const catName = req.params.catname
    const query = `SELECT * FROM a_job_dgree JOIN a_main_box ON a_job_dgree.J_D_ID = a_main_box.J_D_ID WHERE a_main_box.CAT_ID = (SELECT CAT_ID FROM a_category WHERE CAT_NAME = "${catName}");`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
    // db.query(query, (err, details) => {
    //     if (err) {
    //         next(err);
    //         db.query(`SELECT * ,maincate.MAIN_BOX_ID  FROM a_job_dgree JOIN( SELECT a_main_box.CAT_ID, a_main_box.MAIN_BOX_ID, a_main_box.J_D_ID, a_category.CAT_NAME FROM a_main_box JOIN a_category ON a_category.CAT_ID = a_main_box.CAT_ID ) AS maincate ON a_job_dgree.J_D_ID = maincate.J_D_ID WHERE maincate.CAT_NAME = "${catId}" `, (err, details) => {
    //             if (err) {
    //                 next(err)
    //             } else {
    //                 res.send(details.reverse());
    //             }
    //         })
    //     } else {
    //         res.send(details);
    //     }
    // })
}

function getSupBoxNames(req, res, next) {
    const jdid = req.params.jdid
    const catid = req.params.catid
    const query = `SELECT * FROM a_sup_box WHERE MAIN_BOX_ID IN (SELECT MAIN_BOX_ID FROM A_MAIN_BOX WHERE J_D_ID = ${jdid} AND CAT_ID = ${catid})`
    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            res.send(details);
        }
    })
}

function getMaincode(req, res, next) {
    const jdid = req.params.jdid
    const catid = req.params.catid
    const query = `SELECT MAIN_BOX_ID FROM a_main_box WHERE J_D_ID = ${jdid} and CAT_ID = ${catid} `
    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            res.send(details);
        }

    })
}

function getsupboxmangers(req, res, next) {
    const mainid = req.params.mainid
    let query = `SELECT a_sup_box.SUP_BOX_NAME AS emp_box_name, emp.SUP_BOX_NAME AS manager_box_name,emp.SUP_BOX_ID AS manager_box_id, a_sup_box.SUP_BOX_ID AS emp_box_id, a_sup_box.SUP_BOX_NAME AS emp_box_name , latest.NAME_ARABIC FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS emp JOIN( SELECT employee.NATIONAL_ID_CARD_NO, a_job_trans.TRANS_DATE, a_job_trans.SUP_BOX_ID, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 ) AS latest ON a_sup_box.SUP_BOX_ID_P = emp.SUP_BOX_ID AND latest.SUP_BOX_ID = a_sup_box.SUP_BOX_ID WHERE a_sup_box.MAIN_BOX_ID = ${mainid}`
    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            res.send(details);
        }
    })
}

function getEmpApprails(req, res, next) {

    const empid = req.query.empid
    const empname = req.query.empname
    const appraisal = req.query.appraisal
    const year = req.query.year

    let query = `SELECT employee.NAME_ARABIC, employee_appraisal.APPRAISAL_DATE, appraisal.APPRAISAL_ARABIC,employee_appraisal.id,
    employee.EMPLOYEE_ID, employee_appraisal.NATIONAL_ID_CARD_NO
    FROM
    employee_appraisal
    JOIN employee ON employee.NATIONAL_ID_CARD_NO = employee_appraisal.NATIONAL_ID_CARD_NO
    JOIN APPRAISAL ON APPRAISAL.APPRAISAL = employee_appraisal.APPRAISAL
    WHERE
    ${(empid.length === 0 && !empname) && (!appraisal || appraisal === "اختر التقدير") ? `employee_appraisal.APPRAISAL_DATE = ${year}` : !appraisal || appraisal === "اختر التقدير" && (!year || year === "اختر السنة") ? `${empid.length !== 0 ? `employee.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `employee.NAME_ARABIC = "${empname}"` : null}` : (empid.length === 0 && !empname) && (!year || year === "اختر السنة") ? `appraisal.APPRAISAL_ARABIC = "${appraisal}"` : empid.length === 0 && !empname ? `employee_appraisal.APPRAISAL_DATE = ${year} AND appraisal.APPRAISAL_ARABIC = "${appraisal}"` : !appraisal || appraisal === "اختر التقدير" ? `${empid.length !== 0 ? `employee.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `employee.NAME_ARABIC = "${empname}"` : null} AND employee_appraisal.APPRAISAL_DATE = ${year}` : !year || year === "اختر السنة" ? `${empid.length !== 0 ? `employee.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `employee.NAME_ARABIC = "${empname}"` : null} AND appraisal.APPRAISAL_ARABIC = "${appraisal}"` : null}
    ORDER BY employee_appraisal.APPRAISAL_DATE`

    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            res.send(details);
        }
    })
}

function newAppraisal(req, res, next) {
    const { appDate, appValue, empid, empname } = req.body

    if (empid == "null" && empname == "null") {
        res.json({ data: null, msg: "يجب إدخال أي من الإسم ورقم الأداء" })
        return;
    }
    let query = `INSERT INTO employee_appraisal (APPRAISAL_DATE, APPRAISAL , NATIONAL_ID_CARD_NO , ORGANIZATION) VALUES (${appDate},(select APPRAISAL FROM appraisal WHERE APPRAISAL_ARABIC = "${appValue}"),(select NATIONAL_ID_CARD_NO FROM employee WHERE ${empid != "null" ? `EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `NAME_ARABIC = "${empname}"` : null}),30)`
    db.query(query, (err, details) => {
        if (err) {
            next(err)
            res.json({ data: null, msg: "يوجد خطاء بقاعدة البيانات" })
        } else {
            res.json({ data: details, msg: "تم إدخال التقييم بنجاح" });
        }
    })
}


function updateAppraisal(req, res, next) {
    let { appraisal, year, empNat } = req.body
    // let query = `UPDATE employee_appraisal JOIN employee ON employee_appraisal.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO JOIN appraisal SET employee_appraisal.APPRAISAL = appraisal.APPRAISAL WHERE appraisal.APPRAISAL_ARABIC = "${req.body.appraisal}" AND employee_appraisal.APPRAISAL_DATE = ${req.body.year} AND employee_appraisal.NATIONAL_ID_CARD_NO = ${req.body.empNat}`
    let query = `UPDATE employee_appraisal SET APPRAISAL = (SELECT APPRAISAL FROM appraisal WHERE APPRAISAL_ARABIC = "${appraisal}"), APPRAISAL_DATE = ${year} WHERE NATIONAL_ID_CARD_NO = ${empNat} AND APPRAISAL_DATE = ${year}`
    db.query(query, (err, details, next) => {
        if (err) {
            next(err)
            res.json({ data: null, status: 400 })
        } else {
            res.json({ data: details, status: 200 });


        }
    })
}

// function getEmpTrans(req, res) {
//     const empid = req.params.empid
//     let query = `select * from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.EMPLOYEE_ID = ${empid} ORDER by a_job_trans.TRANS_DATE`
//     db.query(query, (err, details) => {
//         if (err) {
//         } else {
//             res.send(details);
//         }
//     })
// }

function getEmpTrans(req, res, next) {
    const empid = req.query.empid
    const empname = req.query.empname

    let query = `select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE ${empid.length !== 0 ? `employee.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `employee.NAME_ARABIC = "${empname}"` : null} ORDER by a_job_trans.TRANS_DATE`

    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpAvljd(req, res, next) {
    const catname = req.params.catname;
    const mainboxid = req.params.mainboxid
    let d = `WHERE id < 5
ORDER BY id DESC
LIMIT 1`
    let query1 = `SELECT SUP_BOX_NAME from a_sup_box WHERE MAIN_BOX_ID IN (SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID WHERE a_category.CAT_NAME = "${catname}" AND a_job_dgree.J_D_NAME = "${jdname}")`

    let query = `SELECT * FROM a_job_dgree JOIN( SELECT a_main_box.CAT_ID, a_main_box.J_D_ID, a_category.CAT_NAME FROM a_main_box JOIN a_category ON a_category.CAT_ID = a_main_box.CAT_ID ) AS maincate ON a_job_dgree.J_D_ID = maincate.J_D_ID WHERE maincate.CAT_NAME = "${catname}" AND a_job_dgree.J_D_ID = ${mainboxid} ORDER BY a_job_dgree.J_D_ID LIMIT 1`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getCurrentJD(req, res, next) {
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
            next(err);
        } else {
            res.send(details);
        }
    })
}


function getEmpEdu(req, res, next) {
    let empid = req.query.empid
    let empname = req.query.empname

    let query = `SELECT * FROM employee_education_degree JOIN education_degree JOIN dgree_speciality JOIN dgree_speciality_detail JOIN UNIVERSITY_SCHOOL JOIN GRADUATION_GRADE JOIN (SELECT employee.EMPLOYEE_ID,employee.NATIONAL_ID_CARD_NO FROM employee ) AS detofemp ON employee_education_degree.DEGREE = education_degree.DEGREE AND employee_education_degree.SPECIALITY = dgree_speciality.SPECIALITY AND employee_education_degree.SPECIALITY_DETAIL = dgree_speciality_detail.SPECIALITY_DETAIL AND employee_education_degree.UNIVERSITY_SCHOOL = university_school.UNIVERSITY_SCHOOL AND employee_education_degree.GRADUATION_GRADE = graduation_grade.GRADUATION_GRADE AND employee_education_degree.NATIONAL_ID_CARD_NO = detofemp.NATIONAL_ID_CARD_NO WHERE ${empid || empid !== "undefined" ? `detofemp.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `detofemp.NAME_ARABIC = "${empname}"` : null}`

    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getEmpFamily(req, res, next) {
    let empid = req.query.empid
    let empname = req.query.empname

    let query = `SELECT *, detofemp.EMPLOYEE_ID, detofemp.NAME_ARABIC FROM employee_family_member JOIN(SELECT employee.EMPLOYEE_ID, employee.NAME_ARABIC, employee.NATIONAL_ID_CARD_NO FROM employee) AS detofemp ON employee_family_member.NATIONAL_ID_CARD_NO = detofemp.NATIONAL_ID_CARD_NO WHERE ${empid || empid !== "undefined" ? `detofemp.EMPLOYEE_ID = ${empid} ` : empname || empname !== "undefined" ? `detofemp.NAME_ARABIC = "${empname}"` : null} `

    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);

        }
    })

}

function postnewtrans(req, res, next) {

    let query = `
    update a_job_trans set INDICATOR = 3 WHERE INDICATOR = 2 AND NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${req.body.empid});
    INSERT INTO a_job_trans(
        NATIONAL_ID_CARD_NO,
        TRANS_DATE,
        CAT_ID,
        ORGANIZATION,
        MAIN_BOX_ID,
        SUP_BOX_ID,
        G_ID,
        SUP_BOX_NAME,
        JOB_ASSIGNMENT_FORM,
        INDICATOR,
        MAIN_BOX_NAME
    )
    VALUES(
        (
            SELECT
            NATIONAL_ID_CARD_NO
        FROM
            employee
        WHERE
            EMPLOYEE_ID = ${req.body.empid}
    ), "${req.body.transdate}",
        (
            SELECT
            CAT_ID
    FROM
    a_category
    WHERE
    CAT_NAME = "${req.body.catname}"
    ),
    30,
        (
            SELECT
            MAIN_BOX_ID
    FROM
    a_main_box
    WHERE
    J_D_ID = (
        SELECT
                J_D_ID
    FROM
    a_job_dgree
    WHERE
    J_D_NAME = "${req.body.jdname}"
        ) AND CAT_ID = (
        SELECT
            CAT_ID
    FROM
    a_category
    WHERE
    CAT_NAME = "${req.body.catname}"
    )
    ),
    (
        SELECT
            SUP_BOX_ID
    FROM
    a_sup_box
    WHERE
    SUP_BOX_NAME = "${req.body.supboxname}" AND MAIN_BOX_ID = (
        SELECT
            MAIN_BOX_ID
    FROM
    a_main_box
    WHERE
    J_D_ID = (
        SELECT
                J_D_ID
    FROM
    a_job_dgree
    WHERE
    J_D_NAME = "${req.body.jdname}"
        ) AND CAT_ID = (
        SELECT
            CAT_ID
    FROM
    a_category
    WHERE
    CAT_NAME = "${req.body.catname}"
    )))
    ,
    (
        SELECT
            G_ID
    FROM
    a_job_groups
    WHERE
    G_NAME = "${req.body.gname}"
    ),
    "${req.body.catname}",
        (
            SELECT
            JOB_ASSIGNMENT_FORM
    FROM
    JOB_ASSIGNMENT_FORM
    WHERE
    JOB_ASSIGNMENT_FORM_ARABIC = "${req.body.jasi}"
    ),
    (
        SELECT
            INDICATOR
    FROM
    indicators
    WHERE
    INDICATOR_NAME = "${req.body.indname}"
    ), "${req.body.jdname}")`

    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })

}




function updateEmpTrans(req, res, next) {
    let query;
    if (!req.body.empname || req.body.empname == "null" || req.body.empname == "undefined") {
        query = `UPDATE a_job_trans SET SUP_BOX_NAME = "${req.body.catname}", MAIN_BOX_NAME = "${req.body.jdname}", SUP_BOX_ID = (
        SELECT
                SUP_BOX_ID
    FROM
    a_sup_box
    WHERE
    SUP_BOX_NAME = "${req.body.supboxname}" AND MAIN_BOX_ID = (
        SELECT
                MAIN_BOX_ID
    FROM
    a_main_box
    WHERE
    J_D_ID = (
        SELECT
                    J_D_ID
    FROM
    a_job_dgree
    WHERE
    J_D_NAME = "${req.body.jdname}"
            ) AND CAT_ID = (
        SELECT
                CAT_ID
    FROM
    a_category
    WHERE
    CAT_NAME = "${req.body.catname}"
        ) LIMIT 1) LIMIT 1), G_ID = (SELECT G_ID FROM a_job_groups WHERE G_NAME = "${req.body.gname}"), job_assignment_form = (SELECT JOB_ASSIGNMENT_FORM FROM job_assignment_form WHERE JOB_ASSIGNMENT_FORM_ARABIC = "${req.body.jasi}"), INDICATOR = (SELECT INDICATOR FROM indicators WHERE INDICATOR_NAME = "${req.body.indname}" ) WHERE NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${req.body.empid} AND TRANS_DATE = "${req.body.date}"
        );select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE ${req.body.empid || req.body.empid !== "undefined" ? `employee.EMPLOYEE_ID = ${req.body.empid}` : req.body.empname || req.body.empname !== "undefined" ? `employee.NAME_ARABIC = "${req.body.empname}"` : null} ORDER by a_job_trans.TRANS_DATE;`
    } else if (!req.body.empid || req.body.empid == "null" || req.body.empid == "undefined") {
        query = `UPDATE a_job_trans SET SUP_BOX_NAME = "${req.body.catname}", MAIN_BOX_NAME = "${req.body.jdname}", SUP_BOX_ID = (SELECT SUP_BOX_ID FROM a_sup_box WHERE SUP_BOX_NAME = "${req.body.supboxname}" AND MAIN_BOX_ID = ${req.body.mainboxid}), G_ID = (SELECT G_ID FROM a_job_groups WHERE G_NAME = "${req.body.gname}"), job_assignment_form = (SELECT JOB_ASSIGNMENT_FORM FROM job_assignment_form WHERE JOB_ASSIGNMENT_FORM_ARABIC = "${req.body.jasi}"), INDICATOR = (SELECT INDICATOR FROM indicators WHERE INDICATOR_NAME = "${req.body.indname}" ) WHERE NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${req.body.empname}" AND TRANS_DATE = "${req.body.date}"
        );select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE ${req.body.empid || req.body.empid !== "undefined" ? `employee.EMPLOYEE_ID = ${req.body.empid}` : req.body.empname || req.body.empname !== "undefined" ? `employee.NAME_ARABIC = "${req.body.empname}"` : null} ORDER by a_job_trans.TRANS_DATE;`
    }


    console.log(req.body.empname, req.body.empid);

    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getAvailSupBox(req, res, next) {
    const catname = req.params.catname
    const jdname = req.params.jdname

    let query = `SELECT SUP_BOX_NAME, SUP_BOX_ID from a_sup_box WHERE MAIN_BOX_ID IN(SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_job_dgree JOIN a_category ON a_main_box.J_D_ID = a_job_dgree.J_D_ID AND a_main_box.CAT_ID = a_category.CAT_ID WHERE a_category.CAT_NAME = "${catname}" AND a_job_dgree.J_D_NAME = "${jdname}")`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details);
        }
    })
}

function getUpJd(req, res, next) {
    const len = req.params.len
    const supboxname = req.params.supboxname
    let query = `CALL GTT(${len}, (SELECT SUP_BOX_ID FROM a_sup_box WHERE SUP_BOX_NAME = "${supboxname}"))`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details.reverse());
        }
    })
}

function newEmpExp(req, res, next) {
    let data = req.body
    db.query("INSERT INTO employee_experince (PLACE_NAME, JOB_NAME, START_DATE, END_DATE, EXP_TYP_CODE, NATIONAL_ID_CARD_NO) VALUES ?", [data], function (err, data) {
        if (err) {
            next(err);
            res.json({ data: null, msg: "يوجد خطاء بقاعدة البيانات" });
        } else {
            res.json({ data: data, msg: "تم إدخال البيانات بنجاح" });
        }

    })
}

function postBulkTrans(req, res, next) {
    console.log(req.body);
    let data = req.body
    db.query(`INSERT INTO a_job_trans (NATIONAL_ID_CARD_NO, TRANS_DATE, CAT_ID) VALUES ${data}`, function (err, data) {
        if (err) {
            next(err);
            res.json({ data: null, msg: "يوجد خطاء بقاعدة البيانات" });
        } else {
            res.json({ data: data, msg: "تم إدخال البيانات بنجاح" });
        }
    })
}



router
    .get('/getjobdgbycat/:catname', getJobDgByCat)
    .get(`/getsupboxnames/:jdid /:catid`, getSupBoxNames)
    .get(`/getboxandmangers/:mainid`, getsupboxmangers)
    .get(`/getmaincode/:jdid/:catid`, getMaincode)
    .get('/empappraisal', getEmpApprails)
    .post('/empappraisal', newAppraisal)
    .put('/appraisalupdate', updateAppraisal)
    .get('/getemptrans', getEmpTrans)
    .put('/updateemptrans', updateEmpTrans)
    .get('/getempedu', getEmpEdu)
    .get('/getempfamily', getEmpFamily)
    .get('/currentjd/:empid', getCurrentJD)
    .get('/availjd/:catname/:jdname', getEmpAvljd)
    .get('/getavailsupbox/:catname/:jdname', getAvailSupBox)
    .post('/postnewtrans', postnewtrans)
    .get('/getUpJd/:len/:supboxname', getUpJd)
    .get('/getempexp', getEmpExprerience)
    .post('/newempexp', newEmpExp)
    .post('/newbulktrans', postBulkTrans)

module.exports = router;