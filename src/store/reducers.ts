import { combineReducers } from '@reduxjs/toolkit';
import { questionsApi } from '../services/quizApi';
import { questionsReducer } from './questionsSlice';
import { configReducer } from './configSlice';
import { statisticsReducer } from './statisticsSlice';

const rootReducer = combineReducers({
  questions: questionsReducer,
  config: configReducer,
  statistics: statisticsReducer,
  [questionsApi.reducerPath]: questionsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
