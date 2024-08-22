import { describe, it, expect } from 'vitest';
import {
  increaseQuestionIndex,
  increaseTrueAnswers,
  questionsSlice,
  resetQuestionIndex,
  resetTrueAnswers,
  setResultTime,
} from '../store/questionsSlice';

describe('Questions slice', () => {
  const initialState = {
    questions: [],
    questionsIndex: 0,
    countTrueAnswers: 0,
    resultTime: 0,
  };

  it('should handle increaseQuestionIndex', () => {
    const newState = questionsSlice.reducer(initialState, increaseQuestionIndex());
    expect(newState.questionsIndex).toBe(1);

    const updatedState = questionsSlice.reducer(newState, increaseQuestionIndex());
    expect(updatedState.questionsIndex).toBe(2);
  });

  it('should handle resetQuestionIndex', () => {
    const newState = questionsSlice.reducer(initialState, increaseQuestionIndex());
    const resetState = questionsSlice.reducer(newState, resetQuestionIndex());
    expect(resetState.questionsIndex).toBe(0);
  });

  it('should handle increaseTrueAnswers', () => {
    const newState = questionsSlice.reducer(initialState, increaseTrueAnswers());
    expect(newState.countTrueAnswers).toBe(1);

    const updatedState = questionsSlice.reducer(newState, increaseTrueAnswers());
    expect(updatedState.countTrueAnswers).toBe(2);
  });

  it('should handle resetTrueAnswers', () => {
    const newState = questionsSlice.reducer(initialState, increaseTrueAnswers());
    const resetState = questionsSlice.reducer(newState, resetTrueAnswers());
    expect(resetState.countTrueAnswers).toBe(0);
  });

  it('should handle setResultTime', () => {
    const newState = questionsSlice.reducer(initialState, setResultTime(30));
    expect(newState.resultTime).toBe(30);

    const updatedState = questionsSlice.reducer(newState, setResultTime(45));
    expect(updatedState.resultTime).toBe(45);
  });
});
