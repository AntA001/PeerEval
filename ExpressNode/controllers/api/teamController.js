require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../model/user");
const Course = require("../../model/course");
const Subscriber = require("../../model/subscriber");
const Team = require("../../model/team");
const Review = require("../../model/review");
const Lacreview = require("../../model/lacreview");

const MAIL = require("../../config/mail");
const { MAIL_FROM } = process.env;

// create team
exports.create = async function(req, res) {
  try {
    const { name, course_id , student_ids} = req.body;

    if (!(name && course_id && student_ids)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // Create team in the database
    var team = await Team.create({
      name,
      created_by:  req.user.user_id,
      course_id,
      student_ids,
      created_at: new Date(),
      updated_at: new Date()
    });

    // return new team
    res.status(201).json(team);
  } catch (err) {
    console.log(err);
  }
};

// Update team
exports.update = async function(req, res) {
  try {
    const { name, student_ids} = req.body;
    if (!(name && student_ids)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const TeamData = await Team.findOne({ _id:  req.params.id, created_by: req.user.user_id});
    if(TeamData){
      const user = await TeamData.updateOne({
        name,
        student_ids,
        updated_at: new Date()
      });
      var newTeamData = await Team.findOne({ _id:  TeamData._id}).lean().exec(); 
      res.status(201).json({"status": true, 'data': newTeamData, 'message': "Updated Successfully"});
    } else {
      return res.status(409).send({"status": false,'message': "Something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

// assign Student to Team
exports.assignStudentTeam = async function(req, res) {
  try {
    const {  student_id} = req.body;
    if (!(student_id)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const TeamData = await Team.findOne({ _id:  req.params.id, created_by: req.user.user_id});
    if(TeamData){
      await Team.updateOne({ course_id: TeamData.course_id }, {
          $pullAll: {
              student_ids: [student_id],
          },
      });
      TeamData.student_ids.push(student_id);
      TeamData.updated_at =  new Date();
      await TeamData.save()

      var newTeamData = await Team.findOne({ _id:  TeamData._id}).lean().exec(); 
      res.status(201).json({"status": true, 'data': newTeamData, 'message': "Assign Successfully"});
    } else {
      return res.status(409).send({"status": false,'message': "Something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete team
exports.delete = async function(req, res) {
  try {
    const team = await Team.deleteOne({ _id:  req.params.id, created_by : req.user.user_id});
    if(team.deletedCount == 0){
      return res.status(201).json({"status": false, 'message': "Something went wrong!"});
    }
    return res.status(201).json({"status": true, 'message': "Deleted Successfully"});
  } catch (err) {
    console.log(err);
  }
};

// Course Team List
exports.courseTeamsList = async function(req, res) {
  try {
    const teams = await Team.find({ course_id:  req.params.id}).lean().exec(); 
    
    return res.status(200).send(teams);
  } catch (err) {
    console.log(err);
  }
};

// Team details
exports.detail = async function(req, res) {
  try {
    const teams = await Team.findOne({_id : req.params.id}).lean().exec();
    teams.students = await User.find({_id: {$in: teams.student_ids}});
    return res.status(200).send(teams);
  } catch (err) {
    console.log(err);
  }
};

// Team details in the form
exports.detailWithFormStatus = async function(req, res) {
  try {
    const teams = await Team.findOne({_id : req.params.id}).lean().exec();
    teams.students = await User.find({_id: {$in: teams.student_ids}}).populate({path: 'reviewOnForm', match: { form_id: req.params.formid }}).lean().exec();

    const lacreview = await Lacreview.findOne({form_id: req.params.formid, team_id: req.params.id}).select({_id:0, students_final:1});
    for await (const student of teams.students) {
      student.finalMarks = null;
      if(lacreview){
        for await (const marks of lacreview.students_final) {
          if(marks.student_id == student._id.toString()){
            student.finalMarks = marks.individualStudentMark;
          }
        }
      }
    }
    return res.status(200).send(teams);
  } catch (err) {
    console.log(err); 
  }
};
