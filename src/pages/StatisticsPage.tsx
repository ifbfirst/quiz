import { Link } from 'react-router-dom';
import './StatisticsPage.css';

const StatisticsPage = () => {
  return (
    <div className="statistics-wrapper">
      <p> My statistics</p>
      <Link to="/" className={'back-btn'}>
        Back to settings
      </Link>
    </div>
  );
};

export default StatisticsPage;
