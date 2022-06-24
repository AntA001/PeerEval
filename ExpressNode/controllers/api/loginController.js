require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const MAIL = require("../../config/mail");
const { MAIL_FROM } = process.env;
const { FRONTEND_URL } = process.env;

const User = require("../../model/user");

// Login student and lecturer
exports.login = async function(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({"status": false,'message': "All input is required"});
    }
    // Validate if user exist in the database

    var user = await User.findOne({ email }).lean().exec();  


    if (user && !user.is_verify) {
      return res.status(400).send({"status": false, "message": "Please verify Your email first"});
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role},
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json({"status": true, "data": user});
    }
    return res.status(400).send({"status": false, "message": "Invalid Credentials"});
  } catch (err) {
    console.log(err);
  }
};

// Forgot Password student and lecturer
exports.forgotPassword = async function(req, res) {
  try {
      // Get user input
      const { email} = req.body;

      // Validate user input
      if (!(email)) {
        res.status(400).send({"status": false,'message': "All input is required"});
      }

      var user = await User.findOne({ email });  


      if(user){
        const rendomNumber = Math.floor(Math.random()*90000) + 10000;
        const userData = await user.updateOne({
          reset_password_code: rendomNumber
        });

        let mailDetails = {
            from: MAIL_FROM,
            to: email,
            subject: 'PeerEval Password Reset',
            html:'<!DOCTYPE html> <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <meta name="x-apple-disable-message-reformatting"> <title></title> <!--[if mso]> <style> table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} div, td {padding:0;} div {margin:0 !important;} </style> <noscript> <xml> <o:OfficeDocumentSettings> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript> <![endif]--> <style> table, td, div, h1, p {font-family: Arial, sans-serif; } @media screen and (max-width: 530px) {.unsub {display: block; padding: 8px; margin-top: 14px; border-radius: 6px; background-color: #555555; text-decoration: none !important; font-weight: bold; } .col-lge {max-width: 100% !important; } } @media screen and (min-width: 531px) {.col-sml {max-width: 27% !important; } .col-lge {max-width: 73% !important; } } </style> </head> <body style="margin:0;padding:0;word-spacing:normal;background-color:#ffffff;"> <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ffffff;"> <table role="presentation" style="width:100%;border:none;border-spacing:0;"> <tr> <td align="center" style="padding:0;"> <!--[if mso]> <table role="presentation" align="center" style="width:600px;"> <tr> <td> <![endif]--> <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;"> <tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr> <tr> <td style="padding:30px;background-color:#ffffff;"> <h1 style="margin-top:0;margin-bottom:16px;font-size:18px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Password reset request received. Please follow below link to reset your password.</h1> <p style="margin:0;"><a href="'+FRONTEND_URL+'reset-password?email='+email+'&otp='+rendomNumber+'" style="color:#3c44b1;">Click Here</a></p> </td> </tr><tr> <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;"> </td> </tr></table> <!--[if mso]> </td> </tr> </table> <![endif]--> </td> </tr> </table> </div> </body> </html>'
        };
        MAIL.mailTransporter.sendMail(mailDetails, function(err, data) {
          if(err) {
              console.log(err);
              res.status(500).json({"status": false, 'message': "Something went wrong"});
            } else {
                res.status(200).json({"status": true,'message': "Email send Successfully"});
            }
        });
      } else {
        res.status(400).json({"status": false,'message': "Not a valid user!"});
      }


  } catch (err) {
    console.log(err);
  }
};


// Reset Password student and lecturer
exports.resetPassword = async function(req, res) {
  try {
      // Get user input
      const { email, reset_code, new_password} = req.body;

      // Validate user input
      if (!(email && new_password && reset_code)) {
        res.status(400).send({"status": false,'message': "All input is required"});
      }

      var user = await User.findOne({ email:email, reset_password_code:reset_code });  

      if(user){
        
        encryptedPassword = await bcrypt.hash(new_password, 10);
        const userData = await user.updateOne({
          password: encryptedPassword
        });
        res.status(200).json({"status": true,'message': "Updated Successfully"});
      } else {
        res.status(400).json({"status": false,'message': "Not a valid user or code!"});
      }


  } catch (err) {
    console.log(err);
  }
};


// Update Password student and lecturer
exports.updatePassword = async function(req, res) {
  try {
      // Get user input
      const { old_password, new_password} = req.body;

      // Validate user input
      if (!(old_password && new_password)) {
        res.status(400).send({"status": false,'message': "All input is required"});
      }

      var user = await User.findOne({ _id:  req.user.user_id});  

      if(user){
        bcrypt.compare(old_password, user.password, async function(err, resDa) {
          if (resDa){
            encryptedPassword = await bcrypt.hash(new_password, 10);
            const userData = await user.updateOne({
              password: encryptedPassword
            });
            res.status(200).json({"status": true,'message': "Updated Successfully"});
          } else {
            res.status(400).json({"status": false,'message': "Old password not matched!"});
          }
            
        });
      } else {
        res.status(400).json({"status": false,'message': "Not a valid user or code!"});
      }

  } catch (err) {
    console.log(err);
  }
};
