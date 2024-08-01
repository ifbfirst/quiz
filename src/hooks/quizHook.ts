import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useFetchQuestionsQuery } from '../store/reducers';
import { resetQuestionIndex, resetQuestions, resetTrueAnswers, setQuestions } from '../store/questionsSlice';

const useQuiz = () => {
  const dispatch = useDispatch();
  const { amount, category, difficulty, type, time } = useSelector((state: RootState) => state.config);
  const { questions, questionsIndex, countTrueAnswers, resultTime } = useSelector(
    (state: RootState) => state.questions,
  );
  const { data, isFetching } = useFetchQuestionsQuery({ amount, category, difficulty, type });

  useEffect(() => {
    if (data?.results) {
      dispatch(setQuestions(data.results));
    }
  }, [data, dispatch]);

  const resetQuiz = () => {
    dispatch(resetQuestionIndex());
    dispatch(resetQuestions());
    dispatch(resetTrueAnswers());
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
