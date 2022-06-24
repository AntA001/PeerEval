require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../model/user");

const MAIL = require("../../config/mail");
const { MAIL_FROM } = process.env;

// Register user
exports.registerLecturer = async function(req, res) {
  try {
    // Get user input
    const { fullname, email, password, university } = req.body;

    // Validate user input
    if (!(email && password && fullname && university)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if user already exist
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({"status": false,'message': "Email Already Exist. Please Login"});
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    var user = await User.create({
      fullname,
      university,
      role:'lecturer',
      is_verify:true,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user = user.toJSON();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

// Update user
exports.updateLecturer = async function(req, res) {
  try {
    const { fullname, university} = req.body;
    if (!(fullname && university)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const UserData = await User.findOne({ _id:  req.user.user_id});
    const user = await UserData.updateOne({
      fullname,
      university,
      updated_at: new Date()
    });
    var newUserData = await User.findOne({ _id:  req.user.user_id}).lean().exec(); 
    res.status(201).json({"status": true, 'data': newUserData, 'message': "Updated Successfully"});
  } catch (err) {
    console.log(err);
  }
};


// Register Student
exports.registerStudent = async function(req, res) {
  try {
    // Get user input
    const { fullname, email, password, registration_number } = req.body;

    // Validate user input
    if (!(email && password && fullname && registration_number)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }

    // check if user already exists
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({"status": false,'message': "Email Already Exist. Please Login"});
    }
    
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    var user = await User.create({
      fullname,
      registration_number,
      role:'student',
      is_verify:true,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user = user.toJSON();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

// Update user
exports.updateStudent = async function(req, res) {
  try {
    const { fullname, registration_number} = req.body;
    if (!(fullname && registration_number)) {
      return res.status(400).send({"status": false,'message': "All input is required"});
    }
    const UserData = await User.findOne({ _id:  req.user.user_id});
    const user = await UserData.updateOne({
      fullname,
      registration_number,
      updated_at: new Date()
    });
    var newUserData = await User.findOne({ _id:  req.user.user_id}).lean().exec(); 
    res.status(201).json({"status": true, 'data': newUserData, 'message': "Updated Successfully"});
  } catch (err) {
    console.log(err);
  }
};

// picture
exports.uploadPictures = async function(req, res) {
  try {
    const UserData = await User.findOne({ _id:  req.user.user_id});
    const user = await UserData.updateOne({
      pictures: "user/"+req.file.filename,
      updated_at: new Date()
    });
    var newUserData = await User.findOne({ _id:  req.user.user_id}).lean().exec(); 
    res.status(201).json({"status": true, 'data': newUserData, 'message': "Updated Successfully"});
  } catch (err) {
    console.log(err);
  }
};