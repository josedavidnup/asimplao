import axios from 'axios';

export const getCategories = async () => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
};

export const getCategory = async (slug) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${import.meta.env.VITE_API_URL}/category/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/category`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};
