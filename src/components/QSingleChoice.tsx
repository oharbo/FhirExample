import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { QuestionnaireItem } from 'fhir/r5';
import { styles } from '../styles/shared';

interface QSingleChoicePropsI {
  item: QuestionnaireItem;
  onValueChange: (value: string, isValid: boolean) => void;
  savedValue: string | null
}
type TSelectedOpt = [string | null, React.Dispatch<React.SetStateAction<string | null>>];

const QSingleChoice: React.FC<QSingleChoicePropsI> = ({
    item,
    onValueChange,
    savedValue }) => {
  const [selectedOption, setSelectedOption]: TSelectedOpt = useState(savedValue);
  const { text, required } = item;

  const handleOptionChange = (option = ''): void => {
    setSelectedOption(option);
    onValueChange(option, true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{text}</Text>
      {item?.answerOption?.map((option) => (
        <TouchableOpacity
          key={option?.valueCoding?.code}
          onPress={() => handleOptionChange(option?.valueCoding?.code)}
          style={styles.touchable}
        >
          <View
            style={[styles.radio, {
              borderColor: selectedOption === option?.valueCoding?.code ? 'blue' : 'gray',
              backgroundColor: selectedOption === option?.valueCoding?.code ? 'blue' : 'white',
            }]}
          >
            {selectedOption === option?.valueCoding?.code && (
              <View
                style={styles.radioC}
              />
            )}
          </View>
          <Text style={styles.displayText}>{option?.valueCoding?.display}</Text>
        </TouchableOpacity>
      ))}
      {
        !!required &&
        <Text style={styles.reqText}>{'* Required'}</Text>
      }
    </View>
  );
};

export default QSingleChoice;
