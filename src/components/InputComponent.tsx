type InputProps = {
  className: string;
  id?: string;
  text?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent = (props: InputProps) => {
  return (
    <div className={props.className}>
      <div>{props.text}</div>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};
