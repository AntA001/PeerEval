require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer  = require('multer');


let storageuser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/user/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})
const uploadUser = multer({ storage: storageuser });

const app = express();

app.use(express.json());
const router = new express.Router();

var loginController = require('../controllers/api/loginController');
var userController = require('../controllers/api/userController');
var courseController = require('../controllers/api/courseController');
var teamController = require('../controllers/api/teamController');
var formController = require('../controllers/api/formController');
var reviewController = require('../controllers/api/reviewController');

// Login
router.post("/api/login", loginController.login);

// Forgot Password
router.post("/api/forgot/password", loginController.forgotPassword);

// Reset Password
router.post("/api/reset/password", loginController.resetPassword);

// Reset Password
router.post("/api/update/password", auth, loginController.updatePassword);

// Register lecturer
router.post("/api/register/lecturer", userController.registerLecturer);

// Update lecturer
router.post("/api/update/lecturer", auth, userController.updateLecturer);

//Upload lecturer picture
router.post("/api/upload/profile/picture", auth, uploadUser.single('picture'), userController.uploadPictures);

// Register student
router.post("/api/register/student", userController.registerStudent);

// Update student
router.post("/api/update/student", auth, userController.updateStudent);

// create course
router.post("/api/create/course", auth, courseController.create);

// course detail for lecturer
router.get("/api/course/detail/:id", auth, courseController.detail);

// course detail for student
router.get("/api/course/detail-student/:id", auth, courseController.courseDetailStudent);

// update course
router.post("/api/update/course/:id", auth, courseController.update);

// List course
router.get("/api/course/list", auth, courseController.list);

// Delete course
router.delete("/api/delete/course/:id", auth, courseController.delete);

// Subscribe course
router.get("/api/subscribe/course-by-key/:id", auth, courseController.subscribeCourse);

// Subscribe course
router.get("/api/subscribed/courses", auth, courseController.subscribeCourseList);

// create team
router.post("/api/create/team", auth, teamController.create);

// team detail
router.get("/api/team/detail/:id", auth, teamController.detail);
router.get("/api/team/detail-with-form-status/:id/:formid", auth, teamController.detailWithFormStatus);

// update team
router.post("/api/update/team/:id", auth, teamController.update);

// assign student to tem
router.post("/api/assign/student/team/:id", auth, teamController.assignStudentTeam);

// Delete team
router.delete("/api/delete/team/:id", auth, teamController.delete);

// Course teams list
router.get("/api/course/teams/list/:id", auth, teamController.courseTeamsList);

// create form
router.post("/api/create/form", auth, formController.create);

// update form
router.post("/api/update/form/:id", auth, formController.update);

// delete form
router.delete("/api/delete/form/:id", auth, formController.delete);

// form detail student
router.get("/api/form/detail/:id", auth, formController.detail);

// form detail lecturer
router.get("/api/form/detail-lecturer/:id", auth, formController.detailForLecturer);

// form detail with team marks
router.get("/api/form/detail-team-review/:formid/:teamid", auth, formController.detailWithTeamreview);

// review detail
router.get("/api/form/reviews-detail/:formid/:studentid", auth, formController.reviewDetail);

// add review by student
router.post("/api/add/review", auth, reviewController.add);

// add review by lecturer
router.post("/api/add/team-review", auth, reviewController.addTeamReview);

//declare result
router.get("/api/add/declare-result/:formid/:teamid", auth, reviewController.declareTeamResult);


module.exports = router;