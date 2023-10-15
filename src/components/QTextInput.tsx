import React, { useState } from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/shared';

type QTextInputPropsI = {
  item: QuestionnaireItem;
  onValueChange: (value: string, isValid: boolean) => void;
  savedValue: string | null
};
type TVal = [string, React.Dispatch<React.SetStateAction<string>>];

const QTextInput: React.FC<QTextInputPropsI> = ({
    item,
    onValueChange,
    savedValue }) => {
  const [value, setValue]: TVal = useState(savedValue || '');
  const { text, maxLength, required } = item;

  const validateValue = (input: string): boolean => {
    const val: string = input.trim();
    if (maxLength === undefined && val.length) return true;
    return (maxLength !== undefined && val.length < maxLength);
  };

  const handleValueChange = (input: string): void => {
    setValue(input);
    const validationMessage: boolean = validateValue(input);
    const val: string = input.trim();

    onValueChange(val, validationMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{text}</Text>
      <TextInput
        keyboardType="default"
        onChangeText={handleValueChange}
        // placeholder={} todo check in the future
        style={styles.input}
        value={value}
      />
      {
        !!required &&
        <Text style={styles.reqText}>{'* Required'}</Text>
      }
    </View>
  );
};

export default QTextInput;
