import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FetchQuestionsQuery {
  searchText?: string;
  page?: number;
}

export const questionsApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    fetchQuestions: builder.query<QuestionsResponse, FetchQuestionsQuery>({
      query: ({ searchText, page }) => (searchText ? `?search=${searchText}` : `?page=${page}`),
      transformResponse: (response: QuestionsResponse) => response,
    }),
  }),
});

export const useFetchPeopleQuery = questionsApi.endpoints.fetchQuestions
  .useQuery as typeof questionsApi.endpoints.fetchQuestions.useQuery;
