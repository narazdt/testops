import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders devops header title', () => {
  render(<App />);
  const headerElement = screen.getByText(/DevOps 2026 - React Docker App/i);
  expect(headerElement).toBeInTheDocument();
});