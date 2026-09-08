import { describe, it, expect } from 'vitest';
import { getAnswerOptions, getMinutesSeconds, shuffle, stripHtml } from '../utils';

describe('Test stripHtml function', () => {
  it('should strip HTML tags from a string', () => {
    const htmlString = '<p>Hello <strong>World</strong></p>';
    const result = stripHtml(htmlString);
    expect(result).toBe('Hello World');
  });

  it('should return an empty string for an empty input', () => {
    const htmlString = '';
    const result = stripHtml(htmlString);
    expect(result).toBe('');
  });

  it('should handle text without HTML tags', () => {
    const textString = 'Hello World';
    const result = stripHtml(textString);
    expect(result).toBe('Hello World');
  });
});

describe('Test getMinutesSeconds function', () => {
  it('should return correct minutes and seconds for 125 seconds', () => {
    const seconds = 125;
    const result = getMinutesSeconds(seconds);
    expect(result).toEqual({ minText: '02', secText: '05' });
  });

  it('should return correct minutes and seconds for 60 seconds', () => {
    const seconds = 60;
    const result = getMinutesSeconds(seconds);
    expect(result).toEqual({ minText: '01', secText: '00' });
  });

  it('should return correct minutes and seconds for 0 seconds', () => {
    const seconds = 0;
    const result = getMinutesSeconds(seconds);
    expect(result).toEqual({ minText: '00', secText: '00' });
  });

  it('should return correct minutes and seconds for 3661 seconds', () => {
    const seconds = 3661;
    const result = getMinutesSeconds(seconds);
    expect(result).toEqual({ minText: '61', secText: '01' });
  });
});

describe('Test shuffle function', () => {
  it('should keep the same items after shuffling', () => {
    const items = ['a', 'b', 'c', 'd'];
    const result = shuffle(items);

    expect(result).toHaveLength(items.length);
    expect(result.sort()).toEqual([...items].sort());
    expect(result).not.toBe(items);
  });
});

describe('Test getAnswerOptions function', () => {
  it('should decode answers and include the correct option', () => {
    const result = getAnswerOptions({
      type: 'multiple',
      difficulty: 'easy',
      category: 'General Knowledge',
      question: 'Who?',
      correct_answer: 'Tom &amp; Jerry',
      incorrect_answers: ['A', 'B', 'C'],
    });

    expect(result).toHaveLength(4);
    expect(result).toContain('Tom & Jerry');
  });
});
