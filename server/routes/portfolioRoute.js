const router = require("express").Router();
const {
  Intro,
  About,
  Project,
  Contact,
  Academic,
  Experience,
  Course,
  Permission,
} = require("../model/portfolioModel");
const User = require("../model/userModel");

// get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    const academics = await Academic.find();
    const experiences = await Experience.find();
    const courses = await Course.find();

    res.status(200).send({
      intros: intros[0],
      about: abouts[0],
      projects: projects,
      contact: contacts[0],
      academics: academics,
      experiences: experiences,
      courses: courses,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update intro
router.post("/update-intro", async (req, res) => {
  try {
    const intros = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: intros,
      success: true,
      message: "Intro updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update about

router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add Academic

router.post("/add-academic", async (req, res) => {
  try {
    const academic = new Academic(req.body);
    // console.log(experience);
    await academic.save();
    res.status(200).send({
      data: academic,
      success: true,
      message: "Academic added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: "Failed to add Academic",
      error: error.message,
    });
  }
});

//update Academic

router.post("/update-academic", async (req, res) => {
  try {
    const academic = await Academic.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: academic,
      success: true,
      message: "Academic updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete Academic

router.post("/delete-academic", async (req, res) => {
  try {
    const academic = await Academic.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: academic,
      success: true,
      message: "Academic Delete succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add experience

router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    // console.log(experience);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: "Failed to add experience",
      error: error.message,
    });
  }
});

//update experience

router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete Experience

router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience Delete succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add projects

router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    console.log(project);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: "Failed to add Project",
      error: error.message,
    });
  }
});

//update projects

router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete projects

router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: project,
      success: true,
      message: "Project Delete succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//add course

router.post("/add-course", async (req, res) => {
  try {
    const course = new Course(req.body);
    console.log(course);
    await course.save();
    res.status(200).send({
      data: course,
      success: true,
      message: "Course added successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message: "Failed to add Project",
      error: error.message,
    });
  }
});

//update course

router.post("/update-course", async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: course,
      success: true,
      message: "Course updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete course

router.post("/delete-course", async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.body._id });

    res.status(200).send({
      data: course,
      success: true,
      message: "Course Delete succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// update contact

router.post("/update-contact", async (req, res) => {
  try {
    const about = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updated succesfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// admin login
router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successfully",
      });
    } else {
      res.status(200).send({
        data: user,
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
