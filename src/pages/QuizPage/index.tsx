import './index.css';
import { ButtonComponent } from '../../components/ButtonComponent';
import { InputComponent } from '../../components/InputComponent';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';

import { increaseQuestionIndex, increaseTrueAnswers, setResultTime } from '../../store/questionsSlice';
import { resetConfig } from '../../store/configSlice';
import useQuiz from '../../hooks/quizHook';
import { QuestionsResponse } from '../../interfaces';
import { getMinutesSeconds, stripHtml } from '../../utils';
import {
  setCountTotalQuestions,
  setCountTotalTrueAnswers,
  setCountTotalTrueCategory,
  setCountTotalTrueDifficulty,
  setCountTotalTrueType,
} from '../../store/statisticsSlice';
import { RootState } from '../../store/reducers';
import { motion } from 'framer-motion';
import { sectionVariants } from '../../constants';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching, questionsIndex, questions, resetQuiz, time, category, type, difficulty } = useQuiz();
  const countTrueAnswers = useSelector((state: RootState) => state.questions.countTrueAnswers);

  const [answer, setAnswer] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(Number(time) * 60);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setShuffledAnswers(getAnswersOptions(questions[0]));
    }
  }, [countTrueAnswers, questions]);

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
    const isCorrect = questions[questionsIndex].correct_answer === answer;
    if (isCorrect) {
      dispatch(increaseTrueAnswers());
    }
    if (questionsIndex === questions.length - 1) {
      navigate('/result');
      dispatch(setResultTime(Number(time) * 60 - seconds));
      dispatch(setCountTotalTrueAnswers(countTrueAnswers + (isCorrect ? 1 : 0)));
      dispatch(setCountTotalQuestions(questions.length));
      dispatch(setCountTotalTrueCategory({ category: category, count: countTrueAnswers + (isCorrect ? 1 : 0) }));
      dispatch(setCountTotalTrueDifficulty({ difficulty: difficulty, count: countTrueAnswers + (isCorrect ? 1 : 0) }));
      dispatch(setCountTotalTrueType({ type: type, count: countTrueAnswers }));
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
    return <div className="preloader"></div>;
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="error-page">
        <p>No questions for selected parameters. Try again...</p>
        <motion.p whileHover={{ scale: 0.97 }}>
          <Link to="/" className={'back-btn'}>
            Back to settings
          </Link>
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div className="quiz-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.section className="info-wrapper">
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
      </motion.section>
      <section className="question-wrapper">
        <p>
          <i className="fa-solid fa-clipboard-question"></i>
          {stripHtml(data.results[questionsIndex].question)}
        </p>
      </section>
      <motion.section
        key={questionsIndex}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="answer-wrapper"
      >
        {shuffledAnswers.map((answerOption, index) => (
          <InputComponent
            type="radio"
            className={'radio-btn'}
            name={'answer'}
            id={`${index}`}
            key={index}
            labelText={stripHtml(answerOption as string)}
            value={stripHtml(answerOption as string)}
            onChange={handler}
            checked={answer.includes(stripHtml(answerOption as string))}
          />
        ))}
      </motion.section>
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
    </motion.div>
  );
};

export default QuizPage;
