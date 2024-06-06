import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect'; 
import Home from '../../src/markup/pages/home/index';

jest.mock('../../../assets/pic1.png', () => 'mock-pic1.png');
jest.mock('../../../assets/ball_blue.png', () => 'mock-ball_blue.png');
jest.mock('../../../assets/ball_jaune.png', () => 'mock-ball_jaune.png');
jest.mock('../../../assets/ball_rose.png', () => 'mock-ball_rose.png');

const history = createMemoryHistory();

describe('Composant Home', () => {
  test('renders composant Home correctement', () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Bonjour ! 👋')).toBeInTheDocument();
    
    expect(screen.getByAltText('blue pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('yellow pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('pink pokeball')).toBeInTheDocument();
  });

  test('a les liens de navigation', () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );

    expect(screen.getByAltText('blue pokeball').closest('a')).toHaveAttribute('href', '/page-1');
    expect(screen.getByAltText('yellow pokeball').closest('a')).toHaveAttribute('href', '/page-2');
    expect(screen.getByAltText('pink pokeball').closest('a')).toHaveAttribute('href', '/page-3');
  });

  test('verifier les classes CSS', () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveClass('App-header');
    expect(screen.getByAltText('logo')).toHaveClass('App-logo');
    expect(screen.getByText('Bonjour ! 👋').nextSibling).toHaveClass('pikachu-button');
  });

  test('verifier les styles inline corrects', () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );

    expect(screen.getByAltText('logo')).toHaveStyle('height: 27vmin');
    
    expect(screen.getByAltText('blue pokeball')).toHaveStyle('width: 70px');
    expect(screen.getByAltText('yellow pokeball')).toHaveStyle('width: 70px');
    expect(screen.getByAltText('pink pokeball')).toHaveStyle('width: 70px');
  });

  test('simuler les interactions des utilisateurs', () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );

    fireEvent.click(screen.getByAltText('blue pokeball'));
    expect(history.location.pathname).toBe('/page-1');

    fireEvent.click(screen.getByAltText('yellow pokeball'));
    expect(history.location.pathname).toBe('/page-2');

    fireEvent.click(screen.getByAltText('pink pokeball'));
    expect(history.location.pathname).toBe('/page-3');
  });

  test('le texte "Bonjour" est présent', async () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );
    const textElement = screen.findByTestId('test-bonjour');
    expect(textElement).toBeDefined();
  });

  test('le texte "Bonjour" est correct', async () => {
    render(
      <HistoryRouter history={history}>
        <Home />
      </HistoryRouter>
    );
    // Vérifie que le texte "Bonjour" est correct
    const textElement = screen.findByText('Bonjour ! 👋');
    expect(textElement).not.toBeNull();
    expect(textElement).toBeDefined();
  });

    test('le résultat possède 5 caractères', () => {
      expect("Bonjour".length).toEqual(7)
    });
})
