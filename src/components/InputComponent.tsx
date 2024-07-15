type InputProps = {
  className: string;
  type: string;
  text: string;
};

export const InputComponent = (props: InputProps) => {
  return (
    <div className={props.className}>
      <div>{props.text}</div>
      <input type={props.type} />
    </div>
  );
};
