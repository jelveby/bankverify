import Account from '../lib/account.js';
import Utils from '../lib/utils.js';

describe('Account - Errors', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  [
    '1100-0000000',       // Nordea.
    '1200-0000000',       // Danske Bank.
    '1400-0000000',       // Nordea.
    '2300-0000000',       // Ålandsbanken.
    '2400-0000000',       // Danske Bank.
    '3000-0000000',       // Nordea.
    '3300-800928-6249',   // Nordea personkonto.
    '3301-0000000',       // Nordea.
    '3400-0000000',       // Länsförsäkringar Bank.
    '3410-0000000',       // Nordea.
    '3782-800928-6249',   // Nordea personkonto.
    '3783-0000000',       // Nordea.
    '5000-0000000',       // SEB.
    '6000-000000000',     // Handelsbanken.
    '6000-00000000',      // Handelsbanken.
    '7000-0000000',       // Swedbank.
    '8000-2-0000000000',  // Swedbank/Sparbanker with clearing number checksum.
    '9020-0000000',       // Länsförsäkringar Bank.
    '9040-0000000',       // Citibank.
    '9060-0000000',       // Länsförsäkringar Bank.
    '9090-0000000',       // Royal Bank of Scotland.
    '9100-0000000',       // Nordnet Bank.
    '9120-0000000',       // SEB.
    '9130-0000000',       // SEB.
    '9150-0000000',       // Skandiabanken.
    '9170-0000000',       // Ikano Bank.
    '9180-0000000000',    // Danske Bank.
    '9190-0000000',       // Den Norske Bank.
    '9230-0000000',       // Marginalen.
    '9250-0000000',       // SBAB.
    '9260-0000000',       // Den Norske Bank.
    '9270-0000000',       // ICA Banken.
    '9280-0000000',       // Resurs Bank.
    '9300-0000000000',    // Sparbanken Öresund.
    '9400-0000000',       // Forex Bank.
    '9460-0000000',       // GE Money Bank.
    '9470-0000000',       // Fortis Bank.
    '9500-00',            // Nordea/Plusgirot.
    '9550-0000000',       // Avanza Bank.
    '9570-0000000000',    // Sparbanken Syd.
    '9960-00'             // Nordea/Plusgirot.
  ].forEach(accountNumber => {
    it(`should be empty for a number like ${accountNumber}`, () => {
      account.init(accountNumber);
      account.errors().should.be.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than the bank allows', () => {
    account.init('11007');
    account.errors().should.include(Account.ERRORS.TOO_SHORT);
  });

  it('should not include :too_short for Swedbank/Sparbanker numbers that can be zerofilled', () => {
    let no1 = Object.create(Account);
    no1.init('8000-2-00000000');
    let no2 = Object.create(Account);
    no2.init('9300-2-00000000');
    let no3 = Object.create(Account);
    no3.init('9570-2-00000000');

    no1.errors().should.not.include(Account.ERRORS.TOO_SHORT);
    no2.errors().should.not.include(Account.ERRORS.TOO_SHORT);
    no3.errors().should.not.include(Account.ERRORS.TOO_SHORT);
  });

  it('should include :too_long for numbers longer than the bank allows', () => {
    account.init('1100000000007');
    account.errors().should.include(Account.ERRORS.TOO_LONG);
  });

  it('should not include :too_long for Swedbank/Sparbanker numbers with clearing checksum', () => {
    account.init('8000-2-0000000000');
    account.errors().should.not.include(Account.ERRORS.TOO_LONG);
  });

  it('should include :invalid_characters for numbers with other character than digits, spaces and dashes', () => {
    let no1 = Object.create(Account);
    no1.init('1 2-3X');
    let no2 = Object.create(Account);
    no2.init('1 2-3');

    no1.errors().should.include(Account.ERRORS.INVALID_CHARACTERS);
    no2.errors().should.not.include(Account.ERRORS.INVALID_CHARACTERS);
  });

  it('should include :bad_checksum for Nordea personkonto if the serial Luhn/mod 10 checksum is incorrect', () => {
    let no1 = Object.create(Account);
    no1.init('3300-800928-6249');
    let no2 = Object.create(Account);
    no2.init('3300-800928-6248');

    Utils.validLuhn('k800928-6248').should.be.false;
    no1.errors().should.not.include(Account.ERRORS.BAD_CHECKSUM);
    no2.errors().should.include(Account.ERRORS.BAD_CHECKSUM);
  });

  it('should include :unknown_clearing_number if the clearing number is unknown', () => {
    let no1 = Object.create(Account);
    no1.init('10000000009');
    let no2 = Object.create(Account);
    no2.init('11000000007');

    no1.errors().should.include(Account.ERRORS.UNKNOWN_CLEARING_NUMBER);
    no2.errors().should.not.include(Account.ERRORS.UNKNOWN_CLEARING_NUMBER);
  });
});
