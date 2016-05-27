import Bankgiro from '../lib/bankgiro.js';

describe('Bankgiro - Initialize', () => {
  let bankgiro;

  beforeEach(() => {
    bankgiro = Object.create(Bankgiro);
  });

  it('should initialize', () => {
    bankgiro.init('5402-9681');
    bankgiro.should.satisfy((giro) => {
      return Object.getPrototypeOf(giro) === Bankgiro;
    });
    bankgiro.getNumber().should.eql('5402-9681');
  });
});
