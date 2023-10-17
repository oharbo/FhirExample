import React, { useState } from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../../styles/shared';

type QuantityItemProps = {
  item: QuestionnaireItem;
  onValueChange: (value: number, isValid: boolean) => void;
  savedValue: string | null;
};
type TVal = [string, React.Dispatch<React.SetStateAction<string>>];
type TVF = { [key: string]: number | string | undefined };

const QQuantityInputNumeric: React.FC<QuantityItemProps> = ({
  item,
  onValueChange,
  savedValue,
}) => {
  const [value, setValue]: TVal = useState(savedValue || '');

  const { text, extension, required } = item;
  const vF: TVF = {};

  extension?.forEach((ext): void => {
    if (
      ext.url !== undefined &&
      !ext.url.startsWith('http') &&
      (ext.valueInteger !== undefined ||
        ext.valueDecimal !== undefined ||
        ext.valueString !== undefined)
    ) {
      vF[ext.url] = ext.valueInteger || ext.valueString || ext.valueDecimal;
    }
  });

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
    const validationMessage: boolean = validateValue(input);
    const numericValue: number = parseFloat(input);

    onValueChange(numericValue, validationMessage);
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
      {!!required && <Text style={styles.reqText}>{'* Required'}</Text>}
    </View>
  );
};

export default QQuantityInputNumeric;
