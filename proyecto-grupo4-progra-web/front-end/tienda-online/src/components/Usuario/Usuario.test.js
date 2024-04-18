import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Usuario from './Usuario';

describe('<Usuario />', () => {
  test('it should mount', () => {
    render(<Usuario />);
    
    const usuario = screen.getByTestId('Usuario');

    expect(usuario).toBeInTheDocument();
  });
});