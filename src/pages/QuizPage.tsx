import './QuizPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';

export const QuizPage = () => {
  return (
    <div className="quiz-wrapper">
      <section className="info-wrapper">
        <div className="progress-wrapper">
          <p>
            <i className="fa-solid fa-list-check"></i>1/10
          </p>
        </div>
        <div className="time-wrapper">
          <p>
            <i className="fa-solid fa-hourglass-start"></i>00:00
          </p>
        </div>
      </section>
      <section className="question-wrapper">
        <p>
          <i className="fa-solid fa-clipboard-question"></i>How many eyes do bees have?
        </p>
      </section>
      <section className="answer-wrapper">
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer1" labelText={'2'} />
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer2" labelText={'3'} />
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer3" labelText={'5'} />
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent className={'show-btn'} text={'Quit'} />
        <ButtonComponent className={'quit-btn'} text={'Next'} />
      </section>
    </div>
  );
};

export default QuizPage;
