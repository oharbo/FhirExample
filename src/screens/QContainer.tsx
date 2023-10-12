import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationScreenProp } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import {type StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList, ScreenNames } from "../constants";

// interface SimpleScreenProps {
//   navigation: NavigationScreenProp<any, any>;
// }

const QContainer: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Q CONTAINER</Text>
      <Button
        title="Go to QForm"
        onPress={() => navigation.navigate(ScreenNames.QForm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QContainer;
