import Account from '../lib/account.js';
import { expect } from 'chai';

describe('Account - Bank', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should return the bank name for the current clearing number', () => {
    let no1 = Object.create(Account);
    no1.init('11000000007');
    let no2 = Object.create(Account);
    no2.init('11550000001');
    let no3 = Object.create(Account);
    no3.init('11990000009');
    let no4 = Object.create(Account);
    no4.init('12000000005');

    no1.bank().should.equal('Nordea');
    no2.bank().should.equal('Nordea');
    no3.bank().should.equal('Nordea');
    no4.bank().should.equal('Danske Bank');
  });

  it('should return an empty object if invalid clearing number', () => {
    account = Object.create(Account);
    account.init('99990000005');

    expect(account.bank()).to.be.undefined;
  });
});
