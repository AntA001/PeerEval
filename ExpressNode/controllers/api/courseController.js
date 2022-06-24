require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../model/user");
const Course = require("../../model/course");
const Subscriber = require("../../model/subscriber");
const Form = require("../../model/form");
const Team = require("../../model/team");
const Review = require("../../model/review");
const Lacreview = require("../../model/lacreview");

const MAIL = require("../../config/mail");
const { MAIL_FROM } = process.env;

// create course
exports.create = async function(req, res) {
  try {
    const { name, course_key } = req.body;

    if (!(name && course_key)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if Course already exist
    const oldCourse = await Course.findOne({ course_key });

    if (oldCourse) {
      return res.status(409).send({"status": false,'message': "Course Key Already Exist"});
    }

    // Create Course in the database
    var course = await Course.create({
      name,
      course_key,
      created_by:  req.user.user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    // return new course
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
};

//List of created course
exports.list = async function(req, res) {
  const course = await Course.find({ created_by: req.user.user_id }).populate({path: 'formCount'}).lean().exec();
  return res.status(200).send(course);
};


//List of subscribed Course List
exports.subscribeCourseList = async function(req, res) {
  var SubscriberData = await Subscriber.find({ subscribe_by : req.user.user_id});
  var course_ids = SubscriberData.map(data => { return data.course_id; });
  const courses = await Course.find({_id: {$in:course_ids}}).populate({path: 'formCount'}).lean().exec();
  return res.status(200).send(courses);
};

// Update course
exports.update = async function(req, res) {
  try {
    const { name} = req.body;
    if (!(name)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const CourseData = await Course.findOne({ _id:  req.params.id, created_by: req.user.user_id});
    if(CourseData){
      const user = await CourseData.updateOne({
        name,
        updated_at: new Date()
      });
      var newCourseData = await Course.findOne({ _id:  CourseData._id}).lean().exec(); 
      res.status(201).json({"status": true, 'data': newCourseData, 'message': "Updated Successfully"});
    } else {
      return res.status(409).send({"status": false,'message': "Something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete course
exports.delete = async function(req, res) {
  try {
    const recipe = await Course.deleteOne({ _id:  req.params.id, created_by : req.user.user_id});
    if(recipe.deletedCount == 0){
      return res.status(201).json({"status": false, 'message': "Something went wrong!"});
    }
    return res.status(201).json({"status": true, 'message': "Deleted Successfully"});
  } catch (err) {
    console.log(err);
  }
};

// Subscribe course
exports.subscribeCourse = async function(req, res) {
  try {
    const CourseData = await Course.findOne({ course_key:  req.params.id});
    if (CourseData) {
      const oldSubscriber = await Subscriber.findOne({ course_id:  CourseData._id, subscribe_by : req.user.user_id});

      if (oldSubscriber) {
        return res.status(409).send({"status": false,'message': "Already Subscribed"});
      }
      // Create Subscriber in the database
      var subscriber = await Subscriber.create({
        course_id:  CourseData._id,
        subscribe_by:  req.user.user_id,
        created_at: new Date(),
        updated_at: new Date()
      });

      // return new subscriber
      res.status(201).json(subscriber);
    } else {
      return res.status(409).send({"status": false,'message': "Course not found"});
    }
    
  } catch (err) {
    console.log(err);
  }
};

// Course detail
exports.detail = async function(req, res) {
  try {
    const course = await Course.findOne({_id : req.params.id}).lean().exec();
    var SubscriberData = await Subscriber.find({course_id: course._id});
    var subscriber_ids = SubscriberData.map(data => { return data.subscribe_by.toString(); });
    course.subscribers = await User.find({_id:{$in: subscriber_ids}}).lean().exec();
    course.subscribers.forEach(async element => {
      var student_id = element._id.toString();
      element.teamDetail = await Team.findOne({course_id: course._id, student_ids:{$in: [student_id]}});
    });
    course.forms = await Form.find({course_id: course._id}).lean().exec();
    course.teams = await Team.find({course_id: course._id});
    var studentsInTeams = [];
    var studentsNotInTeams = [];
    for await (const team of course.teams) {
      for await (const student of team.student_ids) {
        if(!studentsInTeams.includes(student)){
          studentsInTeams.push(student);
        }
      }
    }
    for await (const subscriber of subscriber_ids) {
      if(!studentsInTeams.includes(subscriber)){
          studentsNotInTeams.push(subscriber);
      }
    }

    course.subscriberNotInTeam = await User.find({_id:{$in: studentsNotInTeams}}).lean().exec();;
    return res.status(200).send(course);
  } catch (err) {
    console.log(err);
  }
};

// Course detail Forms
exports.courseDetailStudent = async function(req, res) {
  try {
    const course = await Course.findOne({_id : req.params.id}).lean().exec();
    var subscriber_ids = [];
    course.teams = await Team.findOne({course_id: course._id, student_ids: req.user.user_id});
    course.forms = await Form.find({course_id: course._id}).populate({path: 'status',match: { review_by:req.user.user_id }}).lean().exec();
    for await (const form of course.forms) {
      form.isResultDeclare = false;
      form.finalMarks = null;
      if(course.teams){
        const oldReview = await Lacreview.findOne({ course_id: course._id, team_id:course.teams._id, form_id:form._id});
        if(oldReview){
          console.log(oldReview);
          form.isResultDeclare = true;
          for await (const marks of oldReview.students_final) {
            if(marks.student_id == req.user.user_id){
              form.finalMarks = marks.individualStudentMark;
            }
          }
        }
      }
    }
    return res.status(200).send(course);
  } catch (err) {
    console.log(err);
  }
};