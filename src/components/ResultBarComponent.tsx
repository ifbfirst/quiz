import { widthProgressBar } from '../constants';

interface ResultBarComponentProps {
  countTotalQuestions: number;
  countTotalTrue: number;
}

const ResultBarComponent = ({ countTotalQuestions, countTotalTrue }: ResultBarComponentProps) => {
  return (
    <div className="result__bar">
      <div
        className="result__bar-progress"
        style={
          countTotalTrue
            ? {
                width: `${(widthProgressBar / countTotalQuestions) * countTotalTrue}px`,
              }
            : { width: '0px' }
        }
      ></div>
    </div>
  );
};
export default ResultBarComponent;
