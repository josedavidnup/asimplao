import { LOADING, ERROR } from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: false,
};

export const extraReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
