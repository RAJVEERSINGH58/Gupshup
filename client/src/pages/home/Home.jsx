import React from 'react'
import UserSidebar from './UserSidebar'
import MsgContainer from './MsgContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socketSlice'
import { setNewMessage } from '../../store/slice/message/messageSlice'

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector((state) => state.userReducer);
  const { socket } = useSelector(state => state.socketReducer);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (newMessage) => {
      console.log(newMessage);
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.close();
    }
  }, [socket])

  return (
    <div className='h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex relative overflow-hidden'>
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 h-full transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <UserSidebar 
          onClose={() => setIsSidebarOpen(false)}
          isMobile={true}
        />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <MsgContainer 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  )
}

export default Home
