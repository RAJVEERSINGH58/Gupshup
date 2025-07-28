import React, { useEffect } from "react";
import User from "./User";
import Msg from "./Msg";
import SendMsg from "./SendMsg"
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";

const MsgContainer = () => {

  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);

  const { messages } = useSelector(state => state.messageReducer);
  console.log(messages);

  useEffect(() => {
    if(selectedUser?._id){
      dispatch(getMessageThunk({receiverId: selectedUser?._id}));
    }
  } , [selectedUser]);

  return (
    <>
      {!selectedUser ? (<>please select a user</>):
    <div className="h-screen w-full flex flex-col">
      <div className="p-3 border-b border-b-white/10">
        <User userDetails={selectedUser}/>
      </div>

      <div className="h-full overflow-y-auto p-3">
        {messages?.map(messageDetails => {
          return (
            <Msg key={messageDetails?._id} messageDetails={messageDetails}/>
          )
        })}
      </div>

      <SendMsg/>
    </div>}
    </>
  );
};

export default MsgContainer;
