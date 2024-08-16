

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle", 
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
  },

  extraReducers: (e) => {
    e
     
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
     
  },
});

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;

// git branch -M main
// git remote add origin https://github.com/MadhanAB/reduxproject.git
// git push -u origin main