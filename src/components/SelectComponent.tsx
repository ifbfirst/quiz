type SelectProps = {
  className: string;
  options: Record<string, string> | string[] | Record<string, number>;
  text: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectComponent = (props: SelectProps) => {
  return (
    <div className={props.className}>
      <div>Choose {props.text}</div>
      <select value={props.value} onChange={props.onChange}>
        {Object.entries(props.options).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
