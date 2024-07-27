import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QuizResponse } from '../interfaces';

export interface FetchQuestionsQuery {
  countQuestions: string;
  category: string;
  difficulty?: string;
  type?: string;
}

export const questionsApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://opentdb.com/api.php',
  }),
  endpoints: (builder) => ({
    fetchQuestions: builder.query<QuizResponse, FetchQuestionsQuery>({
      query: ({ countQuestions, category, difficulty, type }) =>
        `?amount=${countQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`,
      transformResponse: (response: QuizResponse) => response,
    }),
  }),
});
export const useFetchPeopleQuery = questionsApi.endpoints.fetchQuestions
  .useQuery as typeof questionsApi.endpoints.fetchQuestions.useQuery;
