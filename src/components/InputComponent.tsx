type InputProps = {
  className: string;
  text: string;
};

export const InputComponent = (props: InputProps) => {
  return (
    <div className={props.className}>
      <div>{props.text}</div>
      <input type="type" />
    </div>
  );
};
