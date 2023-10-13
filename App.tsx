import React from 'react';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store/store';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import { RootStackParamList, ScreenNames, ScreenTitleName } from './src/constants';
import QContainer from './src/screens/QContainer';
import QForm from './src/screens/QForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.ReactElement {
  const isDarkMode: boolean = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenNames.QContainer}
          component={QContainer}
          options={{title: ScreenTitleName.QContainer}}
        />
        <Stack.Screen
          name={ScreenNames.QForm}
          component={QForm}
          options={{title: '', headerBackTitle: 'Exit'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}



export default App;
