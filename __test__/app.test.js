const sum = require('./sum');

// TOUJOURS VÉRIFIER QUE SON TEST ÉCHOUE !

describe(
  'Test sum', () => {
    test('test 1 + 2 = 3', () => {
      expect(sum(1, 2)).toBe(3);
    })
    test('test -1 + -2 = -3', () => {
      expect(sum(-1, -2)).toBe(-3);
    })
    test('le résultat possède 5 caractères', ()=>{
      expect("hello".length).toEqual(5)
    })
    // Exemple test qui dois retourner faux !
    // test('test -1 + -2 = -4', () => {
    //   expect(sum(-1, -2)).toBe(-4);
    // })
  }
)

