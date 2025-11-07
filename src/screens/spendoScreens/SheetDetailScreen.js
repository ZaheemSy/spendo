import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  addUserInput,
  readUserInputs,
  deleteUserInput,
} from '../services/googleSheets';

const SheetDetailScreen = ({ route }) => {
  const { sheetId, sheetName } = route.params;
  const { accessToken } = useAuth();
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const loadValues = async () => {
    const list = await readUserInputs(accessToken, sheetId);
    setData(list.map(i => i[0]));
  };

  useEffect(() => {
    loadValues();
  }, []);

  const handleAdd = async () => {
    if (!value.trim()) return;
    await addUserInput(accessToken, sheetId, value);
    setValue('');
    loadValues();
  };

  const handleDelete = async index => {
    await deleteUserInput(accessToken, sheetId, index);
    loadValues();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{sheetName}</Text>
      <TextInput
        placeholder="Enter value"
        value={value}
        onChangeText={setValue}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Save" onPress={handleAdd} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              paddingVertical: 8,
            }}
          >
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SheetDetailScreen;
