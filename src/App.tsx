import './App.css';
import Quiz from './components/Quiz';
import { ButtonComponent } from './components/ButtonComponent';
import {
  categoryOptions,
  difficultyOptions,
  timeOptions,
  typeOptions,
} from './constants';
import { InputComponent } from './components/InputComponent';
import { SelectComponent } from './components/SelectComponent';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Quiz</h1>
      </header>
      <main className="main">
        <section className="settings">
          <div className="settings-heading">
            <i className="fa-solid fa-gear"></i>
            <h4>settings</h4>
          </div>
          <InputComponent
            className={'input-number'}
            text={'Enter number questions from 5 to 15'}
          />
          <SelectComponent
            className={'select-category'}
            options={categoryOptions}
            text={'category'}
          />
          <SelectComponent
            className={'select-difficulty'}
            options={difficultyOptions}
            text={'difficulty'}
          />
          <SelectComponent
            className={'select-time'}
            options={timeOptions}
            text={'time'}
          />
          <SelectComponent
            className={'select-difficulty'}
            options={typeOptions}
            text={'type'}
          />
        </section>
        <section className="quiz">
          <Quiz />
          <div className="buttons">
            <ButtonComponent className={'stars-btn'} text={'See my stats'} />
            <ButtonComponent className={'start-btn'} text={'Start quiz'} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
