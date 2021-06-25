import React from 'react';
import { screen, render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  test('renders', async () => {
    render(<App />);
    expect(screen.getByText(/Welcome Home!/)).toBeInTheDocument();
  });
});
