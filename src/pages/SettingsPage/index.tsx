import './index.css';
import { InputComponent } from '../../components/InputComponent';
import { SelectComponent } from '../../components/SelectComponent';
import { categoryOptions, difficultyOptions, timeOptions, typeOptions } from '../../constants';
import { Link } from 'react-router-dom';
import { setCategory, setCountQuestions, setDifficulty, setTime, setType } from '../../store/configSlice';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { amount, category, difficulty, time, type } = useAppSelector((state) => state.config);

  return (
    <div className="settings-wrapper">
      <section className="settings">
        <div className="settings-heading">
          <motion.i
            className="fa-solid fa-gear"
            animate={{ rotate: 360, scale: 1.15 }}
            whileHover={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1 }}
          ></motion.i>
          <h4>settings</h4>
        </div>
        <InputComponent
          className="input-number"
          text="Number questions"
          type="number"
          min={1}
          max={50}
          placeholder={amount}
          value={amount}
          onChange={(e) => dispatch(setCountQuestions(e.target.value))}
        />
        <SelectComponent
          className="select-category"
          options={categoryOptions}
          text="category"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        />
        <SelectComponent
          className="select-difficulty"
          options={difficultyOptions}
          text="difficulty"
          value={difficulty}
          onChange={(e) => dispatch(setDifficulty(e.target.value))}
        />
        <SelectComponent
          className="select-time"
          options={timeOptions}
          text="time"
          value={time}
          onChange={(e) => dispatch(setTime(e.target.value))}
        />
        <SelectComponent
          className="select-type"
          options={typeOptions}
          text="type"
          value={type}
          onChange={(e) => dispatch(setType(e.target.value))}
        />
      </section>
      <section className="buttons-wrapper">
        <motion.div className="btn-slot" whileHover={{ scale: 0.97 }}>
          <Link to="/statistics" className="stat-btn">
            See my stats
          </Link>
        </motion.div>
        <motion.div className="btn-slot" whileHover={{ scale: 0.97 }}>
          <Link to="/quiz" className="start-btn">
            Start quiz
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default SettingsPage;
