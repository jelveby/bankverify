import Account from '../lib/account.js';

describe('Account - Normalize', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should normalize to clearing number dash serial number', () => {
    let no1 = Object.create(Account);
    no1.init('11000000007');
    let no2 = Object.create(Account);
    no2.init('8323-6 988.123.838-4');

    no1.normalize().should.eql('1100-0000007');
    no2.normalize().should.eql('8323-6-9881238384');
  });

  it('should keep any Swedbank/Sparbanker clearing checksum', () => {
    account.init('800020000000000');
    account.normalize().should.eql('8000-2-0000000000');
  });

  it('should not attempt to normalize invalid numbers', () => {
    account.init(' 1-2-3 ');
    account.normalize().should.eql(' 1-2-3 ');
  });

  it('should zero-fill serial numbers when needed', () => {
    let no1 = Object.create(Account);
    no1.init('8000-2-80000003');
    let no2 = Object.create(Account);
    no2.init('8000-2-8000000003');

    no1.normalize().should.eql('8000-2-0080000003');
    no2.normalize().should.eql('8000-2-8000000003');
  });
});
