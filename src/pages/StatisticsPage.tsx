import { Link } from 'react-router-dom';
import { ButtonComponent } from '../components/ButtonComponent';
import './StatisticsPage.css';

const StatisticsPage = () => {
  return (
    <div className="statistics-wrapper">
      <p> My statistics</p>
      <Link to="/">
        <ButtonComponent className={'back-btn'} text={'Back to settings'} />
      </Link>
    </div>
  );
};

export default StatisticsPage;
