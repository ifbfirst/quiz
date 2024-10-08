import { motion } from 'framer-motion';
import ResultBarComponent from './ResultBarComponent';
import { SelectComponent } from './SelectComponent';
import { variants } from '../constants';

interface StatisticsComponentProps {
  countTotalQuestions: number;
  countTotalTrue: number;
  className: string;
  text: string;
  options: { [key: string]: string };
  value: string;
  setState: (value: string) => void;
}

const StatisticsComponent = ({
  countTotalQuestions,
  className,
  options,
  value,
  text,
  countTotalTrue,
  setState,
}: StatisticsComponentProps) => {
  return (
    <motion.section variants={variants} initial="hidden" animate="visible" exit="exit">
      <SelectComponent
        className={className}
        options={options}
        text={text}
        value={value}
        onChange={(e) => {
          setState(e.target.value);
        }}
        aria-label={text}
      />
      <p>
        Total correct answers
        <span> {countTotalTrue}</span>
      </p>
      <ResultBarComponent countTotalQuestions={countTotalQuestions} countTotalTrue={countTotalTrue} />
    </motion.section>
  );
};
export default StatisticsComponent;
