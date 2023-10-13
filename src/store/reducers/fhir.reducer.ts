import { Reducer } from 'redux';
import { ActionTypes, QUESTIONNAIRE_SAVE } from '../actions/actions';
import { Questionnaire } from 'fhir/r5';

export interface FhirQStateI {
  fhirQData: Questionnaire[] | null;
}

const initialState: FhirQStateI = { fhirQData: null };

const fhirReducer: Reducer<FhirQStateI, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONNAIRE_SAVE:
      return { fhirQData: action.payload };
    default:
      return state;
  }
};

export default fhirReducer;
