import React, { useEffect } from "react";
import User from "./User";
import Msg from "./Msg";
import SendMsg from "./SendMsg";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";

const MsgContainer = ({ onToggleSidebar, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector(state => state.messageReducer);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
            <HiMenuAlt3 size={40} className="text-white/60" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Gup Shup</h2>
          <p className="text-white/60 mb-6">Select a conversation to start messaging</p>
          <button 
            onClick={onToggleSidebar}
            className="md:hidden px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
          >
            Browse Conversations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      
      {/* Chat Header - Now Sticky */}
      <div className="sticky top-0 z-10 p-4 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <HiMenuAlt3 size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img 
                src={selectedUser?.avatar} 
                alt={selectedUser?.fullName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-white font-semibold">{selectedUser?.fullName}</h2>
              <p className="text-white/60 text-sm">@{selectedUser?.userName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area with custom scrollbar */}
      <div
        className="
          flex-1 overflow-y-auto p-4 space-y-4 
          scrollbar-thin scrollbar-thumb-purple-400/30 scrollbar-track-transparent 
          md:scrollbar-thumb-purple-500/50 md:scrollbar-track-white/10
        "
        style={{
          // Always show the scrollbar for desktop, auto for mobile
          scrollbarWidth: "thin",
          scrollbarColor: "#a78bfa #0000", // purple-400 with transparent track
        }}
      >
        {messages?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-white/60">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages?.map(messageDetails => (
            <Msg key={messageDetails?._id} messageDetails={messageDetails} />
          ))
        )}
      </div>

      {/* Send Message Area */}
      <div className="p-4 bg-white/5 backdrop-blur-lg border-t border-white/20">
        <SendMsg />
      </div>
    </div>
  );
};

export default MsgContainer;
