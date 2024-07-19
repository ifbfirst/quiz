import { ButtonComponent } from '../components/ButtonComponent';
import './ResultPage.css';

type ResultPageProps = {
  trueAnswer: number;
  totalAnswer: number;
  timeResult: string;
  category: string;
  difficulty: string;
  type: string;
  time: string;
};

const ResultPage = (props: ResultPageProps) => {
  return (
    <div className="result-wrapper">
      <i className="fa-solid fa-list-check"></i>
      <p>Thank you for completing this quiz. Here are your results:</p>
      <p>
        You answered <span>{props.trueAnswer}</span> out of <span>{props.totalAnswer}</span> questions correctly in
        <span> {props.timeResult}</span> minutes
      </p>
      <p className="result__bar">
        <p className="result__bar-progress"></p>
      </p>

      <section className="settings-wrapper">
        <p>Category: {props.category}</p>
        <p>Difficulty: {props.difficulty}</p>
        <p>Type: {props.type}</p>
        <p>Time: {props.time} min</p>
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent className={'restart-btn'} text={'Restart'} />
        <ButtonComponent className={'choice-btn'} text={'Choose another quiz'} />
      </section>
    </div>
  );
};

export default ResultPage;
