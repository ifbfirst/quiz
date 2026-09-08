import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/ButtonComponent';
import { resetConfig } from '../../store/configSlice';
import useQuiz from '../../hooks/quizHook';
import { getMinutesSeconds } from '../../utils';
import ResultBarComponent from '../../components/ResultBarComponent';
import { motion } from 'framer-motion';
import ResultComponent from '../../components/ResultComponent';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ResultPage = () => {
  const { amount, difficulty, type, time } = useAppSelector((state) => state.config);
  const { resetQuiz, countTrueAnswers, resultTime, questions, questionsIndex } = useQuiz();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentQuestion = questions[questionsIndex];
  const { minText, secText } = getMinutesSeconds(resultTime);

  if (!currentQuestion) {
    return (
      <div className="error-page">
        <p>No quiz results to show.</p>
        <Link to="/" className="back-btn">
          Back to settings
        </Link>
      </div>
    );
  }

  return (
    <div className="result-wrapper">
      <motion.i
        className="fa-solid fa-list-check"
        animate={{ y: 0, scale: 1.15 }}
        whileHover={{ y: 8, scale: 1 }}
        transition={{ duration: 1 }}
      ></motion.i>

      <p>
        You answered <ResultComponent value={countTrueAnswers.toString()} /> out of{' '}
        <ResultComponent value={amount.toString()} /> questions correctly in <ResultComponent value={minText} /> minutes{' '}
        <ResultComponent value={secText} /> seconds
      </p>
      <ResultBarComponent countTotalQuestions={+amount} countTotalTrue={countTrueAnswers} />

      <section className="result-settings-wrapper">
        <p>
          Category:
          <ResultComponent value={currentQuestion.category} />
        </p>
        <p>
          Difficulty:
          <ResultComponent value={difficulty} />
        </p>
        <p>
          Type:
          <ResultComponent value={type} />
        </p>
        <p>
          Time:
          <ResultComponent value={time} />
        </p>
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent
          className="restart-btn"
          text="Restart quiz"
          onClick={() => {
            resetQuiz();
            navigate('/quiz');
          }}
        />
        <ButtonComponent
          className="choice-btn"
          text="Choose another quiz"
          onClick={() => {
            resetQuiz();
            dispatch(resetConfig());
            navigate('/');
          }}
        />
      </section>
    </div>
  );
};

export default ResultPage;
