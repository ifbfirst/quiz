import { useEffect, useState } from 'react';
import { setResultTime } from '../store/questionsSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const useTime = (enabled = true) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { time } = useAppSelector((state) => state.config);
  const totalSeconds = Number(time) * 60;
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [enabled]);

  useEffect(() => {
    if (!enabled || seconds > 0) {
      return;
    }

    dispatch(setResultTime(totalSeconds));
    navigate('/result');
  }, [dispatch, enabled, navigate, seconds, totalSeconds]);

  return {
    seconds,
  };
};

export default useTime;
