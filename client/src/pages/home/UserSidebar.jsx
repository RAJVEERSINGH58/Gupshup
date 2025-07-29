import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserThunk,
  getOtherUsersThunk,
} from "../../store/slice/user/userThunk";

const UserSidebar = ({ onClose, isMobile }) => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return user.userName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) || user.fullName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        })
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  return (
    <div className="w-80 md:w-96 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gup Shup
          </h1>
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors md:hidden"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Search conversations..."
            value={searchValue}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="space-y-1">
          {(searchValue ? users : otherUsers)?.map((userDetails) => (
            <User 
              key={userDetails?._id} 
              userDetails={userDetails}
              onUserSelect={isMobile ? onClose : undefined}
            />
          ))}
        </div>
        
        {(searchValue ? users : otherUsers)?.length === 0 && (
          <div className="text-center text-white/60 py-8">
            <p>No users found</p>
          </div>
        )}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={userProfile?.avatar} 
                alt="Profile"
                className="w-12 h-12 rounded-full ring-2 ring-purple-500/50 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-medium truncate">{userProfile?.fullName}</h3>
              <p className="text-white/60 text-sm truncate">@{userProfile?.userName}</p>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
