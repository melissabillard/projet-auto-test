const sum = require('./unitaire');

/* *
 * Execution test unitaire
 * */

describe(
  'Test sum', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    })
  }
)

/* *
 * Execution test graphique
 * */

/* *
 * Execution test intégration
 * */ 