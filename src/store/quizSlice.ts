import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionsResponse } from '../interfaces';

export interface QuizState {
  countQuestions: string;
  category: string;
  difficulty: string;
  time: string;
  type: string;
  questions?: QuestionsResponse[];
  questionsIndex: number;
}

const initialState: QuizState = {
  countQuestions: '10',
  category: '9',
  difficulty: 'easy',
  time: '180',
  type: 'multiple',
  questions: [],
  questionsIndex: 0,
};

export const questionsSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCountQuestions(state, action: PayloadAction<string>) {
      state.countQuestions = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.time = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setQuestions(state, action: PayloadAction<QuestionsResponse[]>) {
      state.questions = [...(state.questions || []), ...action.payload];
    },
  },
});

export const { setCountQuestions, setCategory, setDifficulty, setTime, setType, setQuestions } = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
