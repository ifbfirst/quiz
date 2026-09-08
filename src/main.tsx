import './main.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
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
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <SettingsPage />,
      },
      {
        path: 'quiz',
        element: <QuizPage />,
      },
      {
        path: 'result',
        element: <ResultPage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="app">
        <header className="header">
          <div className="header-brand">
            <span className="header-mark">?</span>
            <h1>Quiz</h1>
          </div>
        </header>
        <main className="main">
          <RouterProvider router={router} />
        </main>
      </div>
    </PersistGate>
  </Provider>,
);
