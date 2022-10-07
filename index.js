const express = require("express");
const bodyParser = require("body-parser");
const engine = require("ejs-mate");
const app = express();
const port = process.env.PORT || 3000;

const projects = require("./seeds/Projects")

app.engine("ejs", engine);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));



app.get("/", (req, res) => {
  res.render("index", {projects});
});

app.get("/:projectName", (req, res) => {
  // console.log(req.params.projectName);
//   console.log(projects);
for (const project of projects) {
  // console.log('project', project);
  if(req.params.projectName===project.title){
    // console.log('project found', project);
    return res.render("ProjectView", {project});
  }
  
}
// projects.forEach(project=>{
//   // console.log('project',project.name)
  
  
// })
 res.redirect("/")

// console.log(projects);

  
});

app.get("/projects/all", (req, res)=>{
  res.render("Projects", {projects})
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
