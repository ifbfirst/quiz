import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from '../store/reducers';
import StatisticsPage from '../pages/StatisticsPage';

const mockStore = configureStore({
  reducer: rootReducer,
  preloadedState: {
    statistics: {
      countTotalTrueAnswers: 5,
      countTotalQuestions: 10,
      countTotalTrueCategory: { '9': 3 },
      countTotalTrueDifficulty: { easy: 4 },
      countTotalTrueType: { multiple: 2 },
    },
  },
});

describe('StatisticsPage', () => {
  test('renders correctly and displays statistics', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <StatisticsPage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Choose difficulty/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Back to settings/i)).toBeInTheDocument();
  });
});
