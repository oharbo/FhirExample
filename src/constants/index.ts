interface ScreenNamesInt {
  [index: string]: string;
}

export const ScreenTitleName: ScreenNamesInt = {
  QContainer: 'Questionnaire Challenge',
  QForm: 'QForm',
  QSummary: 'Questionnaire Summary',
};

export enum ScreenNames {
  QContainer = 'QContainer',
  QForm = 'QForm',
  QSummary = 'QSummary',
}

export type RootStackParamList = {
  [ScreenNames.QContainer]: undefined;
  [ScreenNames.QForm]: undefined;
  [ScreenNames.QSummary]: undefined;
};

export type EndpT = 'Q1' | 'Q2' | 'Q3';

export const QEndpoints: EndpT[] = ['Q1', 'Q2', 'Q3'];
