import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const SendMsg = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [msg, setMsg] = useState('');

  const handleOnchange = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMsg = async () => {
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

  // Optionally: allow Enter to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMsg();
    }
  };

  return (
    <div className="w-full flex gap-2 pb-2">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full"
        value={msg}
        onChange={handleOnchange}
        onKeyDown={handleKeyDown} // optional: send on Enter
      />
      <button
        className="btn btn-square btn-outline btn-primary"
        onClick={handleSendMsg}
        disabled={!msg.trim()}
      >
        <IoSend />
      </button>
    </div>
  );
};

export default SendMsg;
