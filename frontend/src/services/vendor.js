const API_URL = process.env.REACT_APP_API_URL;

export const fetchVendors = () => {
  return fetch(`${API_URL}fb/vendedor/`).then((response) => {
    if (!response.ok) throw new Error('Error fetching vendors');
    return response.json();
  });
};

export const deleteVendor = (vendorId) => {
  return fetch(`${API_URL}fb/vendedor/${vendorId}`, { method: 'DELETE' });
};

export const updateVendor = (vendorId, data) => {
  return fetch(`${API_URL}fb/vendedor/${vendorId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};
