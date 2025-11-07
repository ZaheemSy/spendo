import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// ⚙️ Configure once at top level
GoogleSignin.configure({
  webClientId:
    '400568424278-48vbgn93l4tv9v8u593ssch8es0oftfa.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check sign-in status on app start
  useEffect(() => {
    const init = async () => {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          const userInfo = await GoogleSignin.getCurrentUser();
          setUser(userInfo.user);
          await AsyncStorage.setItem('user', JSON.stringify(userInfo.user));
        } else {
          const savedUser = await AsyncStorage.getItem('user');
          if (savedUser) setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log('Error checking sign-in status:', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ✅ Sign In
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn(); // full object (not just user)
      setUser(userInfo.user);
      await AsyncStorage.setItem('user', JSON.stringify(userInfo.user));
      console.log('✅ Signed in as:', userInfo.user.name);
    } catch (error) {
      console.log('Sign-in error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error.code === statusCodes.IN_PROGRESS) return;
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) return;
    }
  };

  // ✅ Sign Out
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
      console.log('👋 Signed out');
    } catch (error) {
      console.log('Sign-out error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image source={{ uri: user.photo }} style={styles.image} />
          <Text style={styles.name}>Welcome, {user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={signIn} style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  name: { fontSize: 20, fontWeight: '600', color: '#333' },
  email: { fontSize: 14, color: '#666', marginBottom: 20 },
  signInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  signOutButton: {
    backgroundColor: '#DB4437',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
