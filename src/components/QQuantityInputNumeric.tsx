import React, { useState } from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type QuantityItemProps = {
  item: QuestionnaireItem;
  onValidationChange: (isValid: boolean) => void;
  onValueChange: (value: number) => void;
  savedValue: string | null
};
type TIsValid = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type TVal = [string, React.Dispatch<React.SetStateAction<string>>];

const QQuantityInputNumeric: React.FC<QuantityItemProps> = ({
    item,
    onValidationChange,
    onValueChange,
    savedValue }) => {
  const [value, setValue]: TVal = useState(savedValue || '');
  const [isValid, setIsValid]: TIsValid = useState(true);

  const { text, extension, required } = item;
  const vF: { [key: string]: number | string | undefined } = {};

  extension?.forEach((ext): void => {
    if ((ext.url !== undefined && !ext.url.startsWith('http')) &&
        (ext.valueInteger !== undefined || ext.valueDecimal !== undefined || ext.valueString !== undefined)) {
      // console.log(ext.url, (ext.valueInteger || ext.valueString || ext.valueDecimal));
      vF[ext.url] = ext.valueInteger || ext.valueString || ext.valueDecimal ;
    }
  })

  const validateValue = (input: string): boolean => {
    const val: RegExp = /^[0-9.]+$/;
    const numericValue: number = parseFloat(input);
    if (isNaN(numericValue) || !val.test(input)) {
      return false;
    }

    if (vF.maxDecimalPlaces !== undefined) {
      const decimalPlaces = (numericValue.toString().split('.')[1] || '').length;
      if (decimalPlaces > vF.maxDecimalPlaces) {
        return false;
      }
    }

    if (vF.maxValue !== undefined && numericValue > vF.maxValue) {
      return false;
    }

    if (vF.minValue !== undefined && numericValue < vF.minValue) {
      return false;
    }

    return true;
  };

  const handleValueChange = (input: string): void => {
    setValue(input);
    const validationMessage = validateValue(input);
    const numericValue: number = parseFloat(input);

    if (!validationMessage) {
      setIsValid(false); // todo check if still needed
      onValidationChange(false);
    } else {
      setIsValid(true);
      onValidationChange(true);
      onValueChange(numericValue); // pass value above
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{text}</Text>
      <TextInput
        keyboardType="numeric" // phone-pad
        onChangeText={handleValueChange}
        placeholder={`Enter a value in ${vF.unitType || 'units'}`}
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

export default QQuantityInputNumeric;
