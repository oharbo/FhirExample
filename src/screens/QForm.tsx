import React, { Fragment, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore (absent TS typing for the element; +don't want to add react-native-svg package
import ProgressBar from 'react-native-progress/Bar';
import { connect } from 'react-redux';

import QButtonGroup from '../components/QFormComponents/QButtonGroup';
import QDynamicComponent from '../components/QFormComponents/QDynamicComponent';
import useScreenDimensions, { ScreenSize } from '../hooks/useScreenDimensions';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { PageComponent } from '../components/Shared/PageComponent';
import { QResponseSaveAction } from '../store/actions/actions';
import { Questionnaire, QuestionnaireItem } from 'fhir/r5';
import { RootStackParamList, ScreenNames } from '../constants';
import { TResponses, TResponsesSt } from '../types';
import { styles } from '../styles/shared';

interface QFormI {
  QResponseSaveAction: (data: TResponses) => void;
  questionnaireData: Questionnaire | undefined;
}
type TRes = string | number;
type TTotalQuestions = [number, React.Dispatch<React.SetStateAction<number>>];

const QForm: React.FC<QFormI> = ({ questionnaireData, QResponseSaveAction }) => {
  const screenSize: ScreenSize = useScreenDimensions();

  const navigation: StackNavigationProp<RootStackParamList> =
    useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentPage, setCurrentPage]: TTotalQuestions = useState(0);
  const [responses, setResponses]: TResponsesSt = useState({});
  const [totalQuestions, setTotalQuestions]: TTotalQuestions = useState(0);

  useEffect(() => {
    if (questionnaireData) {
      navigation.setOptions({ title: questionnaireData?.title });
      if (questionnaireData?.item?.length) {
        setTotalQuestions(questionnaireData.item.length);
      }
    }
  }, [questionnaireData]);

  const handleNext = (): void => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = (): void => {
    if (currentPage === totalQuestions - 1) {
      // Handle form submission here
      QResponseSaveAction(responses);
      navigation.navigate(ScreenNames.QSummary);
    }
  };

  const handlePrevious = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleValueChange = (value: TRes, isValid: boolean): void => {
    // todo learn how-to handle properly QuestionnaireResponse
    // Array of:
    // {
    //  linkId = currItem.id,
    //  answer: {
    //      value: <value> }
    // }
    if (currItem.id) {
      responses[currItem.id] = {
        value: value,
        isValid: isValid,
      };
    } else if (currItem?.linkId) {
      responses[currItem.linkId] = {
        value: value,
        isValid: isValid,
      };
    }
    setResponses({ ...responses });
  };

  if (!questionnaireData || !questionnaireData?.item?.[currentPage]) {
    return (
      <View>
        <Text>Error: Invalid Form Data</Text>
      </View>
    );
  }

  const type: QuestionnaireItem['type'] = questionnaireData?.item?.[currentPage]?.type;
  const currItem: QuestionnaireItem = questionnaireData?.item?.[currentPage];

  const isNextBtnVisible: boolean = currentPage !== totalQuestions - 1;
  const isSubmitBtnVisible: boolean = currentPage === totalQuestions - 1;

  const key: string = `${currItem?.id || currItem.linkId || currentPage}`;
  const progress: number = currentPage / totalQuestions;
  const savedResponse: string | null = currItem.id
    ? responses[currItem?.id]?.value?.toString()
    : currItem.linkId
    ? responses[currItem?.linkId]?.value?.toString()
    : null;

  const prevBtnTitle = currentPage === 0 ? 'Exit' : 'Previous';

  const isSavedResponseValid = currItem.id
    ? responses[currItem?.id]?.isValid
    : currItem.linkId
    ? responses[currItem?.linkId]?.isValid
    : null;
  const enabled: boolean = !!(isSavedResponseValid || !currItem?.required);

  return (
    <PageComponent useSafeAreaView edges={['bottom']} style={styles.containerForm}>
      {currentPage < totalQuestions && (
        <Fragment>
          <View>
            <ProgressBar
              progress={progress}
              useNativeDriver
              width={screenSize.width}
              borderRadius={0}
              borderWidth={0}
            />
            <QDynamicComponent
              type={type}
              keyP={key}
              item={currItem}
              handleValueChange={handleValueChange}
              savedResponse={savedResponse}
            />
          </View>
          <QButtonGroup
            disabled={!enabled}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
            isNextBtnVisible={isNextBtnVisible}
            isSubmitBtnVisible={isSubmitBtnVisible}
            prevBtnTitle={prevBtnTitle}
          />
        </Fragment>
      )}
    </PageComponent>
  );
};

const mapStateToProps = (state: { fhirQuestionnaires: FhirQStateI }) => {
  const { selectedId, fhirQData }: FhirQStateI = state.fhirQuestionnaires;
  if (fhirQData) {
    const qData = fhirQData.find(q => q.id === selectedId);
    return { questionnaireData: qData };
  }
};

const mapDispatchToProps = {
  QResponseSaveAction: QResponseSaveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QForm);
