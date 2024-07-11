import './App.css';
import Category from './components/Category';
import Difficulty from './components/Difficulty';
import NumberQuestions from './components/NumberQuestions';
import Quiz from './components/Quiz';
import StarsButton from './components/StarsButton';
import StartButton from './components/StartButton';
import Time from './components/Time';
import Type from './components/Type';

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
          <NumberQuestions />
          <Category />
          <Difficulty />
          <Time />
          <Type />
        </section>
        <section className="quiz">
          <Quiz />
          <div className="buttons">
            <StarsButton />
            <StartButton />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
