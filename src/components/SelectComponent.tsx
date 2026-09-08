type SelectProps = {
  className: string;
  options: Record<string, string> | string[] | Record<string, number>;
  text: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectComponent = ({ className, options, text, value, onChange }: SelectProps) => {
  return (
    <div className={className}>
      <div className="field-label">Choose {text}</div>
      <div className="select-field">
        <select value={value} onChange={onChange} aria-label={text}>
          {Object.entries(options).map(([key, optionValue]) => (
            <option key={key} value={optionValue}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
