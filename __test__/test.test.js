const sum = require('./sum');

describe(
  'Test sum', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    })
    test('test -1 + -2 = -3', () => {
      expect(sum(-1, -2)).toBe(-3);
    })
    // Exemple test qui dois retourner faux !
    // test('test -1 + -2 = -4', () => {
    //   expect(sum(-1, -2)).toBe(-4);
    // })
  }
)

