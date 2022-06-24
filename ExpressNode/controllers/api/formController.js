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

// create form
exports.create = async function(req, res) {
  try {
    const { name, course_id, expire_at } = req.body;

    if (!(name && course_id && expire_at)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // Create form in the database
    var form = await Form.create({
      name,
      course_id,
      created_by:  req.user.user_id,
      expire_at,
      created_at: new Date(),
      updated_at: new Date()
    });

    var SubscriberData = await Subscriber.find({course_id: course_id});
    var CourseData = await Course.findOne({_id: course_id});
    var subscriber_ids = SubscriberData.map(data => { return data.subscribe_by.toString(); });
    var subscribers = await User.find({_id:{$in: subscriber_ids}}).lean().exec();
    var emails = subscribers.map(data => { return data.email; });
    if(emails.length > 0){
      let mailDetails = {
          from: MAIL_FROM,
          to: emails.join(','),
          subject: "PeerEval new assignment available",
          html: '<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta name="x-apple-disable-message-reformatting"> <title></title> <!--[if mso]> <style> table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} div, td {padding:0;} div {margin:0 !important;} </style> <noscript> <xml> <o:OfficeDocumentSettings> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]--> <style> table, td, div, h1, p {font-family: Arial, sans-serif; } @media screen and (max-width: 530px) {.unsub {display: block; padding: 8px; margin-top: 14px; border-radius: 6px; background-color: #555555; text-decoration: none !important; font-weight: bold; } .col-lge {max-width: 100% !important; } } @media screen and (min-width: 531px) {.col-sml {max-width: 27% !important; } .col-lge {max-width: 73% !important; } } </style> </head> <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;"> <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ffffff;"> <table role="presentation" style="width:100%;border:none;border-spacing:0;"> <tr> <td align="center" style="padding:0;"> <!--[if mso]> <table role="presentation" align="center" style="width:600px;"> <tr> <td> <![endif]--> <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"> <tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr> <tr> <td style="padding:30px;background-color:#ffffff;"> <h1 style="margin-top:0;margin-bottom:16px;font-size:18px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">You have been assigned a new evaluation form for the course '+CourseData.name+'. Please check your available forms in the app and make sure you complete them before their deadline.</h1></td> </tr> <tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr> </table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </table> </div> </body> </html>'
      };
      MAIL.mailTransporter.sendMail(mailDetails, function(err, data) {
        // if(err) {
        //     res.status(500).json({"status": false, 'message': "Something went wrong"});
        //   } else {
        //       res.status(200).json({"status": true,'message': "Email sent Successfully"});
        //   }
      });
    }

    // return new form
    res.status(201).json(form);
  } catch (err) {
    console.log(err);
  }
};

// Update form
exports.update = async function(req, res) {
  try {
    const { name, expire_at } = req.body;

    if (!(name && expire_at)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const FormData = await Form.findOne({ _id:  req.params.id, created_by: req.user.user_id});
    if(FormData){
      const user = await FormData.updateOne({
        name,
        expire_at,
        updated_at: new Date()
      });
      var newFormData = await Form.findOne({ _id:  FormData._id}).lean().exec(); 
      res.status(201).json({"status": true, 'data': newFormData, 'message': "Updated Successfully"});
    } else {
      return res.status(409).send({"status": false,'message': "Something went wrong"});
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete form
exports.delete = async function(req, res) {
  try {
    const form = await Form.deleteOne({ _id:  req.params.id, created_by : req.user.user_id});
    if(form.deletedCount == 0){
      return res.status(201).json({"status": false, 'message': "Something went wrong!"});
    }
    return res.status(201).json({"status": true, 'message': "Deleted Successfully"});
  } catch (err) {
    console.log(err);
  }
};


// form details
exports.detail = async function(req, res) {
  try {
    const form = await Form.findOne({_id : req.params.id}).lean().exec();
    const oldReview = await Review.findOne({ course_id:form.course_id, form_id: form._id, review_by:req.user.user_id});
    if (oldReview) {
      form.status = 1;
    } else {
      form.status = 0;
    }
    form.teamDetail = await Team.findOne({course_id: form.course_id, student_ids:{$in: [req.user.user_id]}});
    if(form.teamDetail){
      form.teamMembers = await User.find({_id:{$in: form.teamDetail.student_ids}}).lean().exec();
    } else {
      form.teamMembers = null;
    }
    return res.status(200).send(form);
  } catch (err) {
    console.log(err);
  }
};

// form details for lec
exports.detailForLecturer = async function(req, res) {
  try {
    const form = await Form.findOne({_id : req.params.id}).lean().exec();
    form.teams = await Team.find({course_id: form.course_id}).lean().exec();
      for await (const element of form.teams) {
        element.marks = null;
        element.assignmarks = null;
        element.isDeclared = false;
        element.isvalidToMark = false;
        
        
        var isGivenByAll = true;
        for await (const student of element.student_ids) {
         const oldReview = await Review.findOne({ course_id:form.course_id, form_id: form._id, review_by:student});
          if (!oldReview) {
            isGivenByAll = false;
          }
        }

        var assignmarks = await Lacreview.findOne({ team_id: element._id, course_id:form.course_id, form_id: form._id, review_by:req.user.user_id});
        if(assignmarks){
          if(assignmarks.students_final.length > 0){
            element.isDeclared = true;
          }
        }
        if(assignmarks){
          element.assignmarks = assignmarks.team_rating;
        }
        if(new Date(form.expire_at) < new Date()  && !assignmarks){
          element.isvalidToMark = true;
        } else if(new Date(form.expire_at) > new Date()  && !assignmarks && isGivenByAll){
          element.isvalidToMark = true;
        }

      }
    //}
    return res.status(200).send(form);
  } catch (err) {
    console.log(err);
  }
};

// form details with team reviews
exports.detailWithTeamreview = async function(req, res) {
  try {
    var form = await Form.findOne({_id : req.params.formid}).lean().exec();
    form.teamDetail = await Team.findOne({course_id: form.course_id, _id : req.params.teamid}).lean().exec();
    form.teamMembers = await User.find({_id:{$in: form.teamDetail.student_ids}}).populate({path: 'status',match: { course_id: form.course_id, team_id: req.params.teamid } }).lean().exec();
    return res.status(200).send(form);
  } catch (err) {
    console.log(err);
  }
};




// review details
exports.reviewDetail = async function(req, res) {
  try {
    var reviewData = await Review.findOne({ form_id: req.params.formid, review_by: req.params.studentid}).lean().exec();
    var students = [];
    if(reviewData){
      await reviewData.reviews.forEach(async element => {
        students.push(element.student_id);
      });
    
      reviewData.students = await User.find({_id:{$in: students}}).lean().exec();
      await reviewData.students.forEach(async element => {
        element.review = null;
        reviewData.reviews.map(function(e){
        if(e.student_id == element._id){ 
            element.review = e.review;
          }
        });
      })
    }
    return res.status(200).send(reviewData);
  } catch (err) {
    console.log(err);
  }
};
