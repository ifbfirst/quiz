import './index.css';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { categoryOptions, difficultyOptions, typeOptions } from '../../constants';
import { useState } from 'react';
import ResultBarComponent from '../../components/ResultBarComponent';
import StatisticsComponent from '../../components/StatisticsComponent';

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
      <h2>Statistics</h2>
      <section>
        <p>
          Total correct answers <span>{countTotalTrueAnswers}</span> out of <span>{countTotalQuestions}</span>
        </p>
        <ResultBarComponent countTotalQuestions={countTotalQuestions} countTotalTrue={countTotalTrueAnswers} />
      </section>
      <StatisticsComponent
        className={'select-category'}
        options={categoryOptions}
        countTotalQuestions={countTotalQuestions}
        value={category}
        text={'category'}
        countTotalTrue={countTotalTrueCategory[category]}
        setState={setCategory}
      />
      <StatisticsComponent
        className={'select-difficulty'}
        options={difficultyOptions}
        value={difficulty}
        text={'difficulty'}
        countTotalQuestions={countTotalQuestions}
        countTotalTrue={countTotalTrueDifficulty[difficulty]}
        setState={setDifficulty}
      />
      <StatisticsComponent
        className={'select-type'}
        options={typeOptions}
        value={type}
        text={'type'}
        countTotalQuestions={countTotalQuestions}
        countTotalTrue={countTotalTrueType[type]}
        setState={setType}
      />

      <p>
        <Link to="/" className={'back-btn'}>
          Back to settings
        </Link>
      </p>
    </div>
  );
};

export default StatisticsPage;
