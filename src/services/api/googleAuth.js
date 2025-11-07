import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '400568424278-48vbgn93l4tv9v8u593ssch8es0oftfa.apps.googleusercontent.com',

    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    console.log('User Info:', userInfo);
    console.log('Access Token:', tokens.accessToken);
    return { userInfo, tokens };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
