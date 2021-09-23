import React, { Fragment } from "react";
import {
    getEmpDetails, getUpJd, getEmpAppraisal, getEmpNameByName
} from "../../actions/Actions";
import { getEmpTrans, getEmpExp, getEmpFamily, getEmpEdu } from "../../actions/TransActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, FormLabel, FormControl, FormText, FormCheck, Button, Row, Col } from 'react-bootstrap';


class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            add: false, edit: false, showNamesResults: false, addEmpId: "", addEmpName: "", addContractType: "", addDoc: "", addRetirementDate: "", addDoj: "",
            addStation: "", addArea: "", addGovern: "", addJS: "", addEmpNid: "",
            addPOIssuance: "", addDOIssuance: "", addinsuranceNum: "", addinsuranceOffice: "", addAddress: "", addMPhoneNum: "",
            addHPhoneNum: "", addOPhoneNum: "", addEmail: "", addMarStatus: "", addSyndicateType: "", addMemberShipNum: "",
            addMemberShipDate: "", addMirStatus: "", addDaysCountMir: "", addMonthsCountMir: "", addYearsCountMir: "", ExmpExpireDate: "",
            addSexType: "", addReligous: "", addDob: "", addPob: "", addGob: "", milStatusIsTempEx: false, milStatusIsCompleted: false,
            syndicateAdded: false, confirmAdd: "", mainUpdateQuery: [], jtUpdateQuery: [], apUpdateQuery: ""
        };
    }

    changeHandler = (e) => {
        if (e.target.getAttribute("colName") == "APPRAISAL") {
            if (e.target.value.length < 1) {
                this.setState({
                    apUpdateQuery: ""
                })
            }
            else if (e.target.value.length > 0) {
                this.setState({
                    apUpdateQuery: `${e.target.getAttribute("colName")} = (SELECT APPRAISAL_ARABIC FROM appraisal WHERE APPRAISAL ${e.target.value})`
                })
            }
        }
        else if (e.target.getAttribute("colName") == "TRANS_DATE" || e.target.getAttribute("colName") == "MAIN_BOX_NAME" ||
            e.target.getAttribute("colName") == "JOB_ASSIGNMENT_FORM" || e.target.getAttribute("colName") == "SUP_BOX_NAME" 
                    ) {
            if (e.target.value.length < 1) {
                let removedArrOfJt = [...this.state.jtUpdateQuery]
                if (removedArrOfJt.findIndex(s => s.includes(e.target.getAttribute("colName"))) != -1) {
                    let removedIndex = removedArrOfJt.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    removedArrOfJt.splice(removedIndex, 1)
                    this.setState({
                        jtUpdateQuery: removedArrOfJt
                    })
                }
            } else if (e.target.value.length > 0) {
                let newArrOfJt = [...this.state.jtUpdateQuery]
                if (newArrOfJt.findIndex(s => s.includes(e.target.getAttribute("colName"))) != -1) {
                    if (e.target.getAttribute("colName") == "TRANS_DATE") {
                        let updatedIndexOfNew = newArrOfJt.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfJt[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = "${e.target.value}"`
                        this.setState({
                            jtUpdateQuery: newArrOfJt
                        })
                    }
                    if(e.target.getAttribute("colName") == "MAIN_BOX_NAME"){
                        let updatedIndexOfNew = newArrOfJt.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfJt[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = "${e.target.value}"`
                        this.setState({
                            jtUpdateQuery: newArrOfJt
                        })
                    }
                    
                }else{
                    if (e.target.getAttribute("colName") == "TRANS_DATE") {
                        let newArr = [...this.state.jtUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = "${e.target.value}"`)
                        this.setState({
                            jtUpdateQuery: newArr
                        })
                    }
                }
            }
        } else {
            if (e.target.value.length < 1) {
                console.log(this.state.mainUpdateQuery);
                let removedArrOfApQ = [...this.state.mainUpdateQuery]
                if (removedArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName"))) != -1) {
                    let removedIndex = removedArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    removedArrOfApQ.splice(removedIndex, 1)
                    this.setState({
                        mainUpdateQuery: removedArrOfApQ
                    })
                }
            } else if (e.target.value.length > 0) {
                let newArrOfApQ = [...this.state.mainUpdateQuery]
                if (newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName"))) != -1) {
                    if (e.target.getAttribute("colName") == "JOB_GOVERNORATE") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "EMP_STATUS") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "ADDRESS_GOVERNORATE") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "MARITAL_STATUS") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "SYNDICATE") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "GENDER") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GENDER FROM genders WHERE GENDER_NAME = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "RELIGION") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                    else if (e.target.getAttribute("colName") == "GOVERNORATE_OF_BIRTH") {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    } else {
                        let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                        newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = ${e.target.value}`
                        this.setState({
                            mainUpdateQuery: newArrOfApQ
                        })
                    }
                } else {
                    if (e.target.getAttribute("colName") == "JOB_GOVERNORATE") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "EMP_STATUS") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "ADDRESS_GOVERNORATE") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "MARITAL_STATUS") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "SYNDICATE") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "GENDER") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT GENDER FROM genders WHERE GENDER_NAME = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "RELIGION") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }
                    else if (e.target.getAttribute("colName") == "GOVERNORATE_OF_BIRTH") {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    } else {
                        let newArr = [...this.state.mainUpdateQuery]
                        newArr.push(`${e.target.getAttribute("colName")} = ${e.target.value}`)
                        this.setState({
                            mainUpdateQuery: newArr
                        })
                    }

                }
            }

        }

    }

    clickHandler = (e) => {
        this.setState({
            edit: true
        })
    }


    handleArrToSend = (e) => {
        let state = this.state
        let addedSyndicate = this.state.syndicateAdded ? 'added' : ''
        let organization = `(30`
        let empid = state.addEmpId
        let empname = `"${state.addEmpName}"`
        let contractType = `(SELECT CONTRACT_TYPE FROM contract_type WHERE CONTRACT_TYPE_ARABIC = "${state.addContractType}")`
        let doc = `"${state.addDoc}"`
        let addStation = `"${state.addStation}"`
        let addArea = `"${state.addArea}"`
        let addGovern = `(SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${state.addGovern}")`
        let addJS = `(SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${state.addJS}")`
        let addEmpNid = `${state.addEmpNid}`
        let addPOIssuance = `"${state.addPOIssuance}"`
        let addDOIssuance = `"${state.addDOIssuance}"`
        let addinsuranceNum = `"${state.addinsuranceNum}"`
        let addinsuranceOffice = `"${state.addinsuranceOffice}"`
        let addAddress = `"${state.addAddress}"`
        let addMPhoneNum = `"${state.addMPhoneNum}"`
        let addHPhoneNum = `"${state.addHPhoneNum}"`
        let addOPhoneNum = `"${state.addOPhoneNum}"`
        let addEmail = `"${state.addEmail}"`
        let addMarStatus = `(SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${state.addMarStatus}")`
        let addSyndicateType = `(SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${state.addSyndicateType}")`
        let addMemberShipNum = `"${state.addMemberShipNum}"`
        let addMemberShipDate = `"${state.addMemberShipDate}"`
        let addMirStatus = `(SELECT MILITARY_SERVICE_STATUS FROM military_service_status WHERE STATUS_ARABIC ="${state.addMirStatus}")`
        let addDaysCountMir = `"${state.addDaysCountMir}"`
        let addMonthsCountMir = `${state.addMonthsCountMir}`
        let addYearsCountMir = `${state.addYearsCountMir}`
        let addRetirementDate = `"${state.addRetirementDate}"`
        let addSexType = `(SELECT GENDER FROM genders WHERE GENDER_NAME = "${state.addSexType}")`
        let addReligous = `(SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${state.addReligous}")`
        let addDob = `"${state.addDob}"`
        let addPob = `"${state.addPob}"`
        let addGob = `"${state.addGob}")`

        let data = [
            addedSyndicate, organization, empid, empname, contractType, doc, addStation, addArea, addGovern
            , addJS, addEmpNid, addPOIssuance, addDOIssuance, addinsuranceNum, addinsuranceOffice, addAddress,
            addMPhoneNum, addHPhoneNum, addOPhoneNum, addEmail, addMarStatus, this.state.syndicateAdded ? addSyndicateType : '', this.state.syndicateAdded ? addMemberShipNum : '',
            this.state.syndicateAdded ? addMemberShipDate : '', addMirStatus, this.state.milStatusIsCompleted ? addDaysCountMir : '', this.state.milStatusIsCompleted ? addMonthsCountMir : '', this.state.milStatusIsCompleted ? addYearsCountMir : '', addRetirementDate, addSexType,
            addReligous, addDob, addPob, addGob
        ]

        if (
            state.addEmpId.length < 1 || state.addEmpName.length < 1 || state.addContractType.length < 1 || state.addDoc.length < 1 || state.addStation.length < 1 || state.addArea.length < 1 || state.addGovern.length < 1 || state.addJS.length < 1 ||
            state.addEmpNid.length < 1 || state.addPOIssuance.length < 1 || state.addDOIssuance.length < 1 || state.addinsuranceNum.length < 1 ||
            state.addinsuranceOffice.length < 1 || state.addAddress.length < 1 || state.addMPhoneNum.length < 1 || state.addHPhoneNum.length < 1 ||
            state.addOPhoneNum.length < 1 || state.addEmail.length < 1 || state.addMarStatus.length < 1 || (state.syndicateAdded && (state.addSyndicateType.length < 1 ||
                state.addMemberShipNum.length < 1 || state.addMemberShipDate.length < 1)) || (state.milStatusIsCompleted && (state.addMirStatus.length < 1 || state.addDaysCountMir.length < 1 ||
                    state.addMonthsCountMir.length < 1 || state.addYearsCountMir.length < 1)) || (state.milStatusIsTempEx && state.ExmpExpireDate.length < 1) || state.addRetirementDate.length < 1 || state.addSexType.length < 1 ||
            state.addReligous.length < 1 || state.addDob.length < 1 || state.addPob.length < 1 || state.addGob.length < 1
        ) {

            console.log('inputs are not completed');

        } else if (state.addEmpNid.length !== 14) {
            console.log('رقم البطاقة غير صحيح');

            this.setState({
                messege: "رقم البطاقة غير صحيح"
            })

        } else {
            axios({
                method: "POST",
                data,
                withCredentials: true,
                url: "http://localhost:5000/insertnewemp",
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                console.log(res.data);

            })
            this.setState({
                confirmAdd: true, finalData: data
            })
        }
    }



    addButtonHandler = (e) => {
        this.setState({
            add: true
        })
    }

    addEmpIdHandler = (e) => {
        this.setState({
            addEmpId: e.target.value
        })
    }


    addEmpNameHandler = (e) => {
        this.setState({
            addEmpName: e.target.value
        })
    }

    addContractTypeHandler = (e) => {
        this.setState({
            addContractType: e.target.value
        })
    }

    addDocHandler = (e) => {
        this.setState({
            addDoc: e.target.value
        })
    }

    addStationHandler = (e) => {
        this.setState({ addStation: e.target.value })

    }

    addAreaHandler = (e) => {
        this.setState({ addArea: e.target.value })

    }

    addGovernHandler = (e) => {
        this.setState({ addGovern: e.target.value })

    }

    addJSHandler = (e) => {
        this.setState({ addJS: e.target.value })

    }

    addEmpNidHandler = (e) => {
        this.setState({ addEmpNid: e.target.value })

    }

    addPOIssuanceHandler = (e) => {
        this.setState({ addPOIssuance: e.target.value })

    }

    addDOIssuanceHandler = (e) => {
        this.setState({ addDOIssuance: e.target.value })

    }

    addinsuranceNumHandler = (e) => {
        this.setState({ addinsuranceNum: e.target.value })

    }

    addinsuranceOfficeHandler = (e) => {
        this.setState({ addinsuranceOffice: e.target.value })

    }

    addAddressHandler = (e) => {
        this.setState({ addAddress: e.target.value })

    }

    addMPhoneNumHandler = (e) => {
        this.setState({ addMPhoneNum: e.target.value })

    }

    addHPhoneNumHandler = (e) => {
        this.setState({ addHPhoneNum: e.target.value })

    }

    addOPhoneNumHandler = (e) => {
        this.setState({ addOPhoneNum: e.target.value })

    }

    addEmailNumHandler = (e) => {
        this.setState({ addEmail: e.target.value })

    }

    addMarStatusNumHandler = (e) => {
        this.setState({ addMarStatus: e.target.value })

    }

    addSyndicateTypeNumHandler = (e) => {
        this.setState({ addSyndicateType: e.target.value })

    }

    addMemberShipNumHandler = (e) => {
        this.setState({ addMemberShipNum: e.target.value })

    }

    addMemberShipDateHandler = (e) => {
        this.setState({ addMemberShipDate: e.target.value })

    }

    addMirStatusHandler = (e) => {
        if (e.target.value == "ادي الخدمه العسكرية") {
            this.setState({
                milStatusIsCompleted: true,
                milStatusIsTempEx: false
            })
        } else if (e.target.value == "معاف مؤقت") {
            this.setState({
                milStatusIsTempEx: true,
                milStatusIsCompleted: false
            })
        } else {
            this.setState({
                milStatusIsCompleted: false,
                milStatusIsTempEx: false
            })
        }
        this.setState({ addMirStatus: e.target.value })

    }

    addDaysCountMirHandler = (e) => {
        this.setState({ addDaysCountMir: e.target.value })
    }

    addMonthsCountMirHandler = (e) => {
        this.setState({ addMonthsCountMir: e.target.value })
    }

    addYearsCountMirHandler = (e) => {
        this.setState({ addYearsCountMir: e.target.value })
    }

    addExmpExpireDate = (e) => {
        this.setState({
            ExmpExpireDate: e.target.value
        })
    }

    addRetirementDateHandler = (e) => {
        this.setState({ addRetirementDate: e.target.value })
    }

    addSexTypeHandler = (e) => {
        this.setState({ addSexType: e.target.value })
    }

    addReligousHandler = (e) => {
        this.setState({ addReligous: e.target.value })
    }

    addDobHandler = (e) => {
        this.setState({ addDob: e.target.value })
    }

    addPobHandler = (e) => {
        this.setState({ addPob: e.target.value })
    }


    addGobHandler = (e) => {
        this.setState({ addGob: e.target.value })
    }

    /* _____________________________________________________ */






    empidHandler = (e) => {
        if (e.key === 'Enter') {

            this.props.getEmpDetails(e.target.value)

        }
    }


    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        if (e.key === 'Enter') {
            this.props.getEmpAppraisal("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }

    namesOptionshandler = (e) => {
        this.refs.nameinput.value = ''
        this.props.getEmpDetails('', e.target.value)

        this.setState({ showNamesResults: false })
    }


    empEduButtonHandler = (e) => {
        this.props.getEmpEdu(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
    }

    empTransButtonHandler = (e) => {
        this.props.getEmpTrans(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
        this.props.getUpJd(10, this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null)
    }

    empFamilyButtonHandler = (e) => {
        this.props.getEmpFamily(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null)
    }

    empAppraisalHandler = (e) => {
        this.props.getEmpAppraisal(this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null, "", "")

    }

    empExpHandler = (e) => {
        this.props.getEmpExp("", this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null)

    }

    ds = (e) => {
        this.setState({
            syndicateAdded: false
        })
    }

    addSyndicateHandler = (e) => {
        this.setState({
            syndicateAdded: true
        })
    }




    render() {
        console.log(this.state.mainUpdateQuery);
        let marStatus = ["اعزب",
            "متزوج",
            "متزوج ويعول",
            "ارمل ويعول",
            "مطلق",
            "أرمل",
            "مطلق ويعول "
        ]
        let militaryStatus = ["لعدم اللياقة البدنية", "اعفاء من الخدمة العامة", "غير معروف", "ادي الخدمه العسكرية", "لم يصبه الدور", "مجند", "معاف مؤقت", "اعفاء نهائى", "أدى الخدمة العامة", "تحت الطلب", "ضابط عامل", "مستثنى من الخدمة", "عسكري سابق", "مستدعى", "تخلف عن التجنيد", "أمين شرطة سابقا", "ضابط سابق في شرطة"]
        let governorate = ["القاهرة", "الاسكندرية", "بورسعيد", "السويس", "البحرالاحمر", "الـوادى الجديد", "مرسى مطروح", "جنوب سيناء", "الاسماعيلية", "البحيرة", "الدقهليـة", "الشرقية", "الغربيـة", "كفرالشيخ", "القليوبيـة", "المنوفيـة", "دميـاط", "الجـيزة", "الفيـوم", "بنى سويف", "المنيـا", "اسيـوط", "سوهاج", "قنـا", "اسوان", "شمال سيناء", "الاقصر", "حلوان", "دول خارجية", "غيرمعروفه"]
        let station = ['الاستاد',
            'الإسكندرية',
            'الدخيلة',
            'الزقازيق',
            'الزهور',
            'السويس',
            'الشهداء',
            'العاشر من رمضان',
            'العجمى',
            'العريش',
            'العمرانية',
            'الفيوم',
            'القبارى',
            'الكابلات',
            'المرج',
            'المروة',
            'المطرية',
            'المعادي',
            'المعصرة',
            'المنصورة 1',
            'المنصورة 2',
            'المنيا',
            'النزهة الجديدة',
            'النهضة',
            'الهرم',
            'الوراق',
            'أبورواش',
            'أسو القطامية',
            'أسو سافوى',
            'ألماظة',
            'بنها',
            'بني سويف',
            'توتال - العوايد',
            'توتال - المطار',
            'جراج العجمي',
            'جراج القطامية',
            'جراج المعادى',
            'جراج محرم بك',
            'جميلة - العوايد',
            'دمنهور',
            'رشدى -وسط البلد',
            'رشدي',
            'سفنكس',
            'سموحة',
            'سوهاج',
            'سيدي بشر',
            'سيدي بشر 2',
            'شبرا',
            'شبين',
            'شبين الكوم',
            'شبين الكوم 1',
            'شطا',
            'شهداء',
            'شيبرد',
            'طنطا',
            'عز الدين',
            'عين شمس',
            'فيصل',
            'قبضايا',
            'مبارك',
            'مجلس الوزراء',
            'مدينة نصر',
            'مصدق',
        ]
        let area = ["شرق", "غرب", "الصعيد", "الدلتا", "الأسكندرية", "القناة"]
        let emp_status = ['على قوة العمل',
            'أستقالة',
            'موقوف',
            'فصل',
            'معاش',
            'معاش مبكر',
            'وفاه',
            'أجازة بدون مرتب',
            'معار',
            'منتدب',
            'نقل',
            'إيقاف للتجنيد',
            'تفرغ',
            'عجز كلي',
            'نقل بقرار وزاري',
            'تعيين شركات شقيقة',
            'إعارة من الشركات للعمل بالشركة',
            'ندب من الشركات للعمل بالشركة',
            'تكليف من الشركات للعمل بالشركة',
        ]
        let syndicate = ['التجاريين',
            'الصحفين',
            'المهندسين',
            'نقابة المهن الاجتماعية',
            'نقابة الأطباء البشرين',
            'اطباء الاسنان',
            'نقابة الأطباء البيطرين',
            'النقابة العامة للنقل البحري',
            'نقابة التطبيقين',
            'البترول',
            'فنون تطبيقية',
            'التمريض',
            'نقابة الصيادلة',
            'الزراعيين                                        ',
            'العلميين',
            'المعلميين',
            'المحامين',
            'العامه للنقل البرى',
            'العلاج الطبيعى',
            'نقابة الفنانين التشكيلين',
            'المهن التعليمية',
            'المهن الرياضية',
            'نقابة المهن الصناعية',
            'المهنيين',
            'النقابة العامة للعاملين بالصناعات الهندسية والمعدن...',
            'العاملين بصناعات البناء والأخشاب',
            'غير محـدد له النقـابه',
            'نقابه الطيارين المدنيين المصريه',
            'النقابة العامة للنقل الجوي',
            'نقابة العاملين بهندسة صيانة الطائرات',
        ]
        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "55%",
            height: 250,
            backgroundColor: "#fff",
            color: "#212529",
            fontSize: "2rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            appearance: "none",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"

        }
        return (
            <div id="page-wrapper">

                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span>بيانات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.empidHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" id="empname" className="form-control" onKeyDown={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header"><span ref="empname">{this.props.empdetails ? this.props.empdetails.length ? ` الإسم :  ${this.props.empdetails[0].NAME_ARABIC} -  رقم الأداء :${this.props.empdetails[0].EMPLOYEE_ID}` : null : null}</span> <span></span> </h1>
                        {this.state.showNamesResults ?
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                                    {this.props.empNameByName.map((name => (
                                        <option>{name.NAME_ARABIC}</option>
                                    )))}
                                </select>
                            </div> : null}

                        {this.state.add ?
                            <div className="col-lg-8">
                                <div className="data-wrapper" style={{ background: "transparent", height: "100%", width: "100%" }} >
                                    <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">رقم الأداء</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpIdHandler} ref="nameinput" className="form-control giant-input" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable"> الإسم</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNameHandler} ref="nameinput" className="form-control giant-input oneInputMargin" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >نوع العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addContractTypeHandler} className="form-control giant-input oneInputMargin" list="brow12" />
                                                <datalist id="brow12">
                                                    <option value="أخرى" />
                                                    <option value="دائم" />
                                                    <option value="عقد محدد المده" />
                                                    <option value="مكافأه شامله" />
                                                    <option value="عقد عمل بنظام على مشروع" />
                                                    <option value="معار" />
                                                    <option value="منتدب" />
                                                    <option value="عقد عمال مياومة شركات قطاع" />
                                                    <option value="عقد تدريب" />
                                                    <option value="عقد عمال مياومة من خارج القطاع" />

                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>

                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >تاريخ العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDocHandler} className=" form-control medium-input" type="date" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addRetirementDateHandler} className="form-control  medium-input" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >المحطة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addStationHandler} className="form-control medium-small-input" list="brow1" />
                                                <datalist id="brow1">
                                                    {station.map(stat => (
                                                        <option value={stat} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable threeMediumSmallInputsLableMargin">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addAreaHandler} className="form-control medium-small-input" list="brow2" />
                                                <datalist id="brow2">
                                                    {area.map(er => (
                                                        <option value={er} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable threeMediumSmallInputsLableMargin">المحافظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {/* <input onChange={this.addGovernHandler} className="form-control  medium-small-input" type="text" /> */}
                                                <input onChange={this.addGovernHandler} className="form-control medium-small-input" list="brow3" />
                                                <datalist id="brow3">
                                                    {governorate.map(gov => (
                                                        <option value={gov} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >الحالة الوظيفية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addJSHandler} className="form-control giant-input oneInputMargin" list="brow4" />
                                                <datalist id="brow4">
                                                    {emp_status.map(empstatus => (
                                                        <option value={empstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >الرقم القومي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNidHandler} className="form-control medium-medium-input" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">جهة الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPOIssuanceHandler} className="form-control  medium-medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDOIssuanceHandler} className="form-control  medium-medium-input" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">الرقم التأميني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceNumHandler} className="form-control medium-input" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">مكتب التأمينات</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceOfficeHandler} className="form-control medium-input" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addAddressHandler} className="form-control giant-input oneInputMargin" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >ت. المنزل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addHPhoneNumHandler} className="form-control medium-medium-input" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">ت. المكتب</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addOPhoneNumHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الموبايل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMPhoneNumHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">البريد الأليكتروني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmailNumHandler} className="form-control medium-input" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">الحالة الإجتماعية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMarStatusNumHandler} className="form-control medium-input" type="text" list="brow90" />
                                                <datalist id="brow90">
                                                    {marStatus.map(marstatus => (
                                                        <option value={marstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.syndicateAdded ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <i onClick={this.ds} class="fas fa-minus" ></i>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" style={{ marginLeft: -14 }}>نوع النقابة</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addSyndicateTypeNumHandler} className="form-control medium-medium-input" list="brow50" />
                                                    <datalist id="brow50">
                                                        {syndicate.map(synd => (
                                                            <option value={synd} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable">رقم العضوية</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMemberShipNumHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable">تاريخ العضوية </label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMemberShipDateHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin" type="date" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    {this.state.syndicateAdded == false ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >إضافة نقابة</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <i onClick={this.addSyndicateHandler} style={{ marginTop: 10 }} class="fas fa-plus" ></i>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >الموقف من التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <select onChange={this.addMirStatusHandler} id="empapp" className="form-control medium-select oneInputMargin">
                                                    {militaryStatus.map(status => (
                                                        <option>{status}</option>
                                                    ))}
                                                    <option selected>اختر</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.milStatusIsTempEx ?

                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >تاريخ انتهاء الإعفاء</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addExmpExpireDate} className="form-control giant-input oneInputMargin" type="date" />
                                                </div>
                                            </div>
                                        </div>

                                        :
                                        null
                                    }

                                    {this.state.milStatusIsCompleted ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >مدة التجنيد</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addDaysCountMirHandler} placeholder="يوم" className="form-control  medium-medium-input" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMonthsCountMirHandler} placeholder="شهر" className="form-control  medium-medium-input" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addYearsCountMirHandler} placeholder="سنة" className="form-control  medium-medium-input" type="number" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">النوع</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addSexTypeHandler} className="form-control medium-input" list="brow5" />
                                                <datalist id="brow5">
                                                    <option value='ذكر' />
                                                    <option value='أنثى' />
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin">الديانة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addReligousHandler} className="form-control medium-input" list="brow6" />
                                                <datalist id="brow6">
                                                    <option value='مسلم' />
                                                    <option value='مسيحي' />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >تاريخ الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDobHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin" type="date" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">جهة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPobHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">محافظة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addGobHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin" list="brow3" />
                                                <datalist id="brow3">
                                                    {governorate.map(gov => (
                                                        <option value={gov} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <button style={{ marginRight: 100, marginTop: 20, width: 650 }} onClick={this.handleArrToSend} className="btn btn-primary btn-block">إضافة</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div className="col-lg-8">
                                <div className="data-wrapper" style={{ background: "transparent", height: "100%", width: "100%" }} >
                                    <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">رقم الأداء</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control small-input" onChange={this.changeHandler} colName={'EMPLOYEE_ID'} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null} readOnly={!this.state.edit} type="number" />
                                            </div>

                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin" >الإسم</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input ref="nameinput" className="form-control medium-input" onChange={this.changeHandler} colName={"NAME_ARABIC"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >تاريخ العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"SECTOR_JOIN_DATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">تاريخ التعيين</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"TRANS_DATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الوظيفة الحالية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"MAIN_BOX_NAME"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SUP_BOX_NAME : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">طريقة شغلها</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"JOB_ASSIGNMENT_FORM"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].WOG : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الإدارة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"SUP_BOX_NAME"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].cat_name : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">المحطة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {this.state.edit ?
                                                    <input className="form-control  small-input" colName={"JOB_LOCATION"} onChange={this.changeHandler} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} readOnly={!this.state.edit} type="text" />
                                                    :
                                                    <input className="form-control  small-input" colName={"JOB_LOCATION"} onChange={this.changeHandler} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} readOnly={!this.state.edit} type="text" />
                                                }
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable threeSmallLableMargin">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" onChange={this.changeHandler} colName={"JOB_AREA"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_AREA : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable threeSmallLableMargin">المحافظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {/* <input className="form-control  small-input" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].jobGov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                <input className="form-control small-input" list="brow300" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].jobGov : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow300">
                                                    {governorate.map(gov => (
                                                        <option value={gov} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الحالة الوظيفية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>

                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"EMP_STATUS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].empstatusar : null : null} readOnly={!this.state.edit} type="text" list="brow450" />
                                                <datalist id="brow450">
                                                    {emp_status.map(empstatus => (
                                                        <option value={empstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">تقييم العام</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {this.state.edit ?
                                                    <input className="form-control medium-input" onChange={this.changeHandler} colName={"APPRAISAL"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].APPRAISAL_ARABIC : null : null} readOnly={!this.state.edit} type="text" />
                                                    :
                                                    <input className="form-control medium-input" onChange={this.changeHandler} colName={"APPRAISAL"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].APPRAISAL_ARABIC : null : null} readOnly={!this.state.edit} type="text" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الرقم القومي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-medium-input" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_NO"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NATIONAL_ID_CARD_NO : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">المنطقة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_ISSUED_BY"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NATIONAL_ID_CARD_ISSUED_BY : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">المحافظة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {/* <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                <input className="form-control medium-medium-input" list="brow300" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow300">
                                                    {governorate.map(gov => (
                                                        <option value={gov} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الرقم التأميني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"SOCIAL_INSURANCE_NUMBER"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SOCIAL_INSURANCE_NUMBER : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">مكتب التأمينات</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"INSURANCE_OFFICE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].INSURANCE_OFFICE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"ADDRESS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].ADDRESS : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">ت. المنزل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>

                                                {this.state.edit ?

                                                    <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_2_HOME"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_2_HOME : null : null} readOnly={!this.state.edit} type="text" />

                                                    :
                                                    <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_2_HOME"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_2_HOME : null : null} readOnly={!this.state.edit} type="text" />

                                                }
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">ت. المكتب</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {this.state.edit ?
                                                    <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_OFFICE : null : null} readOnly={!this.state.edit} type="text" />
                                                    :
                                                    <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_1_OFFICE : null : null} readOnly={!this.state.edit} type="text" />
                                                }
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الموبايل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_3_MOBILE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PHONE_3_MOBILE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">البريد الأليكتروني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" onChange={this.changeHandler} colName={"EMP_EMAIL"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMP_EMAIL : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">الحالة الإجتماعية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {/* <input className="form-control medium-input" onChange={this.changeHandler} colName={"MARITAL_STATUS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].maritalstatear : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                <input className="form-control medium-input" type="text" list="brow90" onChange={this.changeHandler} colName={"MARITAL_STATUS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].maritalstatear : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow90">
                                                    {marStatus.map(marstatus => (
                                                        <option value={marstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">نوع النقابة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                {/* <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].syndicatear : null : null} readOnly={!this.state.edit} type="text" /> */}
                                                <input className="form-control medium-medium-input" list="brow50" onChange={this.changeHandler} colName={"SYNDICATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].syndicatear : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow50">
                                                    {syndicate.map(synd => (
                                                        <option value={synd} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">رقم العضوية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SYNDICATE_REGISTERATION : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ العضوية </label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION_DATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SYNDICATE_REGISTERATION_DATE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">موقف التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input  className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">النوع</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" list="brow5" onChange={this.changeHandler} colName={"GENDER"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].genderar : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow5">
                                                    <option value='ذكر' />
                                                    <option value='أنثى' />
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin">الديانة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-input" list="brow6" onChange={this.changeHandler} colName={"RELIGION"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].religinar : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow6">
                                                    <option value='مسلم' />
                                                    <option value='مسيحي' />
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">تاريخ الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"BIRTH_DATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].BIRTH_DATE : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">جهة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PLACE_OF_BIRTH"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].PLACE_OF_BIRTH : 'لاتوجد بيانات' : 'لاتوجد بيانات'} readOnly={!this.state.edit} type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">محافظة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" list="brow3" onChange={this.changeHandler} colName={"GOVERNORATE_OF_BIRTH"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].birthGov : null : null} readOnly={!this.state.edit} type="text" />
                                                <datalist id="brow3">
                                                    {governorate.map(gov => (
                                                        <option value={gov} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        <div style={{ display: "flex", height: "100%", minHeight: "1000px" }} className="col-lg-4">
                            <div style={{ background: "transparent", height: 750, width: "100%" }} >
                                <img style={{ borderTop: 3 }} src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empedudeg`}><a onClick={this.empEduButtonHandler} href="/empedudeg">المؤهل</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg" ><Link to={`/EmpTrans`}><a onClick={this.empTransButtonHandler} href="/EmpTrans">التدرج</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empexperience`}><a onClick={this.empExpHandler} href="/empexperience">الخبرات</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empfamily`}><a onClick={this.empFamilyButtonHandler} href="/empfamily">العائلية</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">التدريب</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">الجزاءات</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">الهيكل</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">بطاقة الوصف</button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg"><Link to={`/empsappraisal`}><a onClick={this.empAppraisalHandler} href="/empsappraisal">التقييمات السنوية</a></Link></button>
                                    <button style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170 }} type="button" class="btn btn-outline btn-lg">طباعة البيانات الوظيفية</button>
                                    <button onClick={this.clickHandler} style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170, background: "#4f4f63", color: "white" }} type="button" class="btn btn-outline btn-lg btn-primary">تعديل البيانات</button>
                                    <button onClick={this.addButtonHandler} style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170, background: "#4f4f63", color: "white" }} type="button" class="btn btn-outline btn-lg btn-primary">إضافة موظف جديد</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>



            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        empdetails: state.posts.empdetails,
        empNameByName: state.posts.empNameByName,
    };
};
export default connect(mapStateToProps, {
    getEmpDetails, getEmpTrans, getUpJd, getEmpAppraisal, getEmpEdu, getEmpFamily, getEmpNameByName, getEmpExp
})(Employee);