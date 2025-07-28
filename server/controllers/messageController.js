import Message from '../models/msgModel.js'
import Conversation from '../models/conversationModel.js'
import { asyncHandler } from '../utils/async/asyncHandler.js';
import {appError} from '../utils/errors/app-error.js';
import { getSocketId, io } from '../socket/socket.js'

export const sendMessage = asyncHandler(async(req , res , next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if(!senderId || !receiverId || !message){
    return next(new appError("All feilds are required" , 400));
  }

  let conversation = await Conversation.findOne({
    participants: {$all : [senderId , receiverId]},
  })

  if(!conversation){
    conversation = await Conversation.create({
      participants: [senderId , receiverId],
    })
  }

  const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
  });

  if(newMessage){
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage" , newMessage);

  res.status(200).json({
    success: true,
    responseData: {
      newMessage,
    }
  })

 })

export const getMessage = asyncHandler(async (req , res , next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if(!myId || !otherParticipantId){
    return next(new appError("All feilds are required" , 400));
  }

  let conversation = await Conversation.findOne({
    participants: {$all : [myId , otherParticipantId]},
  }).populate("messages")

  res.status(200).json({
    success: true,
    responseData: {
      conversation,
    }
  })

})