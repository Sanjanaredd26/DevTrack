import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddTask from '../components/AddTask'; // Adjust the import path as needed

const mockStore = configureStore([]);

describe('AddTask Component', () => {
  it('renders AddTask form correctly', () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTask />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText(/Add Task/i)).toBeInTheDocument();
  });

  it('submits the form correctly', () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTask />
        </MemoryRouter>
      </Provider>
    );

    // Add form submission logic and assertions
  });
});
