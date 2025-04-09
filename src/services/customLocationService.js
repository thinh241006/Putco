import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:5300';

// Get all custom locations
export const getAllCustomLocations = async () => {
  try {
    console.log('Fetching custom locations from:', `${API_BASE_URL}/admin/newLocations`);
    const response = await axios.get(`${API_BASE_URL}/admin/newLocations`, {
      withCredentials: true
    });
    console.log('Response received:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error fetching custom locations: ', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return { success: false, error: error.message, data: [] };
  }
};

// Add a custom location
export const addCustomLocation = async (locationData) => {
  try {
    console.log('Adding custom location: ', locationData);
    const response = await axios.post(`${API_BASE_URL}/admin/newLocations`, locationData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Add location response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding custom location: ', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return { success: false, error: error.message };
  }
};

// Delete a custom location
export const deleteCustomLocation = async (locationId) => {
  try {
    console.log('Deleting location with ID:', locationId);
    const response = await axios.delete(`${API_BASE_URL}/admin/newLocations/${locationId}`, {
      withCredentials: true
    });
    console.log('Delete response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error deleting custom location: ', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return { success: false, error: error.message };
  }
};