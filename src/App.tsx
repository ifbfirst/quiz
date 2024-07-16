import './App.css';
// import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Quiz</h1>
      </header>

      {/* <MainPage /> */}
      <QuizPage />
    </div>
  );
}

export default App;
