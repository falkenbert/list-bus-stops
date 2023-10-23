import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders 10 buttons(Lines)', () => {
  const mockTop10Lines = [
    { count: 5, line: 1, stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4', 'Stop 5'] },
    { count: 4, line: 2, stops: ['Stop 4', 'Stop 5', 'Stop 6', 'Stop 7'] },
    { count: 3, line: 3, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 4, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 5, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 6, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 7, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 8, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 9, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 2, line: 20, stops: ['Stop 4', 'Stop 5'] },
  ];
  render(<App top10={mockTop10Lines} />);
  
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(10);
});

test('toggle open/close items on button click and show stops', () => {
  const mockTop10Lines = [
    { count: 5, line: 1, stops: ['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4', 'Stop 5'] },
    { count: 4, line: 2, stops: ['Stop 4', 'Stop 5', 'Stop 6', 'Stop 7'] },
    { count: 3, line: 3, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 4, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 5, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 6, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 7, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 8, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 3, line: 9, stops: ['Stop 4', 'Stop 5', 'Stop 6'] },
    { count: 2, line: 20, stops: ['Stop 4', 'Stop 5'] },
  ];

  render(<App top10={mockTop10Lines} />);

  const buttons = screen.getAllByRole('button');

  // Initial state: children should not be present
  expect(screen.queryByText('Stops:')).not.toBeInTheDocument();

  fireEvent.click(buttons[0]);

  // After click: children should be present
  expect(screen.getByText('Stops:')).toBeInTheDocument();
  expect(screen.getByText('Stop 1')).toBeInTheDocument();
  expect(screen.getByText('Stop 2')).toBeInTheDocument();
  expect(screen.getByText('Stop 3')).toBeInTheDocument();

  fireEvent.click(buttons[0]);

  // After second click: children should not be present again
  expect(screen.queryByText('Stops:')).not.toBeInTheDocument();
  expect(screen.queryByText('Stop 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Stop 2')).not.toBeInTheDocument();
  expect(screen.queryByText('Stop 3')).not.toBeInTheDocument();
});
