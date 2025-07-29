import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const SendMsg = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [msg , setMsg] = useState('');

  const handleOnchange = (e) => {
    setMsg(e.target.value);
  }

  const handleSendMsg = async () => {
  console.log("Selected User:", selectedUser);           // Debug log
  console.log("Message to send:", msg);                  // Debug log

  if (!selectedUser || !selectedUser._id) {
    return toast.error("Please select a user to send a message to.");
  }

  if (!msg.trim()) {
    return toast.error("Message cannot be empty.");
  }

  dispatch(sendMessageThunk({
    receiverId: selectedUser._id,
    message: msg.trim(),
  }));

  setMsg('');
};

  return (
    <div className="w-full flex gap-2 pb-2">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full"
        onChange={handleOnchange}
      />
      <button className="btn btn-square btn-outline btn-primary" onClick={handleSendMsg}>
        <IoSend />
      </button>
    </div>
  );
};

export default SendMsg;
