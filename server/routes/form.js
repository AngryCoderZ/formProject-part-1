const express = require("express")
const formidable = require("formidable")
const fs = require("fs")

const User = require("../model/form")
const router = express.Router();

const formData = (req,res)=>{
const form = new formidable.IncomingForm()
form.parse(req,(err,fields,file)=>{
    if(err){
       return res.status(400).json({error: err})
    }
   if(!fields.name||!fields.email||!file.photo){
    return res.status(400).json({error: "Fill all the fields"})
   }

const user = new User(fields)
if(file.photo){
    if(file.photo.size>400000){
        return res.status(400).json({error:"file size is too big"})
    }
    user.photo.data = fs.readFileSync(file.photo.filepath)
    user.photo.contentType = file.photo.mimetype

    user.save((err,result)=>{
        if(err){
            return res.status(400).json({error: err})
         }
    })
    res.json({user})
}
}) 
   
}


router.post("/",formData)

module.exports = router; 