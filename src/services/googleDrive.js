// Mock implementation for Google Drive service
const GoogleDrive = {
  // List Google Sheets files in Drive
  listSheets: async () => {
    try {
      console.log('Listing Google Sheets files from Drive');
      // In a real implementation, this would make an API call to Google Drive
      // Return mock data
      return [
        {
          id: 'sheet1',
          name: 'Personal Expenses 2023',
          createdTime: '2023-01-15T10:30:00Z',
        },
        {
          id: 'sheet2',
          name: 'Business Expenses 2023',
          createdTime: '2023-01-20T14:45:00Z',
        },
        {
          id: 'sheet3',
          name: 'Vacation Budget',
          createdTime: '2023-02-01T09:15:00Z',
        },
      ];
    } catch (error) {
      console.error('Error listing sheets:', error);
      throw error;
    }
  },

  // Create a new Google Sheet in Drive
  createSheet: async title => {
    try {
      console.log(`Creating new Google Sheet in Drive: ${title}`);
      // In a real implementation, this would make an API call to Google Drive
      // Return mock response
      return {
        id: 'new-sheet-id',
        name: title,
        createdTime: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating sheet in Drive:', error);
      throw error;
    }
  },

  // Get a specific Google Sheet file from Drive
  getSheet: async sheetId => {
    try {
      console.log(`Getting Google Sheet from Drive: ${sheetId}`);
      // In a real implementation, this would make an API call to Google Drive
      // Return mock response
      return {
        id: sheetId,
        name: 'Sample Sheet',
        createdTime: '2023-01-15T10:30:00Z',
        modifiedTime: '2023-01-20T14:45:00Z',
      };
    } catch (error) {
      console.error('Error getting sheet from Drive:', error);
      throw error;
    }
  },
};

export default GoogleDrive;
