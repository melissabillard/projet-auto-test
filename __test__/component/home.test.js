import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../src/markup/pages/home/index'; 

// mock images
jest.mock('../../../assets/pic1.png', () => 'mock-pic1.png');
jest.mock('../../../assets/ball_blue.png', () => 'mock-ball_blue.png');
jest.mock('../../../assets/ball_jaune.png', () => 'mock-ball_jaune.png');
jest.mock('../../../assets/ball_rose.png', () => 'mock-ball_rose.png');

describe('Composant Home', () => {
  test('render correctement le composant Home', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the main elements are rendered
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Bonjour ! 👋')).toBeInTheDocument();
    
    // Check if the navigation images are rendered
    expect(screen.getByAltText('blue pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('yellow pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('pink pokeball')).toBeInTheDocument();
  });

  test('has the correct navigation links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the navigation links are present and correct
    expect(screen.getByAltText('blue pokeball').closest('a')).toHaveAttribute('href', '/page-1');
    expect(screen.getByAltText('yellow pokeball').closest('a')).toHaveAttribute('href', '/page-2');
    expect(screen.getByAltText('pink pokeball').closest('a')).toHaveAttribute('href', '/page-3');
  });
});