import { Link } from 'react-router-dom';
import './StatisticsPage.css';
import { RootState } from '../store/reducers';
import { useSelector } from 'react-redux';

const StatisticsPage = () => {
  const { countTotalAnswers } = useSelector((state: RootState) => state.statistics);

  return (
    <div className="statistics-wrapper">
      <p>
        Number of correct answers: <span>{countTotalAnswers}</span>
      </p>
      <p>
        Number of correct true/false answers: <span>{countTotalAnswers}</span>
      </p>
      <p>
        Number of correct multiple answers: <span>{countTotalAnswers}</span>
      </p>
      <Link to="/" className={'back-btn'}>
        Back to settings
      </Link>
    </div>
  );
};

export default StatisticsPage;
