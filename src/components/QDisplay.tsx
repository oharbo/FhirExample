import React from 'react';
import { QuestionnaireItem } from 'fhir/r5';
import { View, Text, StyleSheet } from 'react-native';


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
});

export default QDisplay;
