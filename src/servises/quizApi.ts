import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { QuizResponse } from '../interfaces';

export interface FetchQuestionsQuery {
  amount: string;
  category: string;
  difficulty: string;
  type: string;
}

export const questionsApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://opentdb.com/api.php',
  }),
  endpoints: (builder) => ({
    fetchQuestions: builder.query<QuizResponse, FetchQuestionsQuery>({
      query: ({ amount, category, difficulty, type }) =>
        `?${new URLSearchParams({
          amount,
          category,
          difficulty,
          type,
        }).toString()}`,
    }),
  }),
});
export const useFetchPeopleQuery = questionsApi.endpoints.fetchQuestions
  .useQuery as typeof questionsApi.endpoints.fetchQuestions.useQuery;
