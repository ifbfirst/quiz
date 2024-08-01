import ResultBarComponent from './ResultBarComponent';
import { SelectComponent } from './SelectComponent';

interface StatisticsComponentProps {
  countTotalQuestions: number;
  countTotalTrue: number;
  className: string;
  text: string;
  options: { [key: string]: string };
  value: string;
  setState: (value: string) => void;
}

const StatisticsComponent = ({
  countTotalQuestions,
  className,
  options,
  value,
  text,
  countTotalTrue,
  setState,
}: StatisticsComponentProps) => {
  return (
    <section>
      <SelectComponent
        className={className}
        options={options}
        text={text}
        value={value}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <p>
        Total correct answers
        <span> {countTotalTrue}</span>
      </p>
      <ResultBarComponent countTotalQuestions={countTotalQuestions} countTotalTrue={countTotalTrue} />
    </section>
  );
};
export default StatisticsComponent;
