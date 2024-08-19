import { motion } from 'framer-motion';

type ButtonProps = {
  className: string;
  text: string;
  onClick?: () => void;
};

export const ButtonComponent = (props: ButtonProps) => {
  return (
    <motion.button className={props.className} onClick={props.onClick} whileHover={{ scale: 0.97 }}>
      {props.text}
    </motion.button>
  );
};
