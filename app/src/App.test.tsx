import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Calculadora App', () => {
  test('renderiza o valor inicial do display como 0', () => {
    render(<App />);
    const displayElement = screen.getByTestId('display');
    expect(displayElement).toHaveTextContent('0');
  });

  test('digita numeros no display corretamente', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));

    expect(screen.getByTestId('display')).toHaveTextContent('123');
  });

  test('efetua operacao de adicao simples (5 + 3 = 8)', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByTestId('display')).toHaveTextContent('8');
  });

  test('limpa o display ao clicar no botao C', () => {
    render(<App />);
    
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: 'C' }));

    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });
});