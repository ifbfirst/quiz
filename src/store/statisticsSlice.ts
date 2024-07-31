import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatisticsState {
  countTotalAnswers: number;
}

const initialState: StatisticsState = {
  countTotalAnswers: 0,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setCountTotal(state, action: PayloadAction<number>) {
      state.countTotalAnswers = state.countTotalAnswers + action.payload;
    },
  },
});

export const { setCountTotal } = statisticsSlice.actions;

export const statisticsReducer = statisticsSlice.reducer;
