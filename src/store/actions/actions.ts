import { Action } from 'redux';
import { Questionnaire } from "fhir/r5";

export const QUESTIONNAIRE_SAVE = 'QUESTIONNAIRE_SAVE';
export interface QSaveActionI extends Action<typeof QUESTIONNAIRE_SAVE> { payload: Questionnaire[] }
export const QSaveAction = (payload: Questionnaire[]): QSaveActionI => ({ type: QUESTIONNAIRE_SAVE, payload });

export type ActionTypes = QSaveActionI;

