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
      account.init(accountNumber).errors().should.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than the bank allows', () => {
    account.init('11007').errors().should.include(Account.ERRORS.TOO_SHORT);
  });

  it('should not include TOO_SHORT for Swedbank/Sparbanker numbers that can be zerofilled', () => {
    account.init('8000-2-00000000').errors().should.not.include(Account.ERRORS.TOO_SHORT);
    account.init('9300-2-00000000').errors().should.not.include(Account.ERRORS.TOO_SHORT);
    account.init('9570-2-00000000').errors().should.not.include(Account.ERRORS.TOO_SHORT);
  });

  it('should include TOO_LONG for numbers longer than the bank allows', () => {
    account.init('1100000000007').errors().should.include(Account.ERRORS.TOO_LONG);
  });

  it('should not include TOO_LONG for Swedbank/Sparbanker numbers with clearing checksum', () => {
    account.init('8000-2-0000000000').errors().should.not.include(Account.ERRORS.TOO_LONG);
  });

  it('should include INVALID_CHARACTERS for numbers with other character than digits, spaces and dashes', () => {
    account.init('1 2-3X').errors().should.include(Account.ERRORS.INVALID_CHARACTERS);
    account.init('1 2-3').errors().should.not.include(Account.ERRORS.INVALID_CHARACTERS);
    account.init('8381-6 994.348.947-7').errors().should.not.include(Account.ERRORS.INVALID_CHARACTERS);
  });

  it('should include BAD_CHECKSUM for Nordea personkonto if the serial Luhn/mod 10 checksum is incorrect', () => {
    account.init('3300-800928-6249').errors().should.not.include(Account.ERRORS.BAD_CHECKSUM);
    account.init('3300-800928-6248').errors().should.include(Account.ERRORS.BAD_CHECKSUM);

    Utils.validLuhn('k800928-6248').should.be.false;
  });

  it('should include UNKNOWN_CLEARING_NUMBER if the clearing number is unknown', () => {
    account.init('10000000009').errors().should.include(Account.ERRORS.UNKNOWN_CLEARING_NUMBER);
    account.init('11000000007').errors().should.not.include(Account.ERRORS.UNKNOWN_CLEARING_NUMBER);
  });
});
