import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const homePath = screen.getByText(<Home/>);
  expect(homePath).toBeInTheDocument();
});
