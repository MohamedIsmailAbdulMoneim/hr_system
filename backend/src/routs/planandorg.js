const express = require("express");
const db = require("../database/connection")

let router = express.Router();

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
        console.log('hit');
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
    let query = `SELECT a_sup_box.MAIN_BOX_ID AS main_manager ,emp_sup_box.MAIN_BOX_ID AS main_emp, a_sup_box.VAC_NOT, a_sup_box.ACTIV_NOT, emp_sup_box.SUP_BOX_NAME AS emp, a_sup_box.SUP_BOX_NAME AS manager, a_sup_box.sup_box_id as manager_box_id, emp_sup_box.sup_box_id as emp_box_id from a_sup_box JOIN emp_sup_box on emp_sup_box.SUP_BOX_ID_P = a_sup_box.SUP_BOX_ID WHERE emp_sup_box.MAIN_BOX_ID = ${mainid}`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            if(details.length<1){
                db.query(`SELECT MAIN_BOX_ID , VAC_NOT, ACTIV_NOT, SUP_BOX_NAME as emp, SUP_BOX_ID AS emp_box_id FROM a_sup_box WHERE MAIN_BOX_ID = ${mainid}`,(err, anotherdetails)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send(anotherdetails)
                    }
                })
            }else{
                res.send(details);

            }

        }
    })
}



router
    .get('/getjobdgbycat/:catid', getJobDgByCat)

    .get(`/getsupboxnames/:jdid/:catid`, getSupBoxNames)

    .get(`/getboxandmangers/:mainid`, getsupboxmangers)

    .get(`/getmaincode/:jdid/:catid`, getMaincode)





module.exports = router;