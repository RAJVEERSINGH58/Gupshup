import React from 'react'
import UserSidebar from './UserSidebar'
import MsgContainer from './MsgContainer'
import io from 'socket.io-client'
import { useDispatch , useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socketSlice'
import { setNewMessage } from '../../store/slice/message/messageSlice'

const Home = () => {

    const dispatch = useDispatch();
    const { isAuthenticated , userProfile } = useSelector((state) => state.userReducer);
    const { socket } = useSelector(state => state.socketReducer);

    useEffect(() => {
      if(!isAuthenticated) return;
      dispatch(initializeSocket(userProfile?._id));
    },[isAuthenticated]);

    useEffect(()=>{
      if(!socket) return;
      socket.on("onlineUsers" , (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socket.on("newMessage" , (newMessage) => {
        console.log(newMessage);
        dispatch(setNewMessage(newMessage));
      });
      return () =>{
        socket.close();
      }
    },[socket])

  return (
    <div className='flex'>
      <UserSidebar/>
      <MsgContainer/>
    </div>
  )
}

export default Home
