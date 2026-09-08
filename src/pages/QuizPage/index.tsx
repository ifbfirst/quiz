import './index.css';
import { ButtonComponent } from '../../components/ButtonComponent';
import { InputComponent } from '../../components/InputComponent';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent';
import { increaseQuestionIndex, increaseTrueAnswers, setResultTime } from '../../store/questionsSlice';
import { resetConfig } from '../../store/configSlice';
import useQuiz from '../../hooks/quizHook';
import { getAnswerOptions, getMinutesSeconds, stripHtml } from '../../utils';
import {
  setCountTotalQuestions,
  setCountTotalTrueAnswers,
  setCountTotalTrueCategory,
  setCountTotalTrueDifficulty,
  setCountTotalTrueType,
} from '../../store/statisticsSlice';
import { motion } from 'framer-motion';
import { variants } from '../../constants';
import useTime from '../../hooks/timeHooks';
import { useAppDispatch } from '../../store/hooks';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isFetching, questionsIndex, resetQuiz, time, category, type, difficulty, countTrueAnswers } = useQuiz();
  const isQuizReady = !isFetching && Boolean(data?.results.length);
  const { seconds } = useTime(isQuizReady);

  useEffect(() => {
    const firstQuestion = data?.results[0];
    if (firstQuestion) {
      setShuffledAnswers(getAnswerOptions(firstQuestion));
    }
  }, [data]);

  const saveStatistics = (finalCorrect: number, totalQuestions: number) => {
    dispatch(setCountTotalTrueAnswers(finalCorrect));
    dispatch(setCountTotalQuestions(totalQuestions));
    dispatch(setCountTotalTrueCategory({ category, count: finalCorrect }));
    dispatch(setCountTotalTrueDifficulty({ difficulty, count: finalCorrect }));
    dispatch(setCountTotalTrueType({ type, count: finalCorrect }));
  };

  const finishQuiz = (finalCorrect: number, totalQuestions: number) => {
    dispatch(setResultTime(Number(time) * 60 - seconds));
    saveStatistics(finalCorrect, totalQuestions);
    navigate('/result');
  };

  function nextAction() {
    const quizQuestions = data?.results;
    const currentQuestion = quizQuestions?.[questionsIndex];

    if (!quizQuestions || !currentQuestion) {
      return;
    }

    const isCorrect = stripHtml(String(currentQuestion.correct_answer)) === answer;
    const finalCorrect = countTrueAnswers + (isCorrect ? 1 : 0);

    if (isCorrect) {
      dispatch(increaseTrueAnswers());
    }

    if (questionsIndex === quizQuestions.length - 1) {
      finishQuiz(finalCorrect, quizQuestions.length);
      return;
    }

    dispatch(increaseQuestionIndex());
    setShuffledAnswers(getAnswerOptions(quizQuestions[questionsIndex + 1]));
    setAnswer('');
  }

  const modalContent = (
    <div className="modal-content">
      <h2>Are you sure you want to go out?</h2>
      <ButtonComponent
        className="confirm-btn"
        text="Confirm"
        onClick={() => {
          resetQuiz();
          dispatch(resetConfig());
          navigate('/');
        }}
      />
      <ButtonComponent className="close-btn" text="Close" onClick={() => setModalIsOpen(false)} />
    </div>
  );

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAnswer(e.target.value);
    }
  };

  if (isFetching) {
    return (
      <div className="preloader-wrap">
        <div className="preloader"></div>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="error-page">
        <p>No questions for selected parameters. Try again...</p>
        <motion.div className="btn-slot" whileHover={{ scale: 0.97 }}>
          <Link to="/" className="back-btn">
            Back to settings
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = data.results[questionsIndex];
  const { minText, secText } = getMinutesSeconds(seconds);

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
            {minText}:{secText}
          </p>
        </div>
      </motion.section>
      <section className="question-wrapper">
        <p>
          <i className="fa-solid fa-clipboard-question"></i>
          {stripHtml(currentQuestion.question)}
        </p>
      </section>
      <motion.section
        key={questionsIndex}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="answer-wrapper"
      >
        {shuffledAnswers.map((answerOption, index) => (
          <InputComponent
            type="radio"
            className="radio-btn"
            name="answer"
            id={`${index}`}
            key={`${questionsIndex}-${answerOption}`}
            labelText={answerOption}
            value={answerOption}
            onChange={handler}
            checked={answer === answerOption}
          />
        ))}
      </motion.section>
      <section className="buttons-wrapper">
        <ButtonComponent className="quit-btn" text="Quit" onClick={() => setModalIsOpen(true)} />
        <ButtonComponent className="next-btn" text="Next" onClick={nextAction} />
        <ModalComponent isOpen={modalIsOpen}>{modalContent}</ModalComponent>
      </section>
    </motion.div>
  );
};

export default QuizPage;
