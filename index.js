const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { log } = require('console');

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

app.post("/", (req, res)=>
{
    fs.readdir(`./files` , (err , files)=>{
        res.render("index" , {files : files}); //we use res.render when we need to render ejs pages ande index in views right files is the data in file folder and left is the varible to access that file
    })
})

app.get("/file/:filename", (req, res)=>
{
        fs.readFile(`./files/${req.params.filename}` , "utf-8" , (err , filedata)=>{
            res.render('show' , {filename: req.params.filename , filedata: filedata});
        })    
});

app.get("/edit/:filename", (req, res)=>
{
            res.render('edit' , {filename: req.params.filename});   
});

app.post("/edit", (req, res)=>
{
            fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}`, (err)=>{
                res.redirect("/");
            })
              
});

app.post("/create", (req, res)=>
{
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details , (err)=>{
        res.redirect("/")
    });

    
})    
app.listen(3000);