import './index.css';
import { Link } from 'react-router-dom';
import { categoryOptions, difficultyOptions, typeOptions } from '../../constants';
import { useState } from 'react';
import ResultBarComponent from '../../components/ResultBarComponent';
import StatisticsComponent from '../../components/StatisticsComponent';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

const StatisticsPage = () => {
  const {
    countTotalTrueAnswers,
    countTotalQuestions,
    countTotalTrueCategory,
    countTotalTrueDifficulty,
    countTotalTrueType,
  } = useAppSelector((state) => state.statistics);
  const [category, setCategory] = useState('9');
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');

  return (
    <div className="statistics-wrapper">
      <h2>Statistics</h2>
      <section className="statistics-total">
        <p>
          Total correct answers <span>{countTotalTrueAnswers}</span> out of <span>{countTotalQuestions}</span>
        </p>
        <ResultBarComponent countTotalQuestions={countTotalQuestions} countTotalTrue={countTotalTrueAnswers} />
      </section>
      <StatisticsComponent
        className="select-category"
        options={categoryOptions}
        countTotalQuestions={countTotalQuestions}
        value={category}
        text="category"
        countTotalTrue={countTotalTrueCategory[category]}
        setState={setCategory}
      />
      <StatisticsComponent
        className="select-difficulty"
        options={difficultyOptions}
        value={difficulty}
        text="difficulty"
        countTotalQuestions={countTotalQuestions}
        countTotalTrue={countTotalTrueDifficulty[difficulty]}
        setState={setDifficulty}
      />
      <StatisticsComponent
        className="select-type"
        options={typeOptions}
        value={type}
        text="type"
        countTotalQuestions={countTotalQuestions}
        countTotalTrue={countTotalTrueType[type]}
        setState={setType}
      />

      <motion.div className="btn-slot" whileHover={{ scale: 0.97 }}>
        <Link to="/" className="back-btn">
          Back to settings
        </Link>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
