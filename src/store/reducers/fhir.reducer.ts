import { Reducer } from 'redux';
import { Questionnaire } from 'fhir/r5';

import { ActionTypes, QUESTIONNAIRE_SAVE, QUESTIONNAIRE_SELECTED } from "../actions/actions";

export interface FhirQStateI {
  fhirQData: Questionnaire[] | null;
  selectedId: string;
}

const initialState: FhirQStateI = {
  fhirQData: null,
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
      console.log(action);
      return {
        ...state,
        selectedId: action.payload,
      }
    default:
      return state;
  }
};

export default fhirReducer;
