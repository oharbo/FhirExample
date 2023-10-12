import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {type StackNavigationProp} from '@react-navigation/stack';
import { Questionnaire } from 'fhir/r5';

import { EndpT, QEndpoints } from '../constants';
import { fetchAllData } from '../mocks/ApiMock';
import QuestionnairesDropList from "../components/QuestionnairesDropList";

type TItemsQState = [Questionnaire[], React.Dispatch<React.SetStateAction<Questionnaire[]>>];
type TTListDataState = [TListData[], React.Dispatch<React.SetStateAction<TListData[]>>];
export type TListData = {
  title: string | undefined;
  id: string | undefined;
}

const QContainer: React.FC = () => {

  const [itemsQ, setItemsQ]: TItemsQState = useState<Questionnaire[]>([])
  const [itemsListData, setItemsListData]: TTListDataState = useState<TListData[]>([])

  useEffect((): void => {
    const fetchData = async (QEndpoints: EndpT[]): Promise<void> => {
      try {
        const data: Questionnaire[] = await fetchAllData(QEndpoints);
        __DEV__ && console.log('data', data);

        setItemsQ(data);

        const listData: TListData[] = data.map((item): TListData => {
          return { title: item.title, id: item.id };
        })

        setItemsListData(listData);
        // TODO dispatch to save to redux
        // TODO Optional: get mock data in redux-saga
      } catch (error) {
        __DEV__ && console.error('Error fetching fhir data:', error);
      }
    };

    fetchData(QEndpoints);
  }, []);

  return (
    <View style={styles.container}>
      <QuestionnairesDropList
        data={itemsListData}
        header={'Questionnaires'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

export default QContainer;
