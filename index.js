const express = require("express");
const app = express();
const path = require("path");
const fs= require('fs');
const methodOverride = require('method-override');

//To convert the blob data into readable form or parser for form.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//I am giving path of my all static files e.g; images,cssfile,javascript file etc
app.use(express.static(path.join(__dirname, "public")));

//setting up ejs view where I could write html.
app.set("view engine", "ejs");
  
//Route1
app.get("/", function (req, res) {
  res.render("index");
});

//Get files route.
app.get("/files", function (req, res) {
   fs.readdir("./files", function(error, files){
         res.render("index",{files:files});
   });
  });

  //Create file route.
  app.post("/create", function (req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.details, function(error){
        res.redirect("/files");
    });
  });

// Route to handle the delete request
app.post('/delete', (req, res) => {
  // Attempt to delete the file
  fs.unlink(`./files/${req.body.title}`, (error) => {
      if (error) {
          console.error("File deletion error:", error);
          return res.status(500).send("Error deleting file.");
      }
      // On successful deletion, redirect or send response
      res.redirect('/files');
  });
});

 //Route to render the file details on show.ejs
  app.get("/file/:fileName",function(req,res){
   fs.readFile(`./files/${req.params.fileName}`, "utf-8", function(error, fileData){
    res.render("show",{fileName:req.params.fileName, fileData:fileData});
   });
  });

  //Route to edit file details
  app.get("/edit/:fileName",function(req,res){
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", function(error, fileData){
     res.render("show",{fileName:req.params.fileName, fileData:fileData});
    });
   });
//Dynamic Route
app.get("/profile/:userName/:password", function (req, res) {
  res.send(
    `Welcome, user=${req.params.userName},and Password=${req.params.password}`
  );
});
//Dynamic route2
app.get("/profile/:userName/:password/:age", function (req, res) {
  res.send(
    `Welcome, user=${req.params.userName},and Password=${req.params.password} and age=${req.params.age}`
  );
});

//
app.listen(8080);
