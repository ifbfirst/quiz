import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import ErrorPage from './pages/ErrorPage';
import QuizPage from './pages/QuizPage';
import StatisticsPage from './pages/StatisticsPage';
import ResultPage from './pages/ResultPage';
import './main.css';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SettingsPage />,
  },
  {
    path: '/quiz',
    element: (
      <ErrorBoundary>
        <QuizPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/statistics',
    element: <StatisticsPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="app">
    <header className="header">
      <h1>Quiz</h1>
    </header>
    <main className="main">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  </div>,
);
