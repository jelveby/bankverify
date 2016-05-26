import Account from '../lib/account.js';

describe('Account - Clearingnumber', () => {
  let account;

  beforeEach(() => {
    account = Object.create(Account);
  });

  it('should return whether or not the clearing number should include a checksum', () => {
    let no1 = Object.create(Account);
    no1.init('11000000007');
    let no2 = Object.create(Account);
    no2.init('8381-6 0000007');

    no1.checksumForClearing().should.not.be.true;
    no2.checksumForClearing().should.be.true;
  });

  it('should return the first four digits', () => {
    account.init('11000000007');

    account.clearingNumber().should.eql('1100');
  });
  it('should return the first five digits if there is a checksum', () => {
    account.init('8381-6 0000000000');

    account.clearingNumber().should.eql('8381-6');
  });
});
