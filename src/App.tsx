import './App.css';
import ResultPage from './pages/ResultPage';
// import SettingsPage from './pages/SettingsPage';
// import QuizPage from './pages/QuizPage';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Quiz</h1>
      </header>
      <main className="main">
        {/* <SettingsPage />
        <QuizPage /> */}
        <ResultPage
          category={'category1'}
          difficulty={'light'}
          type={'type1'}
          time={'5'}
          trueAnswer={0}
          totalAnswer={0}
          timeResult={'0'}
        />
      </main>
    </div>
  );
}

export default App;
