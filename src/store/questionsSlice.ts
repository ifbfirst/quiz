import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionsResponse } from '../interfaces';

export interface QuestionsState {
  questions: QuestionsResponse[];
  questionsIndex: number;
}

const initialState: QuestionsState = {
  questions: [],
  questionsIndex: 0,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuestionsResponse[]>) {
      state.questions = [...(state.questions || []), ...action.payload];
    },
    increaseQuestionIndex(state) {
      state.questionsIndex += 1;
    },
    resetQuestionIndex(state) {
      state.questionsIndex = 0;
    },
    resetQuestions(state) {
      state.questions.length = 0;
    },
  },
});

export const { setQuestions, increaseQuestionIndex, resetQuestionIndex, resetQuestions } = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
