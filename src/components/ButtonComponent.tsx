type ButtonProps = {
  className: string;
  text: string;
  onClick?: () => void;
};

export const ButtonComponent = (props: ButtonProps) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
