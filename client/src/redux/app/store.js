import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customerSlice';
import categoryReducer from '../slices/categorySlice';
import subCategoryReducer from '../slices/subCategorySlice';
import loadingReducer from '../slices/loadingSlice';
import errorReducer from '../slices/errorSlice';

export default configureStore({
  reducer: {
    customer: customerReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
