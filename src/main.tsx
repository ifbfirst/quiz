import './main.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import QuizPage from './pages/QuizPage';
import StatisticsPage from './pages/StatisticsPage';
import ResultPage from './pages/ResultPage';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import SettingsPage from './pages/SettingsPage';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

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
    element: (
      <ErrorBoundary>
        <ResultPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/statistics',
    element: (
      <ErrorBoundary>
        <StatisticsPage />
      </ErrorBoundary>
    ),
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
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </main>
  </div>,
);
