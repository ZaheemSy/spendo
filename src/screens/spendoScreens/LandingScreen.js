import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { signOutGoogle } from '../services/googleAuth';
import { createGoogleSheet } from '../services/googleSheets';

const LandingScreen = ({ navigation }) => {
  const { accessToken, user, logout } = useAuth();
  const [sheetName, setSheetName] = useState('');

  const handleCreateSheet = async () => {
    if (!sheetName.trim()) {
      Alert.alert('Please enter a sheet name');
      return;
    }
    try {
      await createGoogleSheet(accessToken, sheetName);
      Alert.alert('Sheet created successfully!');
      setSheetName('');
    } catch (error) {
      Alert.alert('Error creating sheet');
    }
  };

  const handleLogout = async () => {
    await signOutGoogle();
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Welcome, {user?.user?.name || 'User'}
      </Text>
      <TextInput
        placeholder="Enter Sheet Name"
        value={sheetName}
        onChangeText={setSheetName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 15 }}
      />
      <Button title="Create Sheet" onPress={handleCreateSheet} />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="View Sheet List"
        onPress={() => navigation.navigate('SheetList')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

export default LandingScreen;
