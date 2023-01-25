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

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
