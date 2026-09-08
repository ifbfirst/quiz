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
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputComponent = ({
  className,
  id,
  text,
  labelText,
  type = 'text',
  name,
  value,
  placeholder,
  checked,
  min,
  max,
  onChange,
}: InputProps) => {
  return (
    <div className={className}>
      {text ? <div className="field-label">{text}</div> : null}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        checked={checked}
        min={min}
        max={max}
      />
      {labelText ? <label htmlFor={id}>{labelText}</label> : null}
    </div>
  );
};
