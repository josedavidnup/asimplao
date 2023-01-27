import axios from 'axios';

export const getSubCategories = async () => {
  return await axios.get(`/subcategories`);
};

export const getSubCategory = async (slug) => {
  return await axios.get(`/subcategory/${slug}`);
};

export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(`/subcategory/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateSubCategory = async (slug, subCategory, authtoken) => {
  return await axios.put(`/subcategory/${slug}`, subCategory, {
    headers: {
      authtoken,
    },
  });
};

export const createSubCategory = async (subCategory, authtoken) => {
  return await axios.post(`/subcategory`, subCategory, {
    headers: {
      authtoken,
    },
  });
};
