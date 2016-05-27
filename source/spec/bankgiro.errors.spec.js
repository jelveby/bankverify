import Bankgiro from '../lib/bankgiro.js';

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
      bankgiro.init(bankgiroNumber);
      bankgiro.errors().should.eql([]);
    });
  });

  it('should include :too_short for numbers shorter than 7 digits', () => {
    let giro1 = Object.create(Bankgiro);
    giro1.init(undefined);
    let giro2 = Object.create(Bankgiro);
    giro2.init('');
    let giro3 = Object.create(Bankgiro);
    giro3.init('23-1332');
    let giro4 = Object.create(Bankgiro);
    giro4.init('92---------8838');

    giro1.errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro2.errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro3.errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro4.errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
  });

  it('should include :too_long for numbers longer than 8 digits', () => {
    bankgiro.init('7732-99929');
    bankgiro.errors().should.include(Bankgiro.ERRORS.TOO_LONG);
  });

  it('should include :invalid_characters for numbers with other character than digits, spaces and dashes', () => {
    let giro1 = Object.create(Bankgiro);
    giro1.init('5402-9681X');
    giro1.errors().should.include(Bankgiro.ERRORS.INVALID_CHARACTERS);

    let giro2 = Object.create(Bankgiro);
    giro2.init(' 5 4 0 2 - 9 6 8 1 ');
    giro2.errors().should.not.include(Bankgiro.ERRORS.INVALID_CHARACTERS);
  });

  it('should include :bad_checksum if the Luhn/mod 10 checksum is incorrect', () => {
    bankgiro.init('5402-9682');
    bankgiro.errors().should.include(Bankgiro.ERRORS.BAD_CHECKSUM);
  });

});
