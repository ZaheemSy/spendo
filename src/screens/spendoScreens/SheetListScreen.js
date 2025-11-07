import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { listUserSheets } from '../services/googleSheets';

const SheetListScreen = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    const fetchSheets = async () => {
      const list = await listUserSheets(accessToken);
      setSheets(list);
    };
    fetchSheets();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Your Sheets</Text>
      <FlatList
        data={sheets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SheetDetail', {
                sheetId: item.id,
                sheetName: item.name,
              })
            }
          >
            <Text style={{ padding: 10, borderBottomWidth: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SheetListScreen;
