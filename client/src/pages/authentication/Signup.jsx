import React, { useEffect, useState } from "react";
import { FaUser, FaKey, FaEye, FaEyeSlash, FaUserTag, FaMars, FaVenus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import { toast } from 'react-hot-toast';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!signupData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!signupData.userName.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!signupData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await dispatch(registerUserThunk(signupData));
      if (response?.payload?.success) {
        toast.success("Account created successfully!");
        navigate('/');
      } else {
        toast.error(response?.payload?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">GS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join Gup Shup
            </h1>
            <p className="text-white/60 text-sm md:text-base">Create your account to get started</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUserTag className="text-white/60" size={16} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your full name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-white/60" size={16} />
                </div>
                <input
                  type="text"
                  name="userName"
                  value={signupData.userName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Choose a username"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={
                  "flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all " +
                  (signupData.gender === 'male'
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10')
                }>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={signupData.gender === 'male'}
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <FaMars size={16} />
                  <span className="text-sm font-medium">Male</span>
                </label>
                <label className={
                  "flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all " +
                  (signupData.gender === 'female'
                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-300'
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10')
                }>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={signupData.gender === 'female'}
                    onChange={handleInputChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <FaVenus size={16} />
                  <span className="text-sm font-medium">Female</span>
                </label>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaKey className="text-white/60" size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Create a password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {signupData.password && signupData.password.length < 6 && (
                <p className="text-red-400 text-xs mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaKey className="text-white/60" size={16} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Confirm your password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {signupData.confirmPassword && signupData.password !== signupData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={
                isLoading ||
                !signupData.fullName.trim() ||
                !signupData.userName.trim() ||
                !signupData.password.trim() ||
                signupData.password !== signupData.confirmPassword
              }
              className={
                "w-full py-3 rounded-xl font-semibold transition-all duration-200 mt-6 " +
                (isLoading ||
                !signupData.fullName.trim() ||
                !signupData.userName.trim() ||
                !signupData.password.trim() ||
                signupData.password !== signupData.confirmPassword
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 active:scale-98"
                )
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 text-white/60 rounded-full">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors underline decoration-purple-400/50 hover:decoration-purple-300/50"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs md:text-sm">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
