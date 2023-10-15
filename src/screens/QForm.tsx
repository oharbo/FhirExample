import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore (absent TS typing for the element; +don't want to add react-native-svg package
import ProgressBar from 'react-native-progress/Bar';

import { RootStackParamList } from '../constants';
import { Questionnaire, QuestionnaireItem } from 'fhir/r5';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { connect } from 'react-redux';
import { QSaveAction } from '../store/actions/actions';
import { PageComponent } from '../components/PageComponent';
import QDisplay from '../components/QDisplay';
import QuantityItemComponent from '../components/QQuantityInputNumeric';
import useScreenDimensions, { ScreenSize } from '../hooks/useScreenDimensions';

interface QFormI {
  QSaveAction: (data: Questionnaire[]) => void;
  questionnaireData: Questionnaire | undefined;
}

type TTotalQuestions = [number, React.Dispatch<React.SetStateAction<number>>];
type TNxtBnt = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type TResponses = [Record<string, any>, React.Dispatch<React.SetStateAction<Record<string, any>>>];

const QForm: React.FC<QFormI> = ({ questionnaireData }) => {
  const screenSize: ScreenSize = useScreenDimensions();

  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentPage, setCurrentPage]: TTotalQuestions = useState(0);
  const [responses, setResponses]: TResponses = useState({});
  const [totalQuestions, setTotalQuestions]: TTotalQuestions = useState(0);
  const [nextButtonEnabled, setNextButtonEnabled]: TNxtBnt = useState(false);

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
      // Handle going back to the dashboard
    }
  };

  const handleResponse = (questionId: string, response: any) => {
    setResponses({ ...responses, [questionId]: response });
  };

  const handleValidationChange = (isValid: boolean) => {
    // console.log('handleValidationChange isValid:', isValid);
    setNextButtonEnabled(isValid);
  };

  const handleValueChange = (value: any) => {
    // console.log('+++ handleValueChange', value);
    // Array of:
    // {
    //  linkId = currItem.id,
    //  answer: {
    //      value: <value> }
    // }
    if (currItem.id) {
      responses[currItem.id] = value;
    }
    console.log('responses', responses);
    setResponses({ ...responses });
  };

  useEffect(() => {
    // Check if all questions have been answered
    const answeredQuestions: string[] = Object.keys(responses);
    if (answeredQuestions.length === totalQuestions) {
      // Enable the submit button

    } else {
      // Disable the submit button
    }
  }, [responses]);

  if (!questionnaireData || !questionnaireData?.item?.[currentPage]) {
    return (
      <View>
        <Text>Error: Invalid Form Data</Text>
      </View>
    );
  }

  const type = questionnaireData?.item?.[currentPage]?.type;
  const currItem: QuestionnaireItem = questionnaireData?.item?.[currentPage];
  const btnDisabled: boolean = !!(!nextButtonEnabled && currItem?.required);

  const isNextBtnVisible: boolean = currentPage !== totalQuestions - 1;
  const isSubmitBtnVisible: boolean = currentPage === totalQuestions - 1;

  const key: string = `${currItem?.id || currentPage}`
  const progress: number = currentPage / totalQuestions;

  return (
    <PageComponent
      useSafeAreaView
      edges={['bottom']}
      style={styles.container}>
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
              <QuantityItemComponent
                key={key}
                item={currItem}
                onValidationChange={handleValidationChange}
                onValueChange={handleValueChange}
              />
            )}
            {type === 'text' && (
              // Render a Text Input
              // add input fields for text here
              <Text>Text Input</Text>
            )}
            {type === 'coding' && (
              // Render a Single Choice (Radio and Button)
              // create a radio button group or buttons for choices here
              <Text>Single Choice (Radio and Button)</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button title="Previous" onPress={handlePrevious} />

            {
              isNextBtnVisible && (
                <Button title="Next" disabled={btnDisabled} onPress={handleNext} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
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
