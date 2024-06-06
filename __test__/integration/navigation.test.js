import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../src/markup/pages/home/index';
import Page2 from '../../src/markup/pages/page-2/index';
import Page1 from '../../src/markup/pages/page-1';
import '@testing-library/jest-dom/extend-expect';


// jest.mock('../../src/markup/pages/page-2', () => () => 'Pokémon Battle Simulator');

describe('Home to Page2 Integration Test', () => {
  test('navigates from Home to Page2', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-2" element={<Page2 />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Home page initial content
    expect(screen.getByText('Bonjour ! 👋')).toBeInTheDocument();
    expect(screen.getByAltText('blue pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('yellow pokeball')).toBeInTheDocument();
    expect(screen.getByAltText('pink pokeball')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('yellow pokeball'));
    expect(await screen.findByText('Pokémon Battle Simulator')).toBeInTheDocument();

    expect(screen.queryByText('Bonjour ! 👋')).not.toBeInTheDocument();
  });
});

describe('Page1 to Home Integration Test', () => {
  test('navigates from Page1 to Home', async () => {
    render(
      <MemoryRouter initialEntries={['/page-1']}>
        <Routes>
          <Route path="/page-1" element={<Page1 />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify Page1 initial content
    expect(screen.getByText('Retour en arrière')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Retour en arrière'));
    expect(await screen.findByText('Bonjour ! 👋')).toBeInTheDocument();
  });
});