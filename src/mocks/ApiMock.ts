import { Questionnaire } from 'fhir/r5';

import Q1 from './Questionnaire1.json';
import Q2 from './Questionnaire2.json';
import Q3 from './Questionnaire3.json';
import { EndpT } from '../constants';

const Q1Q: Questionnaire = Q1.questionnaire as Questionnaire;
const Q2Q: Questionnaire = Q2.questionnaire as Questionnaire;
const Q3Q: Questionnaire = Q3.questionnaire as Questionnaire;

const QuestionnairesFromJSON: Record<EndpT, Questionnaire> = {
  Q1: Q1Q,
  Q2: Q2Q,
  Q3: Q3Q,
};

// Simulate an asynchronous API request
function mockAPICall(endpoint: EndpT): PromiseLike<Questionnaire> {
  return new Promise((resolve): void => {
    setTimeout((): void => {
      const res: Questionnaire = QuestionnairesFromJSON[endpoint];

      return resolve(res as Questionnaire);
    }, 500);
  });
}

// Simulate multiple API calls and handle them with Promise.all
export async function fetchAllData(endpoints: EndpT[]): Promise<Questionnaire[]> {
  const apiCalls: PromiseLike<Questionnaire>[] = endpoints.map((endpoint: EndpT) =>
    mockAPICall(endpoint),
  );

  try {
    const responses: Questionnaire[] = await Promise.all(apiCalls);

    return responses;
  } catch (error) {
    throw error;
  }
}
