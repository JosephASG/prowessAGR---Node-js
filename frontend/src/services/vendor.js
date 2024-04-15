import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const fetchApi = (url, options) => {
  return fetch(`${API_URL}${url}`, options).then((response) => {
    if (!response.ok) throw new Error('Error fetching data');
    return response.json();
  });
};


export const fetchVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}fb/vendedor/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching vendors: ' + error.message);
  }
};

export const addVendor = async (vendor) => {
  try {
    const response = await axios.post(`${API_URL}fb/vendedor/`, vendor)
    return response;
  } catch (error) {
    throw new Error('Error to add vendor' + error.message);
  }
}


export const updateVendor = (vendorId, data) => {
  return fetchApi(`fb/vendedor/${vendorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteVendor = (vendorId) => {
  return fetchApi(`fb/vendedor/${vendorId}`, { method: 'DELETE' });
};
