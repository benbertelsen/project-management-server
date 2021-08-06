
//IN THIS PROJECT WE CREATE AN API. Meaning this data is accessible for others if we put in on Heroku. The main thing we...
//..have done is to put .json

//A note on our final project. We should take this approach: Build the backend first, if we are happy with it. Then frontend.

const express = require("express");
const router = express.Router();
const Project = require("../models/Project.model");
const fileUpload = require("../config/cloudinary");

//CHECK THIS PART
function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
}

//Uploade image cloudinary
router.post("/upload", fileUpload.single("image"), (req, res) => {
  try {
  res.status(200).json({ fileUrl: req.file.path });
  } catch(e) {
    res.status(500).json({ message: `error occured $(e)` });
  }
});

//PURPOSE to get all projects 🤲
router.get("/projects", async(req, res) => {
    try {
        const allProjects = await Project.find();
        res.status(200).json(allProjects);
        } catch (e) {
        res.status(500).json({ message: `error occured ${e}`});
        }
});

//TEST THIS 👆
// 1. Go to postman
// 2. put a GET request to http://localhost:5000/api/projects

//PURPOSE 💾 to create a project to the database (mongoose), which we can also see on PostMan
router.post("/projects", async (req, res) => {
    const { title, description, imageUrl } = req.body;
    if (!title || !description ) {
        res.status(400).json({ message: "missing fields" });
        return;
    }
    try {
    const response = await Project.create({
        title,
        description,
        imageUrl
    });
    res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: "sorry, bad request"});
    }
});

//TEST THIS 👆
// 1. Go to postman
// 2. put a POST request to http://localhost:5000/api/projects
// 3. go to Body and hit the radio-btn x-www-form-urlencoded
// 4. In the table below, type in the Key column, first "title", then "description"
// 5. In the table below, type in the Value column, first "project1", then "project2 description"


//PURPOSE 🗑 is to have the API look for this _id and delete the data there
router.delete("/projects/:id", async (req, res) => {
    try {
      await Project.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: `id ${req.params.id} was deleted` });
    } catch (e) {
      res.status(500).json({ message: `error occurred ${e}` });
    }
  });

//TEST THIS  👆
// 1. Go to postman
// 2. put a DELETE request 
// 3. in the request field, put http://localhost:5000/api/projects/**THE SPECIFIC ID */
// 4. Hit SEND
// 5. Check that it is gone by going back to GET and hit SEND


//PURPOSE is to get a project by Id
router.get("/projects/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      res.status(200).json(project);
    } catch (e) {
      res.status(500).json({ message: `error occurred ${e}` });
    }
  });



//PURPOSE 🔃 is to UPDATE and project
router.put("/projects/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        await Project.findByIdAndUpdate(req.params.id, {
            title,
            description,
        });
        res.status(200).json(`id ${req.params.id} was updated`);
    } catch (e) {
        res.status(500).json({ message: `error occurred ${e}` });
    }
});

//TEST THIS  👆
// 1. Go to postman
// 2. put a PUT request 
// 3. in the request field, put http://localhost:5000/api/projects/**THE SPECIFIC ID */
// 4. Change values in the VALUE column
// 5. hit SEND

module.exports = router;