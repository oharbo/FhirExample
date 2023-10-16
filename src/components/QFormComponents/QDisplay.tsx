import React from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { View, Text } from 'react-native';
import { styles } from '../../styles/shared';

type QDisplayProps = {
  item: QuestionnaireItem;
};

const QDisplay: React.FC<QDisplayProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{item?.text}</Text>
    </View>
  );
};

export default QDisplay;
