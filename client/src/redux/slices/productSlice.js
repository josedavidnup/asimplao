import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
  getProduct,
} from '../../functions/product';
import { setLoading } from './loadingSlice';
import { toast } from 'react-toastify';
const initialState = {
  productList: [],
};

export const createNewProduct = createAsyncThunk(
  'product/createNewProduct',
  async (data, { dispatch }) => {
    const { productValues, token } = data;
    dispatch(setLoading(true));
    try {
      await createProduct(productValues, token);
      toast.success(`${productValues.title} is created`);
      // window.alert(`${productValues.title} is created`);
      // window.location.reload();
      // dispatch(getAllProducts());
    } catch (error) {
      // if (error.response.status === 400) toast.error(error.response.data);

      toast.error(error.response.data.error);
      dispatch(setLoading(false));
    }
    toast.error(error.response.data);
    dispatch(setLoading(false));
  }
);

export const getAllProducts = createAsyncThunk(
  'product/getAllProduct',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const products = await getProducts();
      dispatch(allProducts(products));
    } catch (error) {
      toast.error(error.response.data);
    }
    dispatch(setLoading(false));
  }
);

export const deleteAProduct = createAsyncThunk(
  'product/deleteAProduct',
  async (data, { dispatch }) => {
    const { slug, token } = data;
    dispatch(setLoading(true));
    try {
      await removeProduct(slug, token);
      toast.success(`${slug} has been deleted`);
      dispatch(getAllProducts());
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(setLoading(false));
        toast.error(error.response.data);
      }
    }
  }
);

export const updateAProduct = createAsyncThunk(
  'product/updateAProduct',
  async (data, { dispatch }) => {
    const { slug, name, token } = data;
    try {
      await updateProduct(slug, { name }, token);
      toast.success(`${name} has been updated`);
      dispatch(getAllProducts());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
      toast.error(error.response.data);
    }
  }
);

export const getAProduct = createAsyncThunk(
  'product/getAProduct',
  async (slug, { dispatch }) => {
    try {
      await getProduct(slug);
      dispatch(getAllProducts());
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      }
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    allProducts: (state, action) => {
      state.productList = action.payload.data;
    },
  },
});

export const { allProducts } = productSlice.actions;
export default productSlice.reducer;
