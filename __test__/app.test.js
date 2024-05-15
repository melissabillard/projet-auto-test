// import { render, screen, cleanup } from '@testing-library/react';
// import Home from '../src/markup/pages/home';

const sum = require('./sum');

// TOUJOURS VÉRIFIER QUE SON TEST ÉCHOUE !

describe(
  'Test somme', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    })
    test('test -1 + -2 = -3', () => {
      expect(sum(-1, -2)).toBe(-3);
    })
    test('le résultat possède 5 caractères', () => {
      expect("hello".length).toEqual(5)
    })
    // Exemple test qui dois retourner faux !
    // test('test -1 + -2 = -4', () => {
    //   expect(sum(-1, -2)).toBe(-4);
    // })
  }
)

describe(
  'Test nbr caractères', () => {
    test('le résultat possède 5 caractères', () => {
      expect("hello".length).toEqual(5)
    })
  }
)

// test('Exemple rendu composant', () => {
//   render(<Home />);
//   const todoElement = screen.getAllByTestId('test-bonjour');
//   expect(todoElement).toBeInTheDocument();
// })
