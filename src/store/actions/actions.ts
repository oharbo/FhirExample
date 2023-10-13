import { Action } from 'redux';
import { Questionnaire } from "fhir/r5";

export const QUESTIONNAIRE_SAVE = 'QUESTIONNAIRE_SAVE';
export const QUESTIONNAIRE_SELECTED = 'QUESTIONNAIRE_SELECTED';
export interface QSaveActionI extends Action<typeof QUESTIONNAIRE_SAVE> { payload: Questionnaire[] }
export interface QSelectedActionI extends Action<typeof QUESTIONNAIRE_SELECTED> { payload: string }
export const QSaveAction = (payload: Questionnaire[]): QSaveActionI => ({ type: QUESTIONNAIRE_SAVE, payload });
export const QSelectedAction = (payload: string): QSelectedActionI => ({ type: QUESTIONNAIRE_SELECTED, payload });

export type ActionTypes = QSaveActionI | QSelectedActionI;

