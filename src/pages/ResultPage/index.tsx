import './index.css';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { resetConfig } from '../../store/configSlice';
import useQuiz from '../../hooks/quizHook';
import { getMinutesSeconds } from '../../utils';
import ResultBarComponent from '../../components/ResultBarComponent';
import { motion } from 'framer-motion';
import ResultComponent from '../../components/ResultComponent';

const ResultPage = () => {
  const { amount, difficulty, type, time } = useSelector((state: RootState) => state.config);
  const { resetQuiz, countTrueAnswers, resultTime, questions, questionsIndex } = useQuiz();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="result-wrapper">
      <motion.i
        className="fa-solid fa-list-check"
        animate={{ y: 0, scale: 1.2 }}
        whileHover={{ y: 10, scale: 1 }}
        transition={{ duration: 1 }}
      ></motion.i>

      <p>
        You answered <ResultComponent value={countTrueAnswers.toString()} /> out of{' '}
        <ResultComponent value={amount.toString()} /> questions correctly in{' '}
        <ResultComponent value={getMinutesSeconds(resultTime).minText} /> minutes{' '}
        <ResultComponent value={getMinutesSeconds(resultTime).secText} /> seconds
      </p>
      <ResultBarComponent countTotalQuestions={+amount} countTotalTrue={countTrueAnswers} />

      <section className="result-settings-wrapper">
        <p>
          Category:
          <ResultComponent value={questions[questionsIndex].category} />
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
          className={'restart-btn'}
          text={'Restart quiz'}
          onClick={() => {
            resetQuiz();
            navigate('/quiz');
          }}
        />
        <ButtonComponent
          className={'choice-btn'}
          text={'Choose another quiz'}
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
