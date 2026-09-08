import { motion } from 'framer-motion';

type ButtonProps = {
  className?: string;
  text: string;
  onClick?: () => void;
};

export const ButtonComponent = ({ className, text, onClick }: ButtonProps) => {
  return (
    <motion.button className={className} onClick={onClick} whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.96 }}>
      {text}
    </motion.button>
  );
};
