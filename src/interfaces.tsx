export interface QuizResponse {
  response_code: number;
  results: QuestionsResponse[];
}

export interface QuestionsResponse {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string | boolean;
  incorrect_answers: string[] | boolean[];
}
