const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , 'public')));
app.set('view engine' , 'ejs');

app.get("/", (req, res)=>
{
    fs.readdir(`./files` , (err , files)=>{
        res.render("index" , {files : files}); //we use res.render when we need to render ejs pages ande index in views
    })
})

app.post("/create", (req, res)=>
{
    fs.readdir(`./files` , (err , files)=>{
        res.render("index" , {files : files}); //we use res.render when we need to render ejs pages ande index in views
    })
})

app.listen(3000);