import './QuizPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import { useDispatch } from 'react-redux';

import { increaseQuestionIndex, increaseTrueAnswers } from '../store/questionsSlice';
import { resetConfig } from '../store/configSlice';
import useQuiz from '../hooks/quizHook';
import { QuestionsResponse } from '../interfaces';
import { stripHtml } from '../utils';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching, questionsIndex, questions, resetQuiz } = useQuiz();
  const [answersArr, setAnswersArr] = useState<string[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.results.length > 0) {
      setShuffledAnswers(getAnswersOptions(data.results[0]));
    }
  }, [data]);

  function nextAction() {
    const correctArr = [`${questions[questionsIndex].correct_answer}`];
    if (correctArr.every((element) => answersArr.includes(element)) && correctArr.length === answersArr.length) {
      dispatch(increaseTrueAnswers());
    }

    if (questionsIndex + 1 === data?.results.length) {
      navigate('/result');
    } else {
      dispatch(increaseQuestionIndex());
      setShuffledAnswers(getAnswersOptions(questions[questionsIndex + 1]));
      setAnswersArr([]);
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

  const getAnswersOptions = (questionInfo: QuestionsResponse): string[] => {
    const answersOptionsArr: (string | boolean)[] = [...questionInfo.incorrect_answers, questionInfo.correct_answer];
    return answersOptionsArr.filter((answer) => typeof answer === 'string').sort(() => Math.random() - 0.5);
  };

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAnswersArr((prev) => [...prev, e.target.value]);
    } else {
      setAnswersArr((prev) => prev.filter((element) => element !== e.target.value));
    }
  };

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
          {stripHtml(data.results[questionsIndex].question)}
        </p>
      </section>
      <section className="answer-wrapper">
        {data.results[questionsIndex].type === 'multiple'
          ? shuffledAnswers.map((answer, index) => (
              <InputComponent
                type="checkbox"
                className={'checkbox-btn'}
                name={`${index}`}
                id={`${index}`}
                labelText={stripHtml(answer as string)}
                value={stripHtml(answer as string)}
                onChange={handler}
                checked={answersArr.includes(stripHtml(answer as string))}
              />
            ))
          : shuffledAnswers.map((answer, index) => (
              <InputComponent
                type="radio"
                className={'radio-btn'}
                name={`answer`}
                id={`${index}`}
                labelText={answer}
                value={stripHtml(answer as string)}
                onChange={handler}
                checked={answersArr.includes(answer as string)}
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
