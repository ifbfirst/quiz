import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/ButtonComponent';
import './ResultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { resetConfig } from '../store/configSlice';
import useQuiz from '../hooks/quizHook';
import { getMinutesSeconds } from '../utils';

const ResultPage = () => {
  const { amount, category, difficulty, type, time } = useSelector((state: RootState) => state.config);
  const { resetQuiz, countTrueAnswers, resultTime } = useQuiz();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const style = {
    width: `${(300 / +amount) * countTrueAnswers}px`,
  };

  return (
    <div className="result-wrapper">
      <i className="fa-solid fa-list-check"></i>
      <p>
        You answered <span>{countTrueAnswers}</span> out of <span>{amount}</span> questions correctly <br />
        in
        <span> {getMinutesSeconds(resultTime).minText} </span> minutes
        <span> {getMinutesSeconds(resultTime).secText} seconds</span>
      </p>
      <p className="result__bar">
        <p className="result__bar-progress" style={style}></p>
      </p>

      <section className="settings-wrapper">
        <p>Category: {category}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Type: {type}</p>
        <p>Time: {time} min</p>
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
