import Account from '../lib/account.js';
import Utils from '../lib/utils.js';
import Errors from '../lib/errors.js';

describe('Account - Errors', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  [
    '1100-0000000',       // Nordea.
    '1200-0000009',       // Danske Bank.
    '1400-0000007',       // Nordea.
    '2300-0000001',       // Ålandsbanken.
    '2400-0000007',       // Danske Bank.
    '3000-0000000',       // Nordea.
    '3300-800928-6249',   // Nordea personkonto.
    '3301-1000002',       // Nordea.
    '3400-0000007',       // Länsförsäkringar Bank.
    '3410-0000008',       // Nordea.
    '3782-800928-6249',   // Nordea personkonto.
    '3783-0000007',       // Nordea.
    '4000-0000007',       // Nordea.
    '5000-0000000',       // SEB.
    '6000-000000000',     // Handelsbanken.
    '6000-00000000',      // Handelsbanken.
    '7000-0000000',       // Swedbank.
    '8000-2-0000000000',  // Swedbank/Sparbanker with clearing number checksum.
    '9020-0000006',       // Länsförsäkringar Bank.
    '9040-1000003',       // Citibank.
    '9060-0000006',       // Länsförsäkringar Bank.
    '9090-0000009',       // Royal Bank of Scotland.
    '9100-0000003',       // Nordnet Bank.
    '9120-1000004',       // SEB.
    '9130-0000002',       // SEB.
    '9150-0000002',       // Skandiabanken.
    '9170-0000006',       // Ikano Bank.
    '9180-0000000000',    // Danske Bank.
    '9190-1000003',       // DNB Bank.
    '9230-1000004',       // Marginalen.
    '9250-0000003',       // SBAB.
    '9260-0000005',       // DNB Bank.
    '9270-0000005',       // ICA Banken.
    '9280-0000006',       // Resurs Bank.
    '9300-0000000000',    // Sparbanken Öresund.
    '9390-0000001',       // Landshypotek AB.
    '9400-0000007',       // Forex Bank.
    '9460-0000002',       // Santander Consumer Bank AS.
    '9470-0000009',       // BNP Paribas Fortis Bank.
    '9500-00',            // Nordea/Plusgirot.
    '9550-0000006',       // Avanza Bank.
    '9570-0000000000',    // Sparbanken Syd.
    '9590-0000003',       // Erik Penser AB.
    '9630-0000008',       // Lån & Spar Bank Sverige.
    '9640-0000005',       // Nordax Bank AB.
    '9660-0000009',       // Amfa Bank AB.
    '9670-0000000',       // JAK Medlemsbank.
    '9680-0000002',       // BlueStep Finans AB.
    '9700-0000009',       // Ekobanken.
    '9880-0000004',       // Riksgälden.
    '9890-0000000000',    // Riksgälden.
    '9960-00'             // Nordea/Plusgirot.
  ].forEach(accountNumber => {
    it(`should be empty for a number like ${accountNumber}`, () => {
      account.init(accountNumber).errors().should.eql([]);
    });
  });

  it('should include TOO_SHORT for numbers shorter than the bank allows', () => {
    account.init('11007').errors().should.include(Errors.TOO_SHORT);
  });

  it('should not include TOO_SHORT for Swedbank/Sparbanker numbers that can be zerofilled', () => {
    account.init('8000-2-00000000').errors().should.not.include(Errors.TOO_SHORT);
    account.init('9300-2-00000000').errors().should.not.include(Errors.TOO_SHORT);
    account.init('9570-2-00000000').errors().should.not.include(Errors.TOO_SHORT);
  });

  it('should include TOO_LONG for numbers longer than the bank allows', () => {
    account.init('1100000000007').errors().should.include(Errors.TOO_LONG);
  });

  it('should not include TOO_LONG for Swedbank/Sparbanker numbers with clearing checksum', () => {
    account.init('8000-2-0000000000').errors().should.not.include(Errors.TOO_LONG);
  });

  it('should include INVALID_CHARACTERS for numbers with other character than digits, spaces and dashes', () => {
    account.init('1 2-3X').errors().should.include(Errors.INVALID_CHARACTERS);
    account.init('1 2-3').errors().should.not.include(Errors.INVALID_CHARACTERS);
    account.init('8381-6 994.348.947-7').errors().should.not.include(Errors.INVALID_CHARACTERS);
  });

  it('should include BAD_CHECKSUM for Nordea personkonto if the serial Luhn/mod 10 checksum is incorrect', () => {
    account.init('800928-6249').errors().should.not.include(Errors.BAD_CHECKSUM);
    account.init('3300-800928-6248').errors().should.include(Errors.BAD_CHECKSUM);

    Utils.mod10('k800928-6248').should.be.false;
  });

  it('should include UNKNOWN_CLEARING_NUMBER if the clearing number is unknown', () => {
    account.init('10000000009').errors().should.include(Errors.UNKNOWN_CLEARING_NUMBER);
    account.init('11000000007').errors().should.not.include(Errors.UNKNOWN_CLEARING_NUMBER);
  });
});
