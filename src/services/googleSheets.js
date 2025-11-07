// Mock implementation for Google Sheets service
const GoogleSheets = {
  // Get data from a Google Sheet
  getSheetData: async (sheetId, range) => {
    try {
      console.log(`Fetching data from sheet ${sheetId}, range ${range}`);
      // In a real implementation, this would make an API call to Google Sheets
      // Return mock data
      return {
        range: range,
        majorDimension: 'ROWS',
        values: [
          ['Date', 'Category', 'Description', 'Amount'],
          ['2023-01-15', 'Food', 'Groceries', '50.00'],
          ['2023-01-16', 'Transport', 'Bus fare', '5.00'],
          ['2023-01-17', 'Entertainment', 'Movie tickets', '30.00'],
        ],
      };
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  },

  // Update data in a Google Sheet
  updateSheetData: async (sheetId, range, values) => {
    try {
      console.log(`Updating data in sheet ${sheetId}, range ${range}`);
      // In a real implementation, this would make an API call to Google Sheets
      // Return mock response
      return {
        spreadsheetId: sheetId,
        updatedRange: range,
        updatedRows: values.length,
      };
    } catch (error) {
      console.error('Error updating sheet data:', error);
      throw error;
    }
  },

  // Create a new Google Sheet
  createSheet: async title => {
    try {
      console.log(`Creating new sheet with title: ${title}`);
      // In a real implementation, this would make an API call to Google Sheets
      // Return mock response
      return {
        spreadsheetId: 'mock-sheet-id',
        properties: {
          title: title,
        },
      };
    } catch (error) {
      console.error('Error creating sheet:', error);
      throw error;
    }
  },
};

export default GoogleSheets;
