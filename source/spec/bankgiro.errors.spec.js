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
      bankgiro.init(bankgiroNumber).errors().should.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than 7 digits', () => {
    let giro1 = Object.create(Bankgiro);
    let giro2 = Object.create(Bankgiro);
    let giro3 = Object.create(Bankgiro);
    let giro4 = Object.create(Bankgiro);

    giro1.init(undefined).errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro2.init('').errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro3.init('23-1332').errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
    giro4.init('92---------8838').errors().should.include(Bankgiro.ERRORS.TOO_SHORT);
  });

  it('should include TOO_LONG for numbers longer than 8 digits', () => {
    bankgiro.init('7732-99929').errors().should.include(Bankgiro.ERRORS.TOO_LONG);
  });

  it('should include INVALID_CHARACTERS for numbers with other character than digits, spaces and dashes', () => {
    let giro1 = Object.create(Bankgiro);
    giro1.init('5402-9681X').errors().should.include(Bankgiro.ERRORS.INVALID_CHARACTERS);

    let giro2 = Object.create(Bankgiro);
    giro2.init(' 5 4 0 2 - 9 6 8 1 ').errors().should.not.include(Bankgiro.ERRORS.INVALID_CHARACTERS);
  });

  it('should include BAD_CHECKSUM if the Luhn/mod 10 checksum is incorrect', () => {
    bankgiro.init('5402-9682').errors().should.include(Bankgiro.ERRORS.BAD_CHECKSUM);
  });

});
