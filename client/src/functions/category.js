import axios from 'axios';

export const getCategories = async () => {
  return await axios.get(`/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`/category`, category, {
    headers: {
      authtoken,
    },
  });
};
