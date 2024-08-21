import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';
import SettingsPage from '../pages/SettingsPage';

describe('App', () => {
  test('renders the settings page by default', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MemoryRouter initialEntries={['/']}>
            <SettingsPage />
          </MemoryRouter>
        </PersistGate>
      </Provider>,
    );

    expect(screen.getByText(/Start quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });
});
