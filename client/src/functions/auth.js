import axios from 'axios';

export const createOrUpdateCustomer = async (authtoken) => {
  return await axios.post(
    `/create-or-update-customer`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentCustomer = async (authtoken) => {
  return await axios.post(
    `/current-customer`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentRetailer = async (authtoken) => {
  return await axios.post(
    `/current-retailer`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const changeRole = async (role, id, authtoken) => {
  return await axios.put(
    `/change-role`,
    { role, id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
