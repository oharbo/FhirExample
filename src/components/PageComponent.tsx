import React, {FC, ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {
  Edges,
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Theme, useTheme } from '@react-navigation/native';

type TStyles = {
  flx1: ViewStyle;
};

const styles: TStyles = StyleSheet.create<TStyles>({
  flx1: { flex: 1 },
});

interface PageComponentInterface extends SafeAreaViewProps {
  children: ReactNode;
  edges: Edges;
  safeAreaStyles?: ViewStyle;
  style?: ViewStyle;
  useModalBackground?: boolean;
  useSafeAreaView?: boolean;
}

export const PageComponent: FC<PageComponentInterface> = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  safeAreaStyles,
  style,
  useSafeAreaView = true,
}: PageComponentInterface) => {
  const {colors}: Theme = useTheme();

  const bg: ViewStyle = {backgroundColor: colors?.card};

  if (useSafeAreaView) {
    return (
      <SafeAreaView
        style={[styles.flx1, bg, safeAreaStyles]}
        edges={edges}
        testID="page-component-view">
        <View style={[styles.flx1, style]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return <View style={[styles.flx1, bg, style]}>{children}</View>;
};
