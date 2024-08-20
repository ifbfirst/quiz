import { motion } from 'framer-motion';
import { stripHtml } from '../utils';
import { variants } from '../constants';

const ResultComponent = ({ value }: { value: string }) => {
  return (
    <motion.span variants={variants} initial="hidden" animate="visible" exit="exit">
      {stripHtml(value)}
    </motion.span>
  );
};
export default ResultComponent;
