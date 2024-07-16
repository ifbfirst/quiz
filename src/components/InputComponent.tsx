type InputProps = {
  className: string;
  id?: string;
  labelText?: string;
  type?: string;
  name?: string;
  placeholder?: string;
};

export const InputComponent = (props: InputProps) => {
  return (
    <div className={props.className}>
      <input type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} />
      <label htmlFor={props.id}>{props.labelText}</label>
    </div>
  );
};
