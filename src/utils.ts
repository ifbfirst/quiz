import { QuestionsResponse } from './interfaces';

export function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export const getMinutesSeconds = (seconds: number) => {
  const secText = (seconds % 60).toString().padStart(2, '0');
  const minText = Math.trunc(seconds / 60)
    .toString()
    .padStart(2, '0');
  return { secText, minText };
};

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function getAnswerOptions(question: QuestionsResponse): string[] {
  const answers = [...question.incorrect_answers, question.correct_answer];

  return shuffle(answers.filter((item): item is string => typeof item === 'string').map(stripHtml));
}
