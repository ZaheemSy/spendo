import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock implementation for Google Auth service
const GoogleAuth = {
  signIn: async () => {
    try {
      // In a real implementation, this would initiate the Google Sign-In flow
      console.log('Initiating Google Sign-In');
      // Mock user data
      const userData = {
        id: '12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        accessToken: 'mock-access-token',
      };

      // Store user data
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      // Clear stored user data
      await AsyncStorage.removeItem('user');
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
};

export default GoogleAuth;
