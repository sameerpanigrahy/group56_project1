const { request } = require("express")
const { exists } = require("../model/authorsModel")
const authorModel = require("../model/authorsModel")
const { isValidMail, ischarCode } = require("../validator/validator")


const creatAuthor = async function (req, res) {
    try {
        let object = req.body
        let objectlength = Object.keys(object)
        if (objectlength == 0) {
            return res.status(400).send({ msg: "Body is Mandatory" })
        }
        if (!object.fname || !object.lname || !object.title || !object.email || !object.password) {
            return res.status(400).send({ status: false, msg: "Body missing a mandatory fild" })
        }
        
        if(object.title!='Mr'&&object.title!='Mrs'&&object.title!='Miss') return res.status(406).send({status:false,msg:"title can contain only 'Mr', 'Mrs', 'Miss'-"})

        if (!isValidMail(object.email)) return res.send({ msg: "mail id is not valid" })

        let emailId = await authorModel.findOne({ email: object.email }).select({ email: 1, _id: 0 })
        if (emailId) return res.status(400).send({ msg: "This Author Allrady exists" })
        let createAuthor = await authorModel.create(object)
        res.status(201).send({ msg: createAuthor })
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

}



module.exports.creatAuthor = creatAuthor