import React from 'react';
import QDisplay from './QDisplay';
import QQuantityInputNumeric from './QQuantityInputNumeric';
import QTextInput from './QTextInput';
import QSingleChoice from './QSingleChoice';
import { QuestionnaireItem } from 'fhir/r5';
import { Text, View } from 'react-native';
import { styles } from '../../styles/shared';

interface QDynamicComponentProps {
  type: string;
  keyP: string;
  item: QuestionnaireItem;
  handleValueChange: (value: string | number, isValid: boolean) => void;
  savedResponse: string | null;
}

const QDynamicComponent: React.FC<QDynamicComponentProps> = ({
  type,
  keyP,
  item,
  handleValueChange,
  savedResponse,
}) => {
  switch (type) {
    case 'display':
      return <QDisplay key={keyP} item={item} />;
    case 'quantity':
      return (
        <QQuantityInputNumeric
          key={keyP}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    case 'text':
      return (
        <QTextInput
          key={keyP}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    case 'coding':
      return (
        <QSingleChoice
          key={keyP}
          item={item}
          onValueChange={handleValueChange}
          savedValue={savedResponse}
        />
      );
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>{`Error: Unknown "${type}" type`}</Text>
        </View>
      );
  }
};

export default QDynamicComponent;
