import './QuizPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import { useDispatch } from 'react-redux';

import { increaseQuestionIndex } from '../store/questionsSlice';
import { resetConfig } from '../store/configSlice';
import useQuiz from '../hooks';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching, questionsIndex, resetQuiz } = useQuiz();

  function nextAction() {
    if (questionsIndex + 1 === data?.results.length) {
      navigate('/result');
    } else {
      dispatch(increaseQuestionIndex());
    }
  }

  const modalContent = (
    <div className="modal-content">
      <h2>Are you sure you want to go out?</h2>
      <ButtonComponent
        className={'confirm-btn'}
        text={'Confirm'}
        onClick={() => {
          resetQuiz();
          dispatch(resetConfig());
          navigate('/');
        }}
      ></ButtonComponent>
      <ButtonComponent
        className={'close-btn'}
        text={'Close'}
        onClick={() => {
          setModalIsOpen(false);
        }}
      />
    </div>
  );
  if (isFetching) {
    return <div className="preloader" data-testid="loader"></div>;
  }

  if (!data || data.results.length === 0) {
    return <div>No questions.</div>;
  }
  return (
    <div className="quiz-wrapper">
      <section className="info-wrapper">
        <div className="progress-wrapper">
          <p>
            <i className="fa-solid fa-list-check"></i> {questionsIndex + 1}/{data.results.length}
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
          <i className="fa-solid fa-clipboard-question"></i>
          {data.results[questionsIndex].question}
        </p>
      </section>
      <section className="answer-wrapper">
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer1" labelText={'2'} />
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer2" labelText={'3'} />
        <InputComponent type="radio" className={'radio-btn'} name={'answer'} id="answer3" labelText={'5'} />
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent
          className={'quit-btn'}
          text={'Quit'}
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
        <ButtonComponent className={'quit-btn'} text={'Next'} onClick={nextAction} />
        <ModalComponent isOpen={modalIsOpen}>{modalContent}</ModalComponent>
      </section>
    </div>
  );
};

export default QuizPage;
