import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import ErrorPage from './pages/ErrorPage';
import QuizPage from './pages/QuizPage';
import StatisticsPage from './pages/StatisticsPage';
import ResultPage from './pages/ResultPage';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/result',
    element: (
      <ResultPage trueAnswer={0} totalAnswer={0} timeResult={''} category={''} difficulty={''} type={''} time={''} />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/statistics',
    element: <StatisticsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="app">
    <header className="header">
      <h1>Quiz</h1>
    </header>
    <main className="main">
      <RouterProvider router={router} />
    </main>
  </div>,
);
