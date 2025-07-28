import { createSlice } from '@reduxjs/toolkit'
import { sendMessageThunk , getMessageThunk} from './messageThunk'

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: [],
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setNewMessage: (state , action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...state.messages , action.payload];
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = [...state.messages , action.payload?.responseData?.newMessage]
      state.buttonLoading = true;
    });


    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.conversation?.messages;
      state.buttonLoading = true;
    });

  },
})

export const{ setNewMessage } = messageSlice.actions;

export default messageSlice.reducer
