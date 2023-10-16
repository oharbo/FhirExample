import React from 'react';
import { View, Button } from 'react-native';

interface QButtonGroupProps {
  prevBtnTitle: string;
  handlePrevious: () => void;
  handleSubmit: () => void;
  isNextBtnVisible: boolean;
  disabled: boolean;
  handleNext: () => void;
  isSubmitBtnVisible: boolean;
}

const QButtonGroup: React.FC<QButtonGroupProps> = ({
  prevBtnTitle,
  handlePrevious,
  isNextBtnVisible,
  disabled,
  handleNext,
  handleSubmit,
  isSubmitBtnVisible,
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title={prevBtnTitle} onPress={handlePrevious} />

      {isNextBtnVisible && <Button title="Next" disabled={disabled} onPress={handleNext} />}
      {isSubmitBtnVisible && <Button title="Submit" onPress={handleSubmit} />}
    </View>
  );
};

export default QButtonGroup;
