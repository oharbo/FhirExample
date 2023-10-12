import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { NavigationScreenProp } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import {type StackNavigationProp} from '@react-navigation/stack';
import { Questionnaire } from 'fhir/r5';

import { EndpT, QEndpoints, RootStackParamList, ScreenNames } from '../constants';
import { fetchAllData } from '../mocks/ApiMock';

type TItemsQState = [Questionnaire[], React.Dispatch<React.SetStateAction<Questionnaire[]>>];

const QContainer: React.FC = () => {
  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [itemsQ, setItemsQ]: TItemsQState = useState<Questionnaire[]>([])

  useEffect(() => {
    const fetchData = async (QEndpoints: EndpT[]): Promise<void> => {
      try {
        const data: Questionnaire[] = await fetchAllData(QEndpoints);
        console.log('data', data);
        setItemsQ(data);
      } catch (error) {
        console.error('Error fetching fhir data:', error);
      }
    };

    fetchData(QEndpoints);
  }, [])

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
