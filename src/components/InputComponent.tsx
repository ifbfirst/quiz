type InputProps = {
  className: string;
  id?: string;
  text?: string;
  labelText?: string | boolean;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        value={props.value}
        checked={props.checked}
      />
      <label htmlFor={props.id}>{props.labelText}</label>
    </div>
  );
};
