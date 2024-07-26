import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuizState {
  countQuestions: string;
  category: string;
  difficulty: string;
  time: string;
  type: string;
  questions: string[];
  answers: string[];
}

const initialState: QuizState = {
  countQuestions: '10',
  category: 'General Knowledge',
  difficulty: 'Easy',
  time: '180',
  type: 'True/False',
  questions: [],
  answers: [],
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
  },
});

export const { setCountQuestions, setCategory, setDifficulty, setTime, setType } = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
