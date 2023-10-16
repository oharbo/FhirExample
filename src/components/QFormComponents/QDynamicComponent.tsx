import React from 'react';
import QDisplay from './QDisplay';
import QQuantityInputNumeric from './QQuantityInputNumeric';
import QTextInput from './QTextInput';
import QSingleChoice from './QSingleChoice';
import { QuestionnaireItem } from 'fhir/r5';
import { Text, View } from 'react-native';

interface QDynamicComponentProps {
  type: string;
  key: string;
  item: QuestionnaireItem;
  handleValueChange: (value: string | number, isValid: boolean) => void;
  savedResponse: string | null;
}

const QDynamicComponent: React.FC<QDynamicComponentProps> = ({
  type,
  key,
  item,
  handleValueChange,
  savedResponse,
}) => {
  switch (type) {
    case 'display':
      return <QDisplay key={key} item={item} />;
    case 'quantity':
      return (
        <QQuantityInputNumeric
          key={key}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    case 'text':
      return (
        <QTextInput
          key={key}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    case 'coding':
      return (
        <QSingleChoice
          key={key}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    default:
      return (
        <View>
          <Text>{`Error: Unknown "${type}" type`}</Text>
        </View>
      );
  }
};

export default QDynamicComponent;
