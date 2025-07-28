import User from '../models/userModel.js'
import { asyncHandler } from '../utils/async/asyncHandler.js';
import {appError} from '../utils/errors/app-error.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/common/token.js';

export const register = asyncHandler(async (req , res , next) => {
  const { fullName , userName , password , gender } = req.body;

    if(!fullName || !userName || !password || !gender){
      return next(new appError("All feild are required", 400));
    }

    const user = await User.findOne({userName});

    if(user){
      return next(new appError("User already Exist", 400));
    }

    const hashPassword = await bcrypt.hash(password , 10);

    const avatarType = gender === "male" ? "boy" : "girl";
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?userName=${userName}`;

    const newUser = await User.create({
      userName,
      fullName,
      password : hashPassword,
      gender,
      avatar,
    })

    const tokenData = {
      _id : newUser?._id
    };

    const token = generateToken(tokenData);

    res
  .status(200)
  .cookie("token", token, { 
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), 
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  })
  .json({
    success: true,
    responseData: {
      newUser,
      token, 
    },
  });

});

export const login = asyncHandler(async (req , res , next) => {
  const {userName , password} = req.body;

    if(!userName || !password){
      return next(new appError("Please Enter a valid username and password" , 400));
    }

    const user = await User.findOne({userName});

    if(!user){
      return next(new appError("Please Enter a valid username and password", 400) );
    }

    const isValid = await bcrypt.compare(password , user.password);

    if(!isValid){
      return next(new appError("Please Enter a valid username and password", 400));
    }

    const tokenData = {
      _id : user?._id
    };

    const token = generateToken(tokenData);

    res
  .status(200)
  .cookie("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), 
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  })
  .json({
    success: true,
    responseData: {
      user,
      token, 
    },
  });

});

export const getProfile = asyncHandler(async(req , res , next) => {
  const userId = req.user._id;
  const profile = await User.findById(userId);
  res.status(200).json({
    success: true,
    responseData: profile,
  });

})

export const logout = asyncHandler(async(req , res) => {
  res
  .status(200)
  .cookie("token", "", {
    expires: new Date(Date.now()), 
    httpOnly: true,
  })
  .json({
    success: true,
    message: "Logout succesful",
  });
});

export const getOtherUser = asyncHandler(async(req , res , next) => {
  const otherUsers = await User.find({_id: {$ne: req.user._id}});
  res.status(200).json({
    success: true,
    responseData: {
      otherUsers,
    }
  })
})