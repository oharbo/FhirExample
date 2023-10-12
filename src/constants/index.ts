
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

export type EndpT = 'Q1' | 'Q2' | 'Q3';

export const QEndpoints: EndpT[] = ['Q1', 'Q2', 'Q3'];

