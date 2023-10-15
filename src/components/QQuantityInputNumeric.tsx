import React, { useState, useEffect } from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type QuantityItemProps = {
  item: QuestionnaireItem;
  onValidationChange: (isValid: boolean) => void;
  onValueChange: (value: number) => void;
  savedValue: string | null
};
type TIsValid = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type TVal = [string, React.Dispatch<React.SetStateAction<string>>];

const QuantityItemComponent: React.FC<QuantityItemProps> = ({
                                                              item,
                                                              onValidationChange,
                                                              onValueChange,
                                                              savedValue }) => {
  const [value, setValue]: TVal = useState(savedValue || '');
  const [isValid, setIsValid]: TIsValid = useState(true);

  const { text, extension, required } = item;
  const vF: { [key: string]: number | string | undefined } = {};

  extension?.forEach((ext) => {
    if ((ext.url !== undefined && !ext.url.startsWith('http')) &&
        (ext.valueInteger !== undefined || ext.valueDecimal !== undefined || ext.valueString !== undefined)) {
      // console.log(ext.url, (ext.valueInteger || ext.valueString || ext.valueDecimal));
      vF[ext.url] = ext.valueInteger || ext.valueString || ext.valueDecimal ;
    }
  })

  const validateValue = (input: string) => {
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

  const handleValueChange = (input: string) => {
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
        keyboardType="numeric"
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'lightgray',
    margin: 10,
    borderRadius: 5,
  },
  displayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reqText: {
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    marginVertical: 16,
    backgroundColor: 'white',
    padding: 6,
  },
});

export default React.memo(QuantityItemComponent);
