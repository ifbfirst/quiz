import './QuizPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import { useDispatch } from 'react-redux';

import { increaseQuestionIndex, increaseTrueAnswers, setResultTime } from '../store/questionsSlice';
import { resetConfig } from '../store/configSlice';
import useQuiz from '../hooks/quizHook';
import { QuestionsResponse } from '../interfaces';
import { getMinutesSeconds, stripHtml } from '../utils';
import { setCountTotal } from '../store/statisticsSlice';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching, questionsIndex, questions, resetQuiz, time, countTrueAnswers } = useQuiz();
  const [answer, setAnswer] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(Number(time) * 60);

  useEffect(() => {
    if (data && data.results.length > 0) {
      setShuffledAnswers(getAnswersOptions(data.results[0]));
    }
  }, [data]);

  useEffect(() => {
    if (seconds <= 0) {
      dispatch(setResultTime(Number(time) * 60 - seconds));
      navigate('/result');
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, navigate, dispatch, time]);

  function nextAction() {
    if (questions[questionsIndex].correct_answer === answer) {
      dispatch(increaseTrueAnswers());
    }
    if (questionsIndex + 1 === data?.results.length) {
      dispatch(setResultTime(Number(time) * 60 - seconds));
      dispatch(setCountTotal(countTrueAnswers));
      navigate('/result');
    } else {
      dispatch(increaseQuestionIndex());
      setShuffledAnswers(getAnswersOptions(questions[questionsIndex + 1]));
    }
    setAnswer('');
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

  const getAnswersOptions = (questionInfo: QuestionsResponse): string[] => {
    const answersOptionsArr: (string | boolean)[] = [...questionInfo.incorrect_answers, questionInfo.correct_answer];
    return answersOptionsArr.filter((answer) => typeof answer === 'string').sort(() => Math.random() - 0.5);
  };

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAnswer(e.target.value);
    }
  };

  if (isFetching) {
    return <div className="preloader" data-testid="loader"></div>;
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="quiz-wrapper">
        <p>
          <Link to="/" className={'back-btn'}>
            Back to settings
          </Link>
        </p>
        <p>No questions.</p>
      </div>
    );
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
            <i className="fa-solid fa-hourglass-start"></i>
            {getMinutesSeconds(seconds).minText}:{getMinutesSeconds(seconds).secText}
          </p>
        </div>
      </section>
      <section className="question-wrapper">
        <p>
          <i className="fa-solid fa-clipboard-question"></i>
          {stripHtml(data.results[questionsIndex].question)}
        </p>
      </section>
      <section className="answer-wrapper">
        {shuffledAnswers.map((answerOption, index) => (
          <InputComponent
            type="radio"
            className={'radio-btn'}
            name={'answer'}
            id={`${index}`}
            labelText={stripHtml(answerOption as string)}
            value={stripHtml(answerOption as string)}
            onChange={handler}
            checked={answer.includes(stripHtml(answerOption as string))}
          />
        ))}
      </section>
      <section className="buttons-wrapper">
        <ButtonComponent
          className={'quit-btn'}
          text={'Quit'}
          onClick={() => {
            setModalIsOpen(true);
          }}
        />
        <ButtonComponent
          className={'quit-btn'}
          text={'Next'}
          onClick={() => {
            nextAction();
          }}
        />
        <ModalComponent isOpen={modalIsOpen}>{modalContent}</ModalComponent>
      </section>
    </div>
  );
};

export default QuizPage;
