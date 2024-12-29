import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AuthPage from '../components/AuthPage'; // Adjust the import path as needed

const mockStore = configureStore([]);

describe('AuthPage Component', () => {
  it('renders Sign In form', () => {
    const store = mockStore({});
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      </Provider>
    );

    // Query the Sign In button by role
    expect(getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('toggles between Sign In and Sign Up', () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      </Provider>
    );

    // Query for the toggle link
    expect(getByText(/Sign Up/i)).toBeInTheDocument();
  });
});
