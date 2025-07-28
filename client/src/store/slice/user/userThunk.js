import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const loginUserThunk = createAsyncThunk("user/login", async ({userName , password} , {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post('/user/login' , {
      userName,
      password,
    });
    toast.success("Login successful");
    return response.data;
  } catch (error) {
      console.error(error?.response?.data?.errMessage);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
  }
});


export const registerUserThunk = createAsyncThunk("user/signup", async ({fullName , userName , password , gender} , {rejectWithValue}) => {
  try {
    const response = await axiosInstance.post('/user/register' , {
      fullName,
      userName,
      password,
      gender,
    });
    toast.success("Account created succesfully!!");
    return response.data;
  } catch (error) {
      console.error(error?.response?.data?.errMessage);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
  }
});


export const logoutUserThunk = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/user/logout');
    toast.success("Logout succesfull!!");
    return response.data;
  } catch (error) {
      console.error("Logout error:", error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
  }
});

export const getUserProfileThunk = createAsyncThunk("user/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/user/get-profile');
    return response.data;
  } catch (error) {
      console.error("get-profile error:", error);
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
  }
  
});


export const getOtherUsersThunk = createAsyncThunk("user/getOtherUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/user/get-other-users');
    return response.data;
  } catch (error) {
      console.error("get-other-users:", error);
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
  }
  
});