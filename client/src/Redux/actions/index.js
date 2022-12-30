import axios from 'axios';
import {
  GET_ALL_BREEDS,
  GET_BREED_DETAIL,
  // CREATE_BREED,
  DELETE_BREED,
  GET_BY_NAME,
  GET_FAVORITES,
  GET_TEMPERAMENTS,
  REMOVE_FAVORITES,
  A_Z_FILTER,
  Z_A_FILTER,
  WEIGHT_FILTER_UP,
  WEIGHT_FILTER_DOWN,
  TEMPERAMENT_FILTER,
  LOADING,
  ERROR,
} from './action_types';

export const getAllBreeds = () => async (dispatch) => {
  // const favorites = getState().favorites
  dispatch({ type: LOADING });
  try {
    const response = await axios.get('/api/dogs');
    dispatch({ type: GET_ALL_BREEDS, payload: response.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const getByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/dogs?name=${name}`);
    dispatch({ type: GET_BY_NAME, payload: response.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const getBreedDetail = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axios.get(`/api/dogs/${id}`);
    dispatch({ type: GET_BREED_DETAIL, payload: response.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const createBreed = (breed) => async (dispatch) => {
  if (!breed.image) {
    breed.image = `https://images.unsplash.com/photo-1588794887323-0b9242b51301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`;
  }
  let dogBreed = {
    name: breed.name,
    min_height: breed.min_height,
    max_height: breed.max_height,
    min_weight: breed.min_weight,
    max_weight: breed.max_weight,
    min_life_span: breed.min_life_span,
    max_life_span: breed.max_life_span,
    image: breed.image,
    temperaments: breed.temperaments,
  };
  try {
    await axios.post('/api/dogs/', dogBreed).then(alert('Creado'));
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const getFavorites = (breed) => {
  return {
    type: GET_FAVORITES,
    payload: breed,
  };
};

export const removeFavorites = (id) => {
  return {
    type: REMOVE_FAVORITES,
    payload: id,
  };
};

export const getTemperaments = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/temperaments`);
    dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const azFilter = () => {
  return {
    type: A_Z_FILTER,
  };
};

export const zaFilter = () => {
  return {
    type: Z_A_FILTER,
  };
};

export const weightFilterUp = () => {
  return {
    type: WEIGHT_FILTER_UP,
  };
};

export const weightFilterDown = () => {
  return {
    type: WEIGHT_FILTER_DOWN,
  };
};

export const temperamentFilter = (name) => {
  return {
    type: TEMPERAMENT_FILTER,
    payload: name,
  };
};

export const deleteBreed = (id) => {
  return {
    type: DELETE_BREED,
    payload: id,
  };
};
