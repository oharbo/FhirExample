import React from 'react';
import { View, Text } from 'react-native';
import { Questionnaire } from 'fhir/r5';

import { TResponses } from '../types';
import { QResponseSaveAction } from '../store/actions/actions';
import { connect } from 'react-redux';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { PageComponent } from '../components/Shared/PageComponent';
import { styles } from '../styles/shared';

type SummaryProps = {
  questionnaireData: Questionnaire | undefined;
  responseData: TResponses | undefined;
  QResponseSaveAction: (data: TResponses) => void;
};

const QSummary: React.FC<SummaryProps> = ({ questionnaireData, responseData }) => {
  const renderSummary = () => {
    return questionnaireData?.item?.map((item, idx) => {
      const { linkId, text, id = '', required, type } = item;
      const response = responseData?.[linkId] || responseData?.[id];
      let a;
      if (type === 'coding' && response?.value) {
        item?.answerOption?.forEach(i => {
          if (i?.valueCoding?.code === response.value) {
            a = i?.valueCoding?.display;
          }
        });
      }
      const answer = response ? response.value : 'Not answered';
      const key: string = `${linkId}-${idx}`;

      return (
        <View key={key} style={styles.summaryItem}>
          <Text style={styles.displayText}>{text}</Text>
          <Text>{a || answer}</Text>
        </View>
      );
    });
  };

  if (questionnaireData || responseData) {
    return (
      <PageComponent style={styles.container} edges={['bottom']} useSafeAreaView>
        {renderSummary()}
        <Text>
          WIP: Temporary dev restriction: Please restart the app to test other questionnaire
        </Text>
      </PageComponent>
    );
  }
  return (
    <View>
      <Text>Error: questionnaire data or response is missing</Text>
    </View>
  );
};

const mapStateToProps = (state: { fhirQuestionnaires: FhirQStateI }) => {
  const { selectedId, responses, fhirQData }: FhirQStateI = state.fhirQuestionnaires;
  if (fhirQData && responses) {
    const qData = fhirQData.find(q => q.id === selectedId);
    return { responseData: responses, questionnaireData: qData };
  }
};

const mapDispatchToProps = {
  QResponseSaveAction: QResponseSaveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QSummary);
