import './SettingsPage.css';
import { InputComponent } from '../components/InputComponent';
import { SelectComponent } from '../components/SelectComponent';
import { categoryOptions, difficultyOptions, timeOptions, typeOptions } from '../constants';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { setCategory, setCountQuestions, setDifficulty, setTime, setType } from '../store/quizSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { countQuestions, category, difficulty, time, type } = useSelector((state: RootState) => state.questions);
  return (
    <div className="settings-wrapper">
      <section className="settings">
        <div className="settings-heading">
          <i className="fa-solid fa-gear"></i>
          <h4>settings</h4>
        </div>
        <InputComponent
          className={'input-number'}
          text={'Number questions'}
          placeholder={countQuestions}
          onChange={(e) => dispatch(setCountQuestions(e.target.value))}
        />
        <SelectComponent
          className={'select-category'}
          options={categoryOptions}
          text={'category'}
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        />
        <SelectComponent
          className={'select-difficulty'}
          options={difficultyOptions}
          text={'difficulty'}
          value={difficulty}
          onChange={(e) => dispatch(setDifficulty(e.target.value))}
        />
        <SelectComponent
          className={'select-time'}
          options={timeOptions}
          text={'time'}
          value={time}
          onChange={(e) => dispatch(setTime(e.target.value))}
        />
        <SelectComponent
          className={'select-type'}
          options={typeOptions}
          text={'type'}
          value={type}
          onChange={(e) => dispatch(setType(e.target.value))}
        />
      </section>
      <section className="buttons-wrapper">
        <Link to={'/statistics'} className={'stat-btn'}>
          See my stats
        </Link>
        <Link to={'/quiz'} className={'start-btn'}>
          Start quiz
        </Link>
      </section>
    </div>
  );
};

export default SettingsPage;
