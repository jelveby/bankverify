import Plusgiro from '../lib/plusgiro.js';

describe('Plusgiro - Errors', () => {
  let plusgiro;

  beforeEach(() => {
    plusgiro = Object.create(Plusgiro);
  });

  [
    '28 65 43-4', // IKEA
    '410 54 68-5', // IKEA
    '4-2' // Sveriges riksbank
  ].forEach(number => {
    it(`should contain no errors for number like ${number}`, () => {
      plusgiro.init(number).errors().should.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than 2 digits', () => {
    plusgiro.init(null).errors().should.include(Plusgiro.ERRORS.TOO_SHORT);
    plusgiro.init('').errors().should.include(Plusgiro.ERRORS.TOO_SHORT);
    plusgiro.init('1').errors().should.include(Plusgiro.ERRORS.TOO_SHORT);
    plusgiro.init('1-------').errors().should.include(Plusgiro.ERRORS.TOO_SHORT);
  });

  it('should include TOO_LONG for number longer than 8 digits', () => {
    plusgiro.init('410 54 68-51').errors().should.include(Plusgiro.ERRORS.TOO_LONG);
  });

  it('should include INVALID_CHARACTERS for numbers with other character than digits, spaces and dashes', () => {
    plusgiro.init('410 54 68-5X').errors().should.include(Plusgiro.ERRORS.INVALID_CHARACTERS);
    plusgiro.init('4 1 0 5 4 6 8 - 5 ').errors().should.not.include(Plusgiro.ERRORS.INVALID_CHARACTERS);
  });

  it('should include BAD_CHECKSUM if the Luhn/mod 10 checksum is incorrect', () => {
    plusgiro.init('410 54 68-6');
    plusgiro.errors().should.include(Plusgiro.ERRORS.BAD_CHECKSUM);
  });
});
