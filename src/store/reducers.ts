import { combineReducers } from '@reduxjs/toolkit';
import { questionsApi } from '../servises/quizApi';
import { questionsReducer } from './questionsSlice';
import { configReducer } from './configSlice';
import { statisticsReducer } from './statisticsSlice';

const rootReducer = combineReducers({
  questions: questionsReducer,
  config: configReducer,
  statistics: statisticsReducer,
  [questionsApi.reducerPath]: questionsApi.reducer,
});

export const {
  useFetchQuestionsQuery = questionsApi.endpoints.fetchQuestions
    .useQuery as typeof questionsApi.endpoints.fetchQuestions.useQuery,
} = questionsApi;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
