interface ScreenNamesInt {
  [index: string]: string;
}

export enum ScreenNames {
  QContainer = 'QContainer',
  QForm = 'QForm',
}

export const ScreenTitleName: ScreenNamesInt = {
  QContainer: 'QContainer',
  QForm: 'QForm',
};

export type RootStackParamList = {
  [ScreenNames.QContainer]: undefined;
  [ScreenNames.QForm]: undefined;
};
