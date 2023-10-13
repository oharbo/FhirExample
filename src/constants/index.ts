interface ScreenNamesInt {
  [index: string]: string;
}

export const ScreenTitleName: ScreenNamesInt = {
  QContainer: 'Questionnaire Challenge',
  QForm: 'QForm',
};

export enum ScreenNames {
  QContainer = 'QContainer',
  QForm = 'QForm',
}

export type RootStackParamList = {
  [ScreenNames.QContainer]: undefined;
  [ScreenNames.QForm]: {
    id: string,
  };
};

export type EndpT = 'Q1' | 'Q2' | 'Q3';

export const QEndpoints: EndpT[] = ['Q1', 'Q2', 'Q3'];

