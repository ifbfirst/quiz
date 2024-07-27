import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  countQuestions: string;
  category: string;
  difficulty: string;
  time: string;
  type: string;
}

const initialState: ConfigState = {
  countQuestions: '10',
  category: '9',
  difficulty: 'easy',
  time: '180',
  type: 'multiple',
};

export const configSlice = createSlice({
  name: 'config',
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
    resetConfig() {
      return initialState;
    },
  },
});

export const { setCountQuestions, setCategory, setDifficulty, setTime, setType, resetConfig } = configSlice.actions;

export const configReducer = configSlice.reducer;
