import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { setCategory, setCountQuestions } from '../store/configSlice';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';
import SettingsPage from '../pages/SettingsPage';

const middlewares: never[] = [];
const mockStore = configureStore(middlewares);

const renderWithRedux = (
  component: string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined,
  { initialState } = { initialState: {} },
) => {
  const store = mockStore(initialState);
  return {
    ...render(
      <Provider store={store}>
        {' '}
        <MemoryRouter>{component} </MemoryRouter>
      </Provider>,
    ),
    store,
  };
};

describe('SettingsPage', () => {
  it('renders correctly and displays initial settings', () => {
    const initialState = {
      config: {
        amount: 10,
        category: 'general',
        difficulty: 'easy',
        time: '30',
        type: 'multiple',
      },
    };
    renderWithRedux(<SettingsPage />, { initialState });

    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/difficulty/i)).toBeInTheDocument();
    expect(screen.getByText(/time/i)).toBeInTheDocument();
    expect(screen.getByText(/type/i)).toBeInTheDocument();
  });

  it('dispatches setCountQuestions action on number input change', () => {
    const initialState = {
      config: { amount: 10, category: '', difficulty: '', time: '', type: '' },
    };
    const { store } = renderWithRedux(<SettingsPage />, { initialState });

    const input = screen.getByPlaceholderText(/10/i);
    fireEvent.change(input, { target: { value: '20' } });

    const actions = store.getActions();
    expect(actions).toContainEqual(setCountQuestions('20'));
  });

  it('dispatches setCategory action on category selection change', () => {
    const initialState = {
      config: { amount: 10, category: 'general', difficulty: '', time: '', type: '' },
    };
    const { store } = renderWithRedux(<SettingsPage />, { initialState });

    const select = screen.getByText(/category/i).closest('select') as HTMLSelectElement | null;

    if (select) {
      fireEvent.change(select, { target: { value: 'sports' } });

      const actions = store.getActions();
      expect(actions).toContainEqual(setCategory('sports'));
    }
  });
  it('dispatches setType action on type selection change', () => {
    const initialState = {
      config: { amount: 10, category: '', difficulty: '', time: '', type: 'multiply' },
    };
    const { store } = renderWithRedux(<SettingsPage />, { initialState });
    const select = screen.getByText(/type/i).closest('select') as HTMLSelectElement | null;

    if (select) {
      fireEvent.change(select, { target: { value: 'multiply' } });

      const actions = store.getActions();
      expect(actions).toContainEqual(setCategory('multiply'));
    }
  });
  it('dispatches setDifficulty action on difficulty selection change', () => {
    const initialState = {
      config: { amount: 10, category: '', difficulty: 'easy', time: '', type: '' },
    };
    const { store } = renderWithRedux(<SettingsPage />, { initialState });

    const select = screen.getByText(/difficulty/i).closest('select') as HTMLSelectElement | null;

    if (select) {
      fireEvent.change(select, { target: { value: 'easy' } });

      const actions = store.getActions();
      expect(actions).toContainEqual(setCategory('easy'));
    }
  });
});
