import Account from '../lib/account.js';

describe('Account - Initialize', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should initialize', () => {
    account.should.satisfy((acc) => {
      return Object.getPrototypeOf(acc) === Account;
    });
  });

  it('should set accountNumber', () => {
    let accountNumber = '3000-0000000000';
    account.init(accountNumber).getAccountNumber().should.equal(accountNumber);
  });

  it('should return account number in only digits', () => {
    account.init('3000-0000000000').digits().should.equal('30000000000000');
  });

});
