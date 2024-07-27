import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/ButtonComponent';
import './ResultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { resetQuestionIndex, resetQuestions } from '../store/questionsSlice';
import { resetConfig } from '../store/configSlice';

const ResultPage = () => {
  const { category, difficulty, type, time } = useSelector((state: RootState) => state.config);
  const { questions } = useSelector((state: RootState) => state.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function restartQuiz() {
    dispatch(resetQuestionIndex());
    dispatch(resetQuestions());
    navigate('/quiz');
  }
  function chooseAnotherQuiz() {
    dispatch(resetQuestionIndex());
    dispatch(resetQuestions());
    dispatch(resetConfig());
    navigate('/');
  }

  return (
    <div className="result-wrapper">
      <i className="fa-solid fa-list-check"></i>
      <p>Thank you for completing this quiz. Here are your results:</p>
      <p>
        You answered <span>true answ</span> out of <span>{questions?.length}</span> questions correctly in
        <span> result time</span> minutes
      </p>
      <p className="result__bar">
        <p className="result__bar-progress"></p>
      </p>

      <section className="settings-wrapper">
        <p>Category: {category}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Type: {type}</p>
        <p>Time: {time} min</p>
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent className={'restart-btn'} text={'Restart quiz'} onClick={restartQuiz} />
        <ButtonComponent className={'choice-btn'} text={'Choose another quiz'} onClick={chooseAnotherQuiz} />
      </section>
    </div>
  );
};

export default ResultPage;
