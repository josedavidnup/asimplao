import axios from 'axios';

export const getProducts = async () => {
  return await axios.get(`/products`);
};

export const getProduct = async (slug) => {
  return await axios.get(`/product/${slug}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateProduct = async (slug, products, authtoken) => {
  return await axios.put(`/product/${slug}`, products, {
    headers: {
      authtoken,
    },
  });
};

export const createProduct = async (product, authtoken) => {
  return await axios.post(`/product`, product, {
    headers: {
      authtoken,
    },
  });
};
