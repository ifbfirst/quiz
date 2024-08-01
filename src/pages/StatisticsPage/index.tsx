import './index.css';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { SelectComponent } from '../../components/SelectComponent';
import { categoryOptions, difficultyOptions, typeOptions, widthProgressBar } from '../../constants';
import { useState } from 'react';

const StatisticsPage = () => {
  const { countTotalTrueAnswers, countTotalQuestions } = useSelector((state: RootState) => state.statistics);
  const countTotalTrueCategory = useSelector((state: RootState) => state.statistics.countTotalTrueCategory);
  const countTotalTrueDifficulty = useSelector((state: RootState) => state.statistics.countTotalTrueDifficulty);
  const countTotalTrueType = useSelector((state: RootState) => state.statistics.countTotalTrueType);

  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');

  return (
    <div className="statistics-wrapper">
      <h2>Statistics:</h2>
      <section>
        <p>
          Total correct answers <span>{countTotalTrueAnswers}</span> out of <span>{countTotalQuestions}</span>
        </p>
        <div className="result__bar">
          <div
            className="result__bar-progress"
            style={
              countTotalTrueAnswers
                ? {
                    width: `${(widthProgressBar / countTotalQuestions) * countTotalTrueAnswers}px`,
                  }
                : { width: '0px' }
            }
          ></div>
        </div>
      </section>
      <section>
        <SelectComponent
          className={'select-category'}
          options={categoryOptions}
          text={'category'}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <p>
          Total correct answers
          <span> {countTotalTrueCategory[category]}</span>
        </p>
        <div className="result__bar">
          <div
            className="result__bar-progress"
            style={
              countTotalTrueCategory[category]
                ? {
                    width: `${(widthProgressBar / countTotalQuestions) * countTotalTrueCategory[category]}px`,
                  }
                : { width: '0px' }
            }
          ></div>
        </div>
      </section>
      <section>
        <SelectComponent
          className={'select-difficulty'}
          options={difficultyOptions}
          text={'difficulty'}
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
        />
        <p>
          Total correct answers
          <span> {countTotalTrueDifficulty[difficulty]}</span>
        </p>
        <div className="result__bar">
          <div
            className="result__bar-progress"
            style={
              countTotalTrueDifficulty[difficulty]
                ? {
                    width: `${(widthProgressBar / countTotalQuestions) * countTotalTrueDifficulty[difficulty]}px`,
                  }
                : { width: '0px' }
            }
          ></div>
        </div>
      </section>
      <section>
        <SelectComponent
          className={'select-type'}
          options={typeOptions}
          text={'type'}
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <p>
          Total correct answers
          <span> {countTotalTrueType[type]}</span>
        </p>
        <div className="result__bar">
          <div
            className="result__bar-progress"
            style={
              countTotalTrueType[type]
                ? {
                    width: `${(widthProgressBar / countTotalQuestions) * countTotalTrueType[type]}px`,
                  }
                : { width: '0px' }
            }
          ></div>
        </div>
      </section>
      <p>
        <Link to="/" className={'back-btn'}>
          Back to settings
        </Link>
      </p>
    </div>
  );
};

export default StatisticsPage;
