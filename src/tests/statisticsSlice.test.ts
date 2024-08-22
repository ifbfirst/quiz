import { describe, it, expect } from 'vitest';
import {
  setCountTotalQuestions,
  setCountTotalTrueAnswers,
  setCountTotalTrueCategory,
  setCountTotalTrueDifficulty,
  setCountTotalTrueType,
  statisticsSlice,
} from '../store/statisticsSlice';

describe('Statistics slice', () => {
  const initialState = {
    countTotalTrueAnswers: 0,
    countTotalQuestions: 0,
    countTotalTrueCategory: {
      '9': 0,
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

  it('should handle setCountTotalTrueAnswers', () => {
    const newState = statisticsSlice.reducer(initialState, setCountTotalTrueAnswers(5));
    expect(newState.countTotalTrueAnswers).toBe(5);

    const updatedState = statisticsSlice.reducer(newState, setCountTotalTrueAnswers(3));
    expect(updatedState.countTotalTrueAnswers).toBe(8);
  });

  it('should handle setCountTotalQuestions', () => {
    const newState = statisticsSlice.reducer(initialState, setCountTotalQuestions(2));
    expect(newState.countTotalQuestions).toBe(2);

    const updatedState = statisticsSlice.reducer(newState, setCountTotalQuestions(4));
    expect(updatedState.countTotalQuestions).toBe(6);
  });

  it('should handle setCountTotalTrueCategory', () => {
    const categoryAction = setCountTotalTrueCategory({ category: '9', count: 1 });

    const newState = statisticsSlice.reducer(initialState, categoryAction);
    expect(newState.countTotalTrueCategory['9']).toBe(1);

    const updatedState = statisticsSlice.reducer(newState, categoryAction);
    expect(updatedState.countTotalTrueCategory['9']).toBe(2);
  });

  it('should handle setCountTotalTrueDifficulty', () => {
    const difficultyAction = setCountTotalTrueDifficulty({ difficulty: 'easy', count: 1 });
    const newState = statisticsSlice.reducer(initialState, difficultyAction);
    expect(newState.countTotalTrueDifficulty.easy).toBe(1);

    const updatedState = statisticsSlice.reducer(newState, difficultyAction);
    expect(updatedState.countTotalTrueDifficulty.easy).toBe(2);
  });

  it('should handle setCountTotalTrueType', () => {
    const typeAction = setCountTotalTrueType({ type: 'multiple', count: 1 });
    const newState = statisticsSlice.reducer(initialState, typeAction);
    expect(newState.countTotalTrueType.multiple).toBe(1);

    const updatedState = statisticsSlice.reducer(newState, typeAction);
    expect(updatedState.countTotalTrueType.multiple).toBe(2);
  });
});
