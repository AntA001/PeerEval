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

// add review
exports.add = async function(req, res) {
  try {
    const { reviews, course_id, team_id, form_id, rating } = req.body;

    if (!(reviews && course_id && team_id && form_id && rating)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if review exists
    const oldReview = await Review.findOne({ course_id:course_id, team_id:team_id, form_id:form_id, review_by:req.user.user_id});
    if (oldReview) {
      return res.status(409).send({"status": false,'message': "Review already given!"});
    }

    // check is Subscriber
    const isSubscriberd = await Subscriber.findOne({ course_id, subscribe_by:req.user.user_id});
    if (!isSubscriberd) {
      return res.status(409).send({"status": false,'message': "You have not enrolled in this course!"});
    }

    // check form deadline
    const isvalidForm = await Form.findOne({_id: form_id});
    if (!isvalidForm) {
      return res.status(409).send({"status": false,'message': "Not a valid Form"});
    }
    console.log(form_id);
    console.log(isvalidForm);
    console.log(isvalidForm.expire_at);
    console.log(new Date());
    if (new Date(isvalidForm.expire_at) < new Date()) {
      return res.status(409).send({"status": false,'message': "Deadline passed"});
    }

    // Create review in the database
    var review = await Review.create({
      reviews,  
      course_id, 
      team_id, 
      form_id,
      rating,
      review_by:  req.user.user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    // return new review
    res.status(201).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).send({"status": false,'message': "something went wrong!"});
  }
};

exports.addTeamReview = async function(req, res) {
  try {
    const { course_id, team_id, form_id, team_rating } = req.body;

    if (!(course_id && team_id && form_id && team_rating)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if review exists
    const oldReview = await Lacreview.findOne({ course_id:course_id, team_id:team_id, form_id:form_id, review_by:req.user.user_id});
    if (oldReview) {
      return res.status(409).send({"status": false,'message': "Review already given!"});
    }

    // check is Created
    const isCreated = await Course.findOne({ course_id, created_by:req.user.user_id});
    if (!isCreated) {
      return res.status(409).send({"status": false,'message': "This course is not Created by you!"});
    }

    // check if form exists
    const isvalidForm = await Form.findOne({_id: form_id});
    if (!isvalidForm) {
      return res.status(409).send({"status": false,'message': "Form does not exist"});
    }

    // Create lecturer review in the database
    var lacreview = await Lacreview.create({
      course_id, 
      team_id, 
      form_id,
      team_rating,
      review_by:  req.user.user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    // return new review
    res.status(201).json(lacreview);
  } catch (err) {
    console.log(err);
    return res.status(500).send({"status": false,'message': "something went wrong!"});
  }
};


exports.declareTeamResult = async function(req, res) {
  try {
    const lacreview = await Lacreview.findOne({form_id: req.params.formid, team_id: req.params.teamid, review_by: req.user.user_id});
    if(lacreview){
      const team = await Team.findOne({_id : req.params.teamid}).lean().exec();

      var studentsData = [];
      var groupMark = Number(lacreview.team_rating);
      for await (const student of team.student_ids) {
        const reviewData = await Review.find({ form_id: req.params.formid, team_id: req.params.teamid, 'reviews.student_id':student}).select('reviews');
        var NumberOfStudentsOnThatTeam = team.student_ids.length;
        var NumberOfStudentsWhoDidNotCompleteTheForm = team.student_ids.length - reviewData.length;
        var averagePointsOfTheStudent = 0;
        for await (const rev of reviewData) {
          for await (const studentData of rev.reviews) {
            if((studentData.student_id == student)){
              averagePointsOfTheStudent = averagePointsOfTheStudent + Number(studentData.review);
            }
          }
        }
        if(averagePointsOfTheStudent > 0){
          var avgMarks = averagePointsOfTheStudent/(NumberOfStudentsOnThatTeam-NumberOfStudentsWhoDidNotCompleteTheForm);
          var unAdjustedMarks = ((avgMarks/(100/NumberOfStudentsOnThatTeam))*groupMark);
          var individualStudentMark = (unAdjustedMarks*0.3)+(groupMark*0.7);
          const isreview = await Review.findOne({ form_id: req.params.formid, team_id: req.params.teamid, review_by:student});
          if(isreview){
            studentsData.push({'student_id': student, avgMarks: avgMarks, unAdjustedMarks: unAdjustedMarks, individualStudentMark: individualStudentMark});
          } else {
            individualStudentMark = (individualStudentMark * 90)/100;
            studentsData.push({'student_id': student, avgMarks: avgMarks, unAdjustedMarks: unAdjustedMarks, individualStudentMark: individualStudentMark});
          }
        } else {
          studentsData.push({'student_id': student, avgMarks: 0, unAdjustedMarks: 0, individualStudentMark: 0});
        }
      }
      const updatedData = await lacreview.updateOne({
        students_final: studentsData,
        updated_at: new Date()
      });

      const newlacreview = await Lacreview.findOne({_id: lacreview._id});

      var SubscriberData = await Subscriber.find({course_id: newlacreview.course_id});
      var FormData = await Form.findOne({_id: req.params.formid});
      var subscriber_ids = SubscriberData.map(data => { return data.subscribe_by.toString(); });
      var subscribers = await User.find({_id:{$in: subscriber_ids}}).lean().exec();
      var emails = subscribers.map(data => { return data.email; });
      if(emails.length > 0){
        let mailDetails = {
            from: MAIL_FROM,
            to: emails.join(','),
            subject: "PeerEval results announcement",
            html: '<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta name="x-apple-disable-message-reformatting"> <title></title> <!--[if mso]> <style> table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} div, td {padding:0;} div {margin:0 !important;} </style> <noscript> <xml> <o:OfficeDocumentSettings> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]--> <style> table, td, div, h1, p {font-family: Arial, sans-serif; } @media screen and (max-width: 530px) {.unsub {display: block; padding: 8px; margin-top: 14px; border-radius: 6px; background-color: #555555; text-decoration: none !important; font-weight: bold; } .col-lge {max-width: 100% !important; } } @media screen and (min-width: 531px) {.col-sml {max-width: 27% !important; } .col-lge {max-width: 73% !important; } } </style> </head> <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;"> <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ffffff;"> <table role="presentation" style="width:100%;border:none;border-spacing:0;"> <tr> <td align="center" style="padding:0;"> <!--[if mso]> <table role="presentation" align="center" style="width:600px;"> <tr> <td> <![endif]--> <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"> <tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr> <tr> <td style="padding:30px;background-color:#ffffff;"> <h1 style="margin-top:0;margin-bottom:16px;font-size:18px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Results for the coursework '+FormData.name+' have been published, please check the results in the app.</h1></td> </tr> <tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr> </table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </table> </div> </body> </html>'
        };
        MAIL.mailTransporter.sendMail(mailDetails, function(err, data) {
          // if(err) {
          //     res.status(500).json({"status": false, 'message': "Something went wrong"});
          //   } else {
          //       res.status(200).json({"status": true,'message': "Email sent Successfully"});
          //   }
        });
      }


      return res.status(201).json(newlacreview);
    } else {
      return res.status(401).send({"status": false,'message': "First add Team review!"});
    }

    
  } catch (err) {
    return res.status(500).send({"status": false,'message': "something went wrong!"});
  }
}