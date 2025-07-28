import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk , registerUserThunk , logoutUserThunk , getUserProfileThunk, getOtherUsersThunk } from './userThunk'

const initialState = {
  isAuthenticated: false,
  screenLoading: true,
  otherUsers: null,
  userProfile: null,
  buttonLoading: false,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state , action) => {
      localStorage.setItem("selectedUser" , JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = true;
    });

    //register
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = true;
    });


    //logout
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.selectedUser = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      state.otherUsers = null;
      localStorage.clear();
    });


    //get-profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthenticated = true;
      state.screenLoading = false;
    });


    //get-other-users
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.otherUsers = action.payload?.responseData?.otherUsers;
    });
  },
})

export const{ setSelectedUser } = userSlice.actions;

export default userSlice.reducer
