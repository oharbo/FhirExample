import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore (absent TS typing for the element; +don't want to add react-native-svg package
import ProgressBar from 'react-native-progress/Bar';

import QDisplay from '../components/QDisplay';
import QQuantityInputNumeric from '../components/QQuantityInputNumeric';
import QSingleChoice from '../components/QSingleChoice';
import QTextInput from '../components/QTextInput';
import useScreenDimensions, { ScreenSize } from '../hooks/useScreenDimensions';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { PageComponent } from '../components/PageComponent';
import { QSaveAction } from '../store/actions/actions';
import { Questionnaire, QuestionnaireItem } from 'fhir/r5';
import { RootStackParamList } from '../constants';
import { connect } from 'react-redux';
import { styles } from '../styles/shared';

interface QFormI {
  QSaveAction: (data: Questionnaire[]) => void;
  questionnaireData: Questionnaire | undefined;
}
type TRes = string | number;
type TTotalQuestions = [number, React.Dispatch<React.SetStateAction<number>>];
type TResponses = [Record<string, Record<string, string | number | boolean>>, React.Dispatch<React.SetStateAction<Record<string, Record<string, string | number | boolean>>>>];

const QForm: React.FC<QFormI> = ({ questionnaireData }) => {
  const screenSize: ScreenSize = useScreenDimensions();

  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentPage, setCurrentPage]: TTotalQuestions = useState(0);
  const [responses, setResponses]: TResponses = useState({});
  const [totalQuestions, setTotalQuestions]: TTotalQuestions = useState(0);

  useEffect(() => {
    if (questionnaireData) {
      navigation.setOptions({ title: questionnaireData?.title });
      if (questionnaireData?.item?.length) {
        setTotalQuestions(questionnaireData.item.length);
      }
    }
  }, [questionnaireData]);

  const handleNext = () => {
    if (currentPage < totalQuestions - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Handle form submission here
    }
  };

  const handlePrevious = () => {
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

  // useEffect(() => {
  //   // Check if all questions have been answered
  //   const answeredQuestions: string[] = Object.keys(responses);
  //   if (answeredQuestions.length === totalQuestions) {
  //     // Enable the submit button
  //   } else {
  //     // Disable the submit button
  //   }
  // }, [responses]);

  if (!questionnaireData || !questionnaireData?.item?.[currentPage]) {
    return (
      <View>
        <Text>Error: Invalid Form Data</Text>
      </View>
    );
  }

  const type = questionnaireData?.item?.[currentPage]?.type;
  const currItem: QuestionnaireItem = questionnaireData?.item?.[currentPage];

  const isNextBtnVisible: boolean = currentPage !== totalQuestions - 1;
  const isSubmitBtnVisible: boolean = currentPage === totalQuestions - 1;

  const key: string = `${currItem?.id || currentPage}`
  const progress: number = currentPage / totalQuestions;
  const savedResponse: string | null =
    currItem.id ? responses[currItem?.id]?.value?.toString() :
      currItem.linkId ? responses[currItem?.linkId]?.value?.toString() : null;

  const prevBtnTitle = currentPage === 0 ? 'Exit' : 'Previous';

  const isSavedResponseValid = currItem.id ?
    responses[currItem?.id]?.isValid :
      currItem.linkId ? responses[currItem?.linkId]?.isValid : null;
  const enabled = isSavedResponseValid || !currItem?.required;

  return (
    <PageComponent
      useSafeAreaView
      edges={['bottom']}
      style={styles.containerForm}>
      {currentPage < totalQuestions && (
        <>
          <View>
            <ProgressBar
              progress={progress}
              useNativeDriver
              width={screenSize.width}
              borderRadius={0}
              borderWidth={0}
            />
            {type === 'display' && (
              <QDisplay
                key={key}
                item={currItem}
              />
            )}
            {type === 'quantity' && (
              <QQuantityInputNumeric
                key={key}
                item={currItem}
                onValueChange={handleValueChange}
                savedValue={savedResponse}
              />
            )}
            {type === 'text' && (
              <QTextInput
                key={key}
                item={currItem}
                onValueChange={handleValueChange}
                savedValue={savedResponse}
              />
            )}
            {type === 'coding' && (
              <QSingleChoice
                key={key}
                item={currItem}
                onValueChange={handleValueChange}
                savedValue={savedResponse}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button title={prevBtnTitle} onPress={handlePrevious} />

            {
              isNextBtnVisible && (
                <Button title="Next" disabled={!enabled} onPress={handleNext} />
              )}
            {
              isSubmitBtnVisible && (
                <Button title="Submit" onPress={() => {
                }} />
              )}
          </View>
        </>
      )}
    </PageComponent>
  );
};

const mapStateToProps = (state: { fhirQuestionnaires: FhirQStateI }) => {
  const { selectedId, fhirQData }: FhirQStateI = state.fhirQuestionnaires;
  if (fhirQData) {
    const qData = fhirQData.find((q) => q.id === selectedId);
    return { questionnaireData: qData };
  }
};

const mapDispatchToProps = {
  QSaveAction: QSaveAction
};

export default connect(mapStateToProps, mapDispatchToProps)(QForm);
