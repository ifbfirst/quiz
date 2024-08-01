import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatisticsState {
  countTotalTrueAnswers: number;
  countTotalQuestions: number;
  countTotalTrueCategory: {
    [key: string]: number;
  };
  countTotalTrueDifficulty: {
    [key: string]: number;
  };
  countTotalTrueType: {
    [key: string]: number;
  };
}

const initialState: StatisticsState = {
  countTotalTrueAnswers: 0,
  countTotalQuestions: 0,
  countTotalTrueCategory: {
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
    '24': 0,
    '25': 0,
    '26': 0,
    '27': 0,
    '28': 0,
    '29': 0,
    '30': 0,
    '31': 0,
    '32': 0,
  },
  countTotalTrueDifficulty: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  countTotalTrueType: {
    multiple: 0,
    boolean: 0,
  },
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setCountTotalTrueAnswers(state, action: PayloadAction<number>) {
      state.countTotalTrueAnswers = state.countTotalTrueAnswers + action.payload;
    },
    setCountTotalQuestions(state, action: PayloadAction<number>) {
      state.countTotalQuestions = state.countTotalQuestions + action.payload;
    },
    setCountTotalTrueCategory(state, action: PayloadAction<{ category: string; count: number }>) {
      const { category, count } = action.payload;
      state.countTotalTrueCategory[category] = state.countTotalTrueCategory[category] + count;
    },
    setCountTotalTrueDifficulty(state, action: PayloadAction<{ difficulty: string; count: number }>) {
      const { difficulty, count } = action.payload;
      state.countTotalTrueDifficulty[difficulty] = state.countTotalTrueDifficulty[difficulty] + count;
    },
    setCountTotalTrueType(state, action: PayloadAction<{ type: string; count: number }>) {
      const { type, count } = action.payload;
      state.countTotalTrueType[type] = state.countTotalTrueType[type] + count;
    },
  },
});

export const {
  setCountTotalTrueAnswers,
  setCountTotalQuestions,
  setCountTotalTrueCategory,
  setCountTotalTrueDifficulty,
  setCountTotalTrueType,
} = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;
