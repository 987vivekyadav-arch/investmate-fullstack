import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

import jwt from "jsonwebtoken"
import UsersModel from "./Users.js"
import verify from "./verify.js"

import MonthlyModel from "./montly.js"


const app=express()
dotenv.config()
mongoose.connect(process.env.MONGO_URI)

app.use(express.json())
app.use(cors())

{/*-------------------------------------------Register---------------------------------------------------- */}


app.post("/register",function(req,res){
    UsersModel.create(req.body)
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------Login------------------------------------------------ */}

app.post("/login",function(req,res){
    UsersModel.findOne(req.body)
    .then(function(data){
        console.log(data)
const token=jwt.sign({userid:data._id},"secret")
res.json({token:token})
    })
})

{/*-----------------------------------------------monthly-investment------------------------------------------------ */}

app.post("/monthly",verify,function(req,res){
    MonthlyModel.create({...req.body,userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------lists-investment------------------------------------------------ */}

app.get("/lists",verify,function(req,res){
    MonthlyModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------delete-investment------------------------------------------------ */}

app.delete("/delete/:id",verify,function(req,res){
    MonthlyModel.findOneAndDelete({userid:req.userid,_id:req.params.id})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})
{/*-----------------------------------------------edit-investment------------------------------------------------ */}

app.put("/edit/:id",verify,function(req,res){
    MonthlyModel.findOneAndUpdate({userid:req.userid,_id:req.params.id},req.body,{new:true})
    .then(function(data){
        console.log(data)
         res.json(data)
    })
})


{/*-----------------------------------------------date-investment------------------------------------------------ */}


app.get("/date",verify,function(req,res){
    MonthlyModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})

{/*-----------------------------------------------monthly-Charts-investment------------------------------------------------ */}

app.get("/monthlyChart",verify,function(req,res){
    MonthlyModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)
    })
})


{/*-----------------------------------------------All investment------------------------------------------------ */}

app.get("/allCharts",verify,function(req,res){
    MonthlyModel.find({userid:req.userid})
    .then(function(data){
        console.log(data)
res.json(data)})})

app.listen(5000);


