import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

import {User} from "../models/User.js"

import tryCatch from "../middleware/tryCatch.js"
import  {
    isPhone,
    isPassword,
    isEmail,
  }  from "../utils/validation.js";

import Error from "../utils/error.js"

export const signup = tryCatch(async (req, res, next)=>{
    let data = req.body
    let {
        firstname,
        lastname,
        email,
        phone,
        password,
        confirmPassword,
    } = data

  if (!firstname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`First Name only contain letters`, 400));
  }
  data.firstname = firstname[0].toUpperCase() + firstname.slice(1);

  if (!lastname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`Last Name only contain letters`, 400));
  }
  data.lastname = lastname[0].toUpperCase() + lastname.slice(1);
  if (!isPhone(phone)) {
    return next(new Error(`Please provide Indian valid number`, 400));
  }
  if (!isEmail(email)) {
    return next(new Error(`Email is not valid`, 400));
  }

  const isEmailUnique = await User.findOne({ email });
  if (isEmailUnique) {
    return next(new Error(`This email is already registered`, 400));
  }

  if (!isPassword(password)) {
    return next(
      new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
    );
  }
  if (password != confirmPassword) {
    return next(new Error(`password is not matching`, 400));
  }
  data.password = await bcrypt.hash(password, 12);
  data.confirmPassword = data.password;
 

  const saveData = await User.create(data);

  let token = jwt.sign({_id:saveData._id}, process.env.JWT_SECRET)
  const options = {
    httpOnly:true,
    expires: new Date(Date.now()+10*24*60*60*1000)
}

  return res.status(201).cookie("token",token, options).send({ success: true, data: saveData, token:token
 }); 

})

export const login = tryCatch(async (req,res,next)=>{
  let logindata = req.body
  let {email, password} = logindata

  let user = await User.findOne({email})
  if(!user) {
    return next(new Error("user not found", 404))
  }
  let validPassword = await bcrypt.compare(password, user.password)
  let token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

  const options = {
    httpOnly:true,
    expires: new Date(Date.now()+10*24*60*60*1000)
}

  return res.status(200).cookie("token",token, options).send({status:true,data:{userId:user._id, token}})

})

export const logout = tryCatch(async (req,res,next)=>{
  res.status(200)
        .cookie("token", null , {
          expires: new Date(Date.now())
        })
        .send({success:true, message:"Logged out successfully"})
})


export const updateUser = tryCatch(async (req, res, next) => {
  const data = req.body;

  const user = await User.findOne(req.user._id);
  if (!user) {
    return next(new Error(`user not found`, 404));
  }
  const updatedObj = {};
  if (data.firstname) {
    if (!data.firstname.match(/^[a-zA-Z]{2,20}$/)) {
      return next(new Error(`First Name only contain letters`, 400));
    }
    updatedObj.firstname =
      data.firstname[0].toUpperCase() + data.firstname.slice(1);
  }
  if (data.lastname) {
    if (!data.lastname.match(/^[a-zA-Z]{2,20}$/)) {
      return next(new Error(`Last Name only contain letters`, 400));
    }
    updatedObj.lastname =
      data.lastname[0].toUpperCase() + data.lastname.slice(1);
  }
 
  
  if (data.email) {
    if (!isEmail(data.email)) {
      return next(new Error(`Email is not valid`, 400));
    }
    const isEmailUnique = await userModel.findOne({ email: data.email });
    if (isEmailUnique) {
      return next(new Error(`This email is already registered`, 400));
    }
    updatedObj.email = data.email;
  }
 
  if (data.password) {
    if (!isPassword(data.password)) {
      return next(
        new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
      );
    }
    if (data.password != data.confirmPassword) {
      return next(new Error(`password is not matching`, 400));
    }
    updatedObj.password = await bcrypt.hash(data.password, 12);
    updatedObj.confirmPassword = updatedObj.password;
  }
  

  const updateCustomerObject = await User.findOneAndUpdate(
    req.user._id ,
    updatedObj,
    { new: true }
  );
  return res.status(200).send({ success: true, data: updateCustomerObject });
});

export const getUser = tryCatch(async (req,res)=>{
  const user = await User.findOne(req.user._id);
  if (!user) {
    return next(new Error(`user not found`, 404));
  }

  return res.status(200).send({
    success: true,
    data: user,
  });
})