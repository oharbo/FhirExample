import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import fhirReducer from './reducers/fhir.reducer';

const middlewares: SagaMiddleware[] = [];

const rootReducer = combineReducers({
  fhirQuestionnaires: fhirReducer,
});

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}
const middlewareEnhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, middlewareEnhancer);

// @ts-ignore
store.run = sagaMiddleware.run;

export default store;
