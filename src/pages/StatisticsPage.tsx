import { ButtonComponent } from '../components/ButtonComponent';
import './StatisticsPage.css';

export const StatisticsPage = () => {
  return (
    <div className="statistics-wrapper">
      <i className="fa-solid fa-list-check"></i>
      <p>Thank you for completing this quiz. Here are your results:</p>
      <p>
        You answered <span>5</span> out of <span>10</span> questions correctly in <span>5</span> minutes
      </p>
      <p className="statistics__bar">
        <p className="statistics__bar-progress"></p>
      </p>

      <section className="settings-wrapper">
        <p>Category: Х</p>
        <p>Difficulty: Х</p>
        <p>Type: Х</p>
        <p>Time: Х</p>
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent className={'restart-btn'} text={'Restart'} />
        <ButtonComponent className={'choice-btn'} text={'Choose another quiz'} />
      </section>
    </div>
  );
};

export default StatisticsPage;
