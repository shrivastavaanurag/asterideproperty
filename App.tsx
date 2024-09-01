/** @App.tsx start of the application. */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/routers/StackNavigation';

const App = () => {
    
    return (
        <SafeAreaProvider style={{ flex: 1, paddingTop: 20 }}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
      </SafeAreaProvider>
    )
}

export default App;
