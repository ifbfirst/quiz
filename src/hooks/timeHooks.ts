import { useEffect, useState } from 'react';
import { setResultTime } from '../store/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/reducers';

const useTime = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { time } = useSelector((state: RootState) => state.config);
  const [seconds, setSeconds] = useState(Number(time) * 60);

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

  return {
    seconds,
  };
};

export default useTime;
