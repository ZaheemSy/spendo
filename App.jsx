/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// Note: In JavaScript/JSX, all imported modules (like components and hooks) remain the same.
import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

/**
 * Main application component responsible for setting up the SafeAreaProvider and StatusBar.
 */
function App() {
  // Determine if the user's device is in dark mode
  const isDarkMode = useColorScheme() === 'dark';

  return (
    // SafeAreaProvider is necessary for useSafeAreaInsets hook to work properly
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

/**
 * Content component that utilizes safe area insets.
 */
function AppContent() {
  // Get safe area insets (padding required to avoid device notches, etc.)
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Renders the standard new app screen content */}
      <NewAppScreen
        // Updated to reflect the .jsx file type
        templateFileName="App.jsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

// StyleSheet definition for layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
