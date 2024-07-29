import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useFetchQuestionsQuery } from './store/reducers';
import { resetQuestionIndex, resetQuestions, setQuestions } from './store/questionsSlice';

const useQuiz = () => {
  const dispatch = useDispatch();
  const { amount, category, difficulty, type } = useSelector((state: RootState) => state.config);
  const { questionsIndex } = useSelector((state: RootState) => state.questions);
  const { data, isFetching } = useFetchQuestionsQuery({ amount, category, difficulty, type });

  useEffect(() => {
    if (data?.results) {
      dispatch(setQuestions(data.results));
    }
  }, [data, dispatch]);

  const resetQuiz = () => {
    dispatch(resetQuestionIndex());
    dispatch(resetQuestions());
  };

  return { data, isFetching, questionsIndex, resetQuiz };
};

export default useQuiz;
