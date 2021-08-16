/*
Entry point for Application*/
const express=require('express')
const app=new express()
const mongoose=require('mongoose')
var path = require('path');
var http = require('http');
require('./db/mongoose')

const Router=require('./routes/route')
app.use(express.json())
app.use(Router)
module.exports=app;
