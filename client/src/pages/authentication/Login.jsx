import React, { useEffect, useState } from "react";
import { FaUser, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";

// ...imports remain the same
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.userReducer);

  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // important to prevent default submit reload!
    if (!loginData.userName.trim()) {
      return toast.error("Username is required");
    }
    if (!loginData.password.trim()) {
      return toast.error("Password is required");
    }
    setIsLoading(true);
    try {
      const response = await dispatch(loginUserThunk(loginData));
      if (response?.payload?.success) {
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error(response?.payload?.message || "Login failed");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">GS</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-white/60">Sign in to continue to Gup Shup</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
                  value={loginData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
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
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !loginData.userName.trim() || !loginData.password.trim()}
              className={`
                w-full py-3 rounded-xl font-semibold transition-all duration-200 
                ${isLoading || !loginData.userName.trim() || !loginData.password.trim()
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 active:scale-98'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 text-white/60 rounded-full">New to Gup Shup?</span>
            </div>
          </div>
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors underline decoration-purple-400/50 hover:decoration-purple-300/50"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
