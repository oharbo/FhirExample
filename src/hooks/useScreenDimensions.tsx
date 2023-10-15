import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export type ScreenSize = {
  width: number;
  height: number;
};
type TScreenSize = [ScreenSize, React.Dispatch<React.SetStateAction<ScreenSize>>];

const useScreenDimensions = (): ScreenSize => {
  const [screenSize, setScreenSize]: TScreenSize = useState<ScreenSize>({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const updateScreenSize = () => {
    const { width, height } = Dimensions.get('window');
    setScreenSize({ width, height });
  };

  useEffect(() => {
    // Subscribe to the Dimensions change event
    Dimensions.addEventListener('change', updateScreenSize);

    // No need to clean up the event listener when the component unmounts
    // as Dimensions doesn't have removeEventListener
  }, []);

  return screenSize;
};

export default useScreenDimensions;



