import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
  updateSubCategory,
  getSubCategory,
} from '../../functions/subCategory';
import { setLoading } from './loadingSlice';
import { toast } from 'react-toastify';
const initialState = {
  subCategoryList: [],
};

export const createNewSubCategory = createAsyncThunk(
  'category/createNewSubCategory',
  async (data, { dispatch }) => {
    const { name, category, token } = data;
    dispatch(setLoading(true));
    try {
      await createSubCategory({ name, category }, token);
      toast.success(`${name} is created`);
      dispatch(getAllSubCategory());
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(setLoading(false));
  }
);

export const getAllSubCategory = createAsyncThunk(
  'category/getAllSubCategory',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const subCategories = await getSubCategories();
      dispatch(allSubCategories(subCategories));
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(setLoading(false));
  }
);

export const deleteASubCategory = createAsyncThunk(
  'category/deleteASubCategory',
  async (data, { dispatch }) => {
    const { slug, token } = data;
    dispatch(setLoading(true));
    try {
      await removeSubCategory(slug, token);
      toast.success(`${slug} has been deleted`);
      dispatch(getAllSubCategory());
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(setLoading(false));
        toast.error(error.response.data);
      }
    }
  }
);

export const updateASubCategory = createAsyncThunk(
  'category/updateASubCategory',
  async (data, { dispatch }) => {
    const { slug, name, token } = data;
    try {
      await updateSubCategory(slug, { name }, token);
      toast.success(`${name} has been updated`);
      dispatch(getAllSubCategory());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }
);

export const getASubCategory = createAsyncThunk(
  'category/getASubCategory',
  async (slug, { dispatch }) => {
    try {
      await getSubCategory(slug);
      dispatch(getAllSubCategory());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }
);

export const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {
    allSubCategories: (state, action) => {
      state.subCategoryList = action.payload.data;
    },
  },
});

export const { allSubCategories } = subCategorySlice.actions;
export default subCategorySlice.reducer;
