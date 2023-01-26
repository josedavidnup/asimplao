import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
  getCategory,
} from '../../functions/category';
import { setLoading } from './loadingSlice';
import { toast } from 'react-toastify';
const initialState = {
  categoryList: [],
};

export const createNewCategory = createAsyncThunk(
  'category/createNewCategory',
  async (data, { dispatch }) => {
    const { name, token } = data;
    dispatch(setLoading(true));
    try {
      await createCategory({ name }, token);
      toast.success(`${name} is created`);
      dispatch(getAllCategory());
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(setLoading(false));
  }
);

export const getAllCategory = createAsyncThunk(
  'category/getAllCategory',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const categories = await getCategories();
      dispatch(allCategories(categories));
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(setLoading(false));
  }
);

export const deleteACategory = createAsyncThunk(
  'category/deleteACategory',
  async (data, { dispatch }) => {
    const { slug, token } = data;
    dispatch(setLoading(true));
    try {
      await removeCategory(slug, token);
      toast.success(`${slug} has been deleted`);
      dispatch(getAllCategory());
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(setLoading(false));
        toast.error(error.response.data);
      }
    }
  }
);

export const updateACategory = createAsyncThunk(
  'category/updateACategory',
  async (data, { dispatch }) => {
    const { slug, name, token } = data;
    try {
      await updateCategory(slug, { name }, token);
      toast.success(`${name} has been updated`);
      dispatch(getAllCategory());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }
);

export const getACategory = createAsyncThunk(
  'category/getACategory',
  async (slug, { dispatch }) => {
    try {
      await getCategory(slug);
      dispatch(getAllCategory());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    allCategories: (state, action) => {
      state.categoryList = action.payload.data;
    },
  },
});

export const { allCategories } = categorySlice.actions;
export default categorySlice.reducer;
