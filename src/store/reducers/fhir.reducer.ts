import { Reducer } from 'redux';
import { Questionnaire } from 'fhir/r5';

import {
  ActionTypes,
  QRESPONSES_SAVE,
  QUESTIONNAIRE_SAVE,
  QUESTIONNAIRE_SELECTED,
} from '../actions/actions';
import { TResponses } from '../../types';

export interface FhirQStateI {
  fhirQData: Questionnaire[] | null;
  responses: TResponses | null;
  selectedId: string;
}

const initialState: FhirQStateI = {
  fhirQData: null,
  responses: null,
  selectedId: '',
};

const fhirReducer: Reducer<FhirQStateI, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONNAIRE_SAVE:
      return {
        ...state,
        fhirQData: action.payload,
      };
    case QUESTIONNAIRE_SELECTED:
      return {
        ...state,
        selectedId: action.payload,
      };
    case QRESPONSES_SAVE:
      return {
        ...state,
        responses: action.payload,
      };
    default:
      return state;
  }
};

export default fhirReducer;
