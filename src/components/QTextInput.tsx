import React, { useState } from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type QuantityItemProps = {
  item: QuestionnaireItem;
  onValidationChange: (isValid: boolean) => void;
  onValueChange: (value: string) => void;
  savedValue: string | null
};
type TIsValid = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type TVal = [string, React.Dispatch<React.SetStateAction<string>>];

const QTextInput: React.FC<QuantityItemProps> = ({
    item,
    onValidationChange,
    onValueChange,
    savedValue }) => {
  const [value, setValue]: TVal = useState(savedValue || '');
  const [isValid, setIsValid]: TIsValid = useState(true);

  const { text, maxLength, required } = item;

  const validateValue = (input: string): boolean => {
    const val: string = input.trim();
    return !(maxLength !== undefined && val.length < maxLength);
  };

  const handleValueChange = (input: string): void => {
    setValue(input);
    const validationMessage: boolean = validateValue(input);
    const val: string = input.trim();

    if (!validationMessage) {
      setIsValid(false); // todo check if still needed
      onValidationChange(false);
    } else {
      setIsValid(true);
      onValidationChange(true);
      onValueChange(val); // pass value above
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{text}</Text>
      <TextInput
        keyboardType="default"
        onChangeText={handleValueChange}
        // placeholder={} todo check in future
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  displayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reqText: {
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    marginVertical: 16,
    padding: 6,
  },
});

export default QTextInput;
