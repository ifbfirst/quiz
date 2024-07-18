import './App.css';
// import SettingsPage from './pages/SettingsPage';
// import QuizPage from './pages/QuizPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Quiz</h1>
      </header>
      <main className="main">
        {/* <SettingsPage />
        <QuizPage /> */}
        <StatisticsPage />
      </main>
    </div>
  );
}

export default App;
