import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppBar from './ResponsiveAppBar';

describe('<AppBar />', () => {
  test('it should mount', () => {
    render(<AppBar />);
    
    const appBar = screen.getByTestId('AppBar');

    expect(appBar).toBeInTheDocument();
  });
});