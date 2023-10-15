import React, { useEffect, useState } from 'react';
import { Questionnaire } from 'fhir/r5';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import QuestionnairesDropList from '../components/QuestionnairesDropList';
import { EndpT, QEndpoints } from '../constants';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { PageComponent } from '../components/PageComponent';
import { QSaveAction } from '../store/actions/actions';
import { fetchAllData } from '../mocks/ApiMock';


// type TItemsQState = [Questionnaire[], React.Dispatch<React.SetStateAction<Questionnaire[]>>];
type TTListDataState = [TListData[], React.Dispatch<React.SetStateAction<TListData[]>>];

export type TListData = {
  title: string | undefined;
  id: string | undefined;
}

interface QContainerI {
  fhirQData: FhirQStateI;
  QSaveAction: (data: Questionnaire[]) => void;
}

const QContainer: React.FC<QContainerI> = ({QSaveAction, fhirQData}) => {

  const [itemsListData, setItemsListData]: TTListDataState = useState<TListData[]>([])

  const getTitleIdFromQData: (data: Questionnaire[]) => TListData[] = (data) => {
    return data.map((item): TListData => ({ title: item.title, id: item.id }));
  }

  useEffect((): void => {
    const fetchData = async (QEndpoints: EndpT[]): Promise<void> => {
      try {
        const data: Questionnaire[] = await fetchAllData(QEndpoints);
        const listData: TListData[] = getTitleIdFromQData(data);

        setItemsListData(listData);
        // dispatch to save to redux store
        QSaveAction(data);
      } catch (error) {
        __DEV__ && console.error('Error fetching fhir data:', error);
      }
    };

    if (fhirQData) {
      const data: Questionnaire[] | any = fhirQData;
      const listData: TListData[] = getTitleIdFromQData(data);
      setItemsListData(listData);
    } else {
      // TODO Optional: get mock data in redux-saga
      __DEV__ && console.log('fetchData(QEndpoints)');
      fetchData(QEndpoints);
    }
  }, []);

  return (
    <PageComponent
      edges={['bottom']}
      useSafeAreaView
    >
      <View style={styles.container}>
        <QuestionnairesDropList
          data={itemsListData}
          header={'Questionnaires'}
        />
      </View>
    </PageComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

const mapStateToProps = (state: { fhirQuestionnaires: { fhirQData: FhirQStateI } }) => {
  return { fhirQData: state.fhirQuestionnaires.fhirQData };
};

const mapDispatchToProps = {
  QSaveAction: QSaveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QContainer);
