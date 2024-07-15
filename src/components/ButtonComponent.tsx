type ButtonProps = {
  className: string;
  text: string;
};

export const ButtonComponent = (props: ButtonProps) => {
  return <button className={props.className}>{props.text}</button>;
};
