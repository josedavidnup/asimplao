import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case LOGGED_IN_USER:
      return payload;
    case LOGGED_OUT_USER:
      return payload;

    default:
      return state;
  }
};
