// Packages
const { render, screen } = require('@testing-library/react'); // utiliser CommonJS plutôt que les imports ECMAScript
const axios = require('axios');
const React = require('react');

// Fonctions
const sum = require('./sum');

// Components - Utilise l'importation ES6
const MyHomePage = require('../src/markup/pages/home/index');
jest.mock('../src/markup/pages/home/index', () => () => 'Home');

//*** TOUJOURS VÉRIFIER QUE SON TEST ÉCHOUE ! ***//
// TEST UNITAIRE exemple
// Ex : à jeter ...
describe(
  'Test somme', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
    test('test -1 + -2 = -3', () => {
      expect(sum(-1, -2)).toBe(-3);
    });
    test('le résultat possède 5 caractères', () => {
      expect("hello".length).toEqual(5)
    });
    // Exemple test qui dois retourner faux !
    // test('test -1 + -2 = -4', () => {
    //   expect(sum(-1, -2)).toBe(-4);
    // })
  }
)