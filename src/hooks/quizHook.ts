import { useEffect } from 'react';
import { useFetchQuestionsQuery } from '../services/quizApi';
import { resetQuizState, setQuestions } from '../store/questionsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const useQuiz = () => {
  const dispatch = useAppDispatch();
  const { amount, category, difficulty, type, time } = useAppSelector((state) => state.config);
  const { questions, questionsIndex, countTrueAnswers, resultTime } = useAppSelector((state) => state.questions);
  const { data, isFetching } = useFetchQuestionsQuery({ amount, category, difficulty, type });

  useEffect(() => {
    if (data?.results) {
      dispatch(setQuestions(data.results));
    }
  }, [data, dispatch]);

  const resetQuiz = () => {
    dispatch(resetQuizState());
  };

  return {
    data,
    isFetching,
    questionsIndex,
    questions,
    resetQuiz,
    countTrueAnswers,
    time,
    resultTime,
    category,
    difficulty,
    type,
  };
};

export default useQuiz;
