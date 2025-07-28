import React, { useEffect, useState } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link ,  useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from "../../store/slice/user/userThunk";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(state => state.userReducer);
  
  const [loginData , setLoginData] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if(isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setLoginData(prev => ({
      ...prev , 
      [e.target.name] : e.target.value,
    }));
  }

  const handlelogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if(response?.payload?.success){
      navigate('/');
    }
  }

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-gray-900">
      <div className="w-full max-w-md sm:max-w-lg flex flex-col gap-5 bg-base-200 p-8 rounded-lg shadow-lg">

        <h2 className="text-xl font-semibold text-center text-white">
          Please Login..!!
        </h2>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input type="text" className="grow bg-transparent outline-none" name="userName" placeholder="Username" onChange={handleInputChange} />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaKey />
          <input type="password" className="grow bg-transparent outline-none" name="password" placeholder="Password" onChange={handleInputChange}/>
        </label>

        <button onClick={handlelogin} className="btn btn-primary w-full sm:w-48 mx-auto">Login</button>

        <p>
          Don't have an account? &nbsp;
          <Link to="/signup" className="text-blue-400 underline">
          Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
