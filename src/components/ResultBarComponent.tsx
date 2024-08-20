import { motion } from 'framer-motion';

interface ResultBarComponentProps {
  countTotalQuestions: number;
  countTotalTrue: number;
}

const ResultBarComponent = ({ countTotalQuestions, countTotalTrue }: ResultBarComponentProps) => {
  const progressPercentage = countTotalQuestions ? (countTotalTrue / countTotalQuestions) * 100 : 0;

  return (
    <div className="result__bar">
      <motion.div
        className="result__bar-progress"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      ></motion.div>
    </div>
  );
};
export default ResultBarComponent;
