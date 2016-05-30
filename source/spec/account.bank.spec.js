import Account from '../lib/account.js';
import { expect } from 'chai';

describe('Account - Bank', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should return the bank name for the current clearing number', () => {
    account.init('11000000007').bank().should.equal('Nordea');
    account.init('11550000001').bank().should.equal('Nordea');
    account.init('11990000009').bank().should.equal('Nordea');
    account.init('12000000005').bank().should.equal('Danske Bank');
  });

  it('should return an empty object if invalid clearing number', () => {
    account.init('99990000005');

    expect(account.bank()).to.be.undefined;
  });
});
