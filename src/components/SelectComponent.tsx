type SelectProps = {
  className: string;
  options: string[];
  text: string;
};

export const SelectComponent = (props: SelectProps) => {
  return (
    <div className={props.className}>
      <div>Choose {props.text}</div>
      <select>
        {props.options.map((option: string) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
