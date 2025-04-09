import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5300', // Make sure this matches your server URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Debug log
console.log('Initializing customLocationService with baseURL:', api.defaults.baseURL);

export const customLocationService = {
  getAllCustomLocations: async () => {
    try {
      const endpoint = '/api/admin/newLocations';
      console.log('Fetching custom locations from:', endpoint);
      
      const response = await api.get(endpoint);
      console.log('Custom locations response:', response.data);
      return { success: true, data: response.data || [] };
    } catch (error) {
      console.error('Error fetching custom locations:', error);
      
      // Fallback to localStorage if API fails
      const storedLocations = localStorage.getItem('customLocations');
      if (storedLocations) {
        const parsedLocations = JSON.parse(storedLocations);
        console.log('Using fallback locations from localStorage:', parsedLocations);
        return { success: true, data: parsedLocations };
      }
      
      return { success: false, error: error.message, data: [] };
    }
  },

  addCustomLocation: async (formData) => {
    try {
      console.log('Adding custom location:', formData);
      
      const response = await api.post(API_CONFIG.endpoints.customLocations, formData);
      
      // Also store in localStorage as backup
      const storedLocations = JSON.parse(localStorage.getItem('customLocations') || '[]');
      storedLocations.push(response.data);
      localStorage.setItem('customLocations', JSON.stringify(storedLocations));
      
      return { success: true, data: response.data, message: 'Location added successfully' };
    } catch (error) {
      console.error('Error adding custom location:', error);
      return { success: false, error: error.message, message: 'Failed to add location' };
    }
  },

  deleteCustomLocation: async (locationId) => {
    try {
      console.log('Deleting custom location:', locationId);
      
      const response = await api.delete(`${API_CONFIG.endpoints.customLocations}/${locationId}`);
      
      // Also update localStorage
      const storedLocations = JSON.parse(localStorage.getItem('customLocations') || '[]');
      const updatedLocations = storedLocations.filter(loc => loc._id !== locationId);
      localStorage.setItem('customLocations', JSON.stringify(updatedLocations));
      
      return { success: true, message: 'Location deleted successfully' };
    } catch (error) {
      console.error('Error deleting custom location:', error);
      return { success: false, error: error.message, message: 'Failed to delete location' };
    }
  }
};