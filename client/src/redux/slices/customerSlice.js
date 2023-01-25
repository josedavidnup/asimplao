import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  currentCustomer,
  createOrUpdateCustomer,
  currentAdmin,
} from '../../functions/auth';
import { setLoading } from './loadingSlice';

const initialState = {
  _id: null,
  name: null,
  email: null,
  role: null,
  token: null,
};

export const getCurrentCustomer = createAsyncThunk(
  'customer/getCurrentCustomer',
  async (token, { dispatch }) => {
    dispatch(setLoading(true));
    const customer = await currentCustomer(token);
    dispatch(getCustomer(customer));
    dispatch(setLoading(false));
  }
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (token, { dispatch }) => {
    dispatch(setLoading(true));
    const customer = await createOrUpdateCustomer(token);
    dispatch(getCustomer(customer));
    dispatch(setLoading(false));
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getCustomer: (state, action) => {
      state._id = action.payload.data._id;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
    },
    logOutCustomer: (state, action) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getCustomer, getToken, logOutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
