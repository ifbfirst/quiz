import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../components/ButtonComponent';
import './ResultPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { resetConfig } from '../store/configSlice';
import useQuiz from '../hooks';

const ResultPage = () => {
  const { amount, category, difficulty, type, time } = useSelector((state: RootState) => state.config);
  const { resetQuiz } = useQuiz();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="result-wrapper">
      <i className="fa-solid fa-list-check"></i>
      <p>Thank you for completing this quiz. Here are your results:</p>
      <p>
        You answered <span>true answ</span> out of <span>{amount}</span> questions correctly in
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
