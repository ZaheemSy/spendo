import axios from 'axios';

const GOOGLE_SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const GOOGLE_DRIVE_API = 'https://www.googleapis.com/drive/v3/files';

export const createGoogleSheet = async (accessToken, sheetName) => {
  try {
    const response = await axios.post(
      `${GOOGLE_SHEETS_API}`,
      {
        properties: { title: sheetName },
        sheets: [{ properties: { title: 'user input' } }],
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating sheet:', error);
    throw error;
  }
};

export const listUserSheets = async accessToken => {
  try {
    const response = await axios.get(
      `${GOOGLE_DRIVE_API}?q=mimeType='application/vnd.google-apps.spreadsheet'`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data.files || [];
  } catch (error) {
    console.error('Error listing sheets:', error);
    throw error;
  }
};

export const addUserInput = async (accessToken, spreadsheetId, value) => {
  try {
    const range = 'user input!A:A';
    const response = await axios.post(
      `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      { values: [[value]] },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding value:', error);
    throw error;
  }
};

export const readUserInputs = async (accessToken, spreadsheetId) => {
  try {
    const range = 'user input!A:A';
    const response = await axios.get(
      `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data.values || [];
  } catch (error) {
    console.error('Error reading values:', error);
    throw error;
  }
};

export const deleteUserInput = async (accessToken, spreadsheetId, rowIndex) => {
  try {
    const batchUpdateUrl = `${GOOGLE_SHEETS_API}/${spreadsheetId}:batchUpdate`;
    const requestBody = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: 'ROWS',
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    };
    await axios.post(batchUpdateUrl, requestBody, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(`Row ${rowIndex + 1} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting row:', error);
    throw error;
  }
};
