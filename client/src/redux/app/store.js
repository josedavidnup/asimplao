import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customerSlice';
import loadingReducer from '../slices/loadingSlice';
import errorReducer from '../slices/errorSlice';

export default configureStore({
  reducer: {
    customer: customerReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
