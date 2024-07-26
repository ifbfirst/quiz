type SelectProps = {
  className: string;
  options: string[];
  text: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectComponent = (props: SelectProps) => {
  return (
    <div className={props.className}>
      <div>Choose {props.text}</div>
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option: string) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
