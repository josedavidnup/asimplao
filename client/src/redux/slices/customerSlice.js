import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { currentCustomer, createOrUpdateCustomer } from '../../functions/auth';
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
    const user = {
      _id: customer.data._id,
      name: customer.data.name,
      email: customer.data.email,
      role: customer.data.role,
      token,
    };
    dispatch(getCustomer(user));
    dispatch(setLoading(false));
  }
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (token, { dispatch }) => {
    dispatch(setLoading(true));
    const customer = await createOrUpdateCustomer(token);
    const user = {
      _id: customer.data._id,
      name: customer.data.name,
      email: customer.data.email,
      role: customer.data.role,
      token,
    };
    dispatch(getCustomer(user));
    dispatch(setLoading(false));
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getCustomer: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logOutCustomer: (state, action) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { getCustomer, getToken, logOutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
