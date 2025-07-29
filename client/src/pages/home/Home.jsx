import React, { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar'
import MsgContainer from './MsgContainer'
import { useDispatch, useSelector } from 'react-redux'
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
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.close();
    }
  }, [socket, dispatch]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Sidebar: always visible on desktop, drawer on mobile */}
      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`
              fixed z-50 inset-y-0 left-0 w-80 md:hidden transition-transform duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <UserSidebar onClose={() => setIsSidebarOpen(false)} isMobile={true} />
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 flex-shrink-0 h-full">
        <UserSidebar isMobile={false} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <MsgContainer
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}

export default Home;
