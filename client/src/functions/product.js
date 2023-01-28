import axios from 'axios';

export const getProducts = async () => {
  return await axios.get(`/products`);
};

export const getProduct = async (slug) => {
  return await axios.get(`/product/${slug}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`/products/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (slug, products, authtoken) => {
  return await axios.put(`/category/${slug}`, products, {
    headers: {
      authtoken,
    },
  });
};

export const createProduct = async (products, authtoken) => {
  return await axios.post(`/category`, products, {
    headers: {
      authtoken,
    },
  });
};
