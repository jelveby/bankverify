import Bankgiro from '../lib/bankgiro.js';
import Errors from '../lib/errors.js';

describe('Bankgiro - Errors', () => {
  let bankgiro;

  beforeEach(() => {
    bankgiro = Object.create(Bankgiro);
  });

  [
    '5402-9681',
    '297-3675',
    '640-5070'
  ].forEach((bankgiroNumber) => {
    it(`should not return errors for a bankgiro number like ${bankgiroNumber}`, () => {
      bankgiro.init(bankgiroNumber).errors().should.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than 7 digits', () => {
    bankgiro.init(undefined).errors().should.include(Errors.TOO_SHORT);
    bankgiro.init('').errors().should.include(Errors.TOO_SHORT);
    bankgiro.init('23-1332').errors().should.include(Errors.TOO_SHORT);
    bankgiro.init('92---------8838').errors().should.include(Errors.TOO_SHORT);
  });

  it('should include TOO_LONG for numbers longer than 8 digits', () => {
    bankgiro.init('7732-99929').errors().should.include(Errors.TOO_LONG);
  });

  it('should include INVALID_CHARACTERS for numbers with other character than digits, spaces and dashes', () => {
    bankgiro.init('5402-9681X').errors().should.include(Errors.INVALID_CHARACTERS);
    bankgiro.init(' 5 4 0 2 - 9 6 8 1 ').errors().should.not.include(Errors.INVALID_CHARACTERS);
  });

  it('should include BAD_CHECKSUM if the Luhn/mod 10 checksum is incorrect', () => {
    bankgiro.init('5402-9682').errors().should.include(Errors.BAD_CHECKSUM);
  });

});
