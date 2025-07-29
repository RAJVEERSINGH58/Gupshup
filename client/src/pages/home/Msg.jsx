import React from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Msg = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector((state) => state.userReducer);
  const messageRef = useRef(null);
  const isOwnMessage = userProfile._id === messageDetails.senderId;

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div
      ref={messageRef}
      className={`flex items-end gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwnMessage && (
        <img
          src={selectedUser?.avatar}
          alt={selectedUser?.fullName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      )}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl`}>
        <div
          className={`
            px-4 py-2 rounded-2xl shadow-lg
            ${isOwnMessage
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-auto'
              : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'
            }
          `}
        >
          <p className="text-sm md:text-base break-words">{messageDetails.message}</p>
        </div>
        
        <div className={`mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          <span className="text-xs text-white/50">
            {formatTime(messageDetails.createdAt)}
          </span>
        </div>
      </div>
      
      {isOwnMessage && (
        <img
          src={userProfile?.avatar}
          alt={userProfile?.fullName}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      )}
    </div>
  );
};

export default Msg;
