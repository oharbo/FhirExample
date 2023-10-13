import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {type StackNavigationProp} from '@react-navigation/stack';

import { RootStackParamList } from '../constants';
import { Questionnaire } from 'fhir/r5';
import { FhirQStateI } from '../store/reducers/fhir.reducer';
import { connect } from 'react-redux';
import { QSaveAction } from '../store/actions/actions';

interface QFormI {
  QSaveAction: (data: Questionnaire[]) => void;
  questionnaireData: Questionnaire | undefined;
}

type TTotalQuestions = [number, React.Dispatch<React.SetStateAction<number>>];

const QForm: React.FC<QFormI> = ({ questionnaireData }) => {
  const navigation: StackNavigationProp<RootStackParamList> = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const route = useRoute<RouteProp<RootStackParamList, ScreenNames.QForm>>();
  // const { id }: TId = route.params;

  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
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
      // Handle going back to the dashboard
    }
  };

  const handleResponse = (questionId: string, response: any) => {
    setResponses({ ...responses, [questionId]: response });
  };

  useEffect(() => {
    // Check if all questions have been answered
    const answeredQuestions = Object.keys(responses);
    if (answeredQuestions.length === totalQuestions) {
      // Enable the submit button
    } else {
      // Disable the submit button
    }
  }, [responses]);

  if (!questionnaireData) {
    return (
      <View>
        <Text>Error: Invalid Form Data</Text>
      </View>
    );
  }

  const type = questionnaireData?.item?.[currentPage]?.type;
  return (
    <View>
      {currentPage < totalQuestions && (
        <View>
          <Text>{questionnaireData?.item?.[currentPage].text}</Text>
          {type === "display" && (
            // Render a Display element
            <Text>This is a display element.</Text>
          )}
          {type === "quantity" && (
            // Render a Quantity Input
            // add input fields and validation for quantity here
            <Text>Quantity Input</Text>
          )}
          {type === "text" && (
            // Render a Text Input
            // add input fields for text here
            <Text>Text Input</Text>
          )}
          {type === "coding" && (
            // Render a Single Choice (Radio and Button)
            // create a radio button group or buttons for choices here
            <Text>Single Choice (Radio and Button)</Text>
          )}

          {currentPage !== totalQuestions - 1 ? (
            <Button title="Next" onPress={handleNext} />
          ) : (
            <Button title="Submit" onPress={() => {
            }} />
          )}

          <Button title="Previous" onPress={handlePrevious} />
        </View>
      )}
    </View>
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
