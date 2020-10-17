//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require (__dirname + "/date.js");

const app = express();

const items = ["Buy food", "Cook Food", "Eat Food"]; // will increased by size 1 and new item get pushed to the end of the array and now we able to render list again and pass over the now updated array with all of our list items
const workItems = [];

app.set('view engine', 'ejs'); //embeded javascript module to render the list folder for views
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//===================== First load up a Home Page, will load on this block codes ====================//
app.get("/", function(req, res)
{
    let day = date.getDate(); //can change to getDay

    res.render("list", {listTitle: day, newListItems: items}); //get pass to list.ejs under the var newListItem

  });

//==========================================POST=======================================================//
app.post("/", function(req, res) { //get from method post on list.ejs

    let item = req.body.newItem; //the data inputted from the list.ejs stored on var item and add them to items below then push them

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
  }else{
    items.push(item); //after this we redirect to the home route as below.
    res.redirect("/");
  }

});

app.get("/work", function(req, res)

  { res.render("list", {listTitle: "Work List", newListItems: workItems});  });


app.get("/aboutus", function(req, res)
  { res.render("aboutus");} );

app.listen(3000, function() {

  console.log("Server is running o n port 3000");

});
