import Account from '../lib/account.js';

describe('Account - Serial number', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should return the serial number length', () => {
    account.init('11000000007').serialNumberLength().should.eql({ min: 7, max: 7 });
    account.init('8000-2-0000000000').serialNumberLength().should.eql({ min: 10, max: 10 });
    account.init('6000-000000000').serialNumberLength().should.eql({ min: 8, max: 9 });
  });

  it('should return the digits after the first four digits', () => {
    account.init('12345678').serialNumber().should.eql('5678');
  });

  it('should return the digits after the first five digits if there is a clearing number checksum', () => {
    account.init('8000-2-0000000000').serialNumber().should.eql('0000000000');
  });

  it('should be the empty string if there are not enough numbers', () => {
    account.init('12').serialNumber().should.eql('');
  });

  it('should return wether or not it should check serial with luhn algorithm', () => {
    account.init('3300-8012121458').luhnForSerial().should.be.true;
  });
});
