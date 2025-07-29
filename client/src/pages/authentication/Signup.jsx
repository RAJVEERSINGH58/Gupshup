import React , {useEffect} from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import { toast } from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.userReducer);
  const [signupData, setSignupData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(() => {
    if(isAuthenticated) navigate('/');
  } , [isAuthenticated])

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if(signupData.password !== signupData.confirmPassword){
      return toast.error("Password and confirm password do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if(response?.payload?.success){
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-gray-900">
      <div className="w-full max-w-md sm:max-w-lg flex flex-col gap-5 bg-base-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center text-white">
          Please Signup..!!
        </h2>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow bg-transparent outline-none"
            name="fullName"
            placeholder="Full Name"
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow bg-transparent outline-none"
            name="userName"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>

        <div className="input input-bordered flex items-center gap-5 w-full">
          <label htmlFor="male" className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
            />male
          </label>

          <label htmlFor="female" className="flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            female
          </label>
        </div>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaKey />
          <input
            type="password"
            className="grow bg-transparent outline-none"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaKey />
          <input
            type="password"
            className="grow bg-transparent outline-none"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
        </label>

        <button
          className="btn btn-primary w-full sm:w-48 mx-auto"
          onClick={handleSignup}
        >
          Signup
        </button>

        <p>
          already have an account? &nbsp;
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
