import './index.css';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { resetConfig } from '../../store/configSlice';
import useQuiz from '../../hooks/quizHook';
import { getMinutesSeconds, stripHtml } from '../../utils';
import ResultBarComponent from '../../components/ResultBarComponent';
import { motion } from 'framer-motion';
import { variants } from '../../constants';

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
        You answered <span>{countTrueAnswers}</span> out of <span>{amount}</span> questions correctly <br />
        in
        <span> {getMinutesSeconds(resultTime).minText} </span> minutes
        <span> {getMinutesSeconds(resultTime).secText} seconds</span>
      </p>
      <ResultBarComponent countTotalQuestions={+amount} countTotalTrue={countTrueAnswers} />

      <section className="result-settings-wrapper">
        <p>
          Category:{' '}
          <motion.span variants={variants} initial="hidden" animate="visible" exit="exit">
            {' '}
            {stripHtml(questions[questionsIndex].category)}
          </motion.span>
        </p>
        <p>
          Difficulty: <span>{difficulty}</span>
        </p>
        <p>
          Type:{' '}
          <motion.span variants={variants} initial="hidden" animate="visible" exit="exit">
            {type}
          </motion.span>
        </p>
        <p>
          Time:{' '}
          <motion.span variants={variants} initial="hidden" animate="visible" exit="exit">
            {time} min
          </motion.span>
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
