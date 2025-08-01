
import { asynchandler } from "../utils/asynchandler.js";
import {ApiErrors} from "../utils/ApiErrors.js"
import {User} from"../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser= asynchandler(async(req,res)=>{
  // get user details from frontend
  // validation- not empty
  // check if user already exists:username,email
  // check for images,check for avatar
  // upload them to cloudinary,avatar
  // create user objects-create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const {fullname,email,username,password}=req.body
  console.log("email:",email);
  if(
    [fullname,email,username,password].some((field)=>
      field?.trim()==="" )
  ){
    throw new ApiErrors(400,"all if required")
  }
 const existedUser= User.findOne({
    $or:[{username},{email}]
  })
  if(existedUser){
    throw new ApiErrors(409,"User with email or username already exists")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath){
    throw new ApiErrors(400,"Avatar file is required")
  }
 
  const avatar=  await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImageLocalPath)
   if(!avatar){
     throw new ApiErrors(400,"Avatar file is required")
   }
  const user=await  User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })
  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiErrors(500,"Something went wrong while registering user")
  }
  return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully")
  )
  
})

export {registerUser}