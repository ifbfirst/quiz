import './QuizPage.css';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../components/ModalComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useFetchQuestionsQuery } from '../store/reducers';
import { setQuestions } from '../store/quizSlice';

const QuizPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const timer = 0;
  const { countQuestions, category, difficulty, type } = useSelector((state: RootState) => state.questions);
  const { data, isFetching } = useFetchQuestionsQuery({ countQuestions, category, difficulty, type });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.results) {
      dispatch(setQuestions(data.results));
    }
  }, [data, dispatch]);

  function nextAction() {
    if (!timer) {
      navigate('/result');
    }
  }
  const modalContent = (
    <div className="modal-content">
      <h2>Are you sure you want to go out?</h2>
      <Link to="/" className={'confirm-btn'}>
        Confirm
      </Link>
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

  if (!data) {
    return <div>No questions.</div>;
  }
  return (
    <div className="quiz-wrapper">
      <section className="info-wrapper">
        <div className="progress-wrapper">
          <p>
            <i className="fa-solid fa-list-check"></i>1/{countQuestions}
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
