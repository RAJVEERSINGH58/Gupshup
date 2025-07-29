import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails, onUserSelect }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);
  const isSelected = userDetails?._id === selectedUser?._id;

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
    if (onUserSelect) onUserSelect();
  }

  return (
    <div 
      onClick={handleUserClick} 
      className={`
        flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200
        hover:bg-white/10 active:scale-98
        ${isSelected ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-white/5'}
      `}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={userDetails?.avatar} 
          alt={userDetails?.fullName}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
        />
        {isUserOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <h3 className="text-white font-medium truncate">{userDetails?.fullName}</h3>
        <div className="flex items-center gap-2">
          <p className="text-white/60 text-sm truncate">@{userDetails?.userName}</p>
          {isUserOnline && (
            <span className="text-green-400 text-xs font-medium">Online</span>
          )}
        </div>
      </div>
      
      {isSelected && (
        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
      )}
    </div>
  );
};

export default User;
