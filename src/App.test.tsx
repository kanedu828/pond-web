import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './components/home';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
