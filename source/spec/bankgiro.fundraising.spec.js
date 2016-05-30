import Bankgiro from '../lib/bankgiro.js';
import { expect } from 'chai';

describe('Bankgiro - Fundraising', () => {
  let bankgiro;

  beforeEach(() => {
    bankgiro = Object.create(Bankgiro);
  });

  it('should be true for the number series 900-nnnn to 904-nnnn', () => {
    bankgiro.init('902-0033').fundraising().should.be.true;
  });

  it('should be false for invalid numbers in the right series', () => {
    bankgiro.init('902-0034').fundraising().should.be.not.true;
  });

  it('should be false for numbers outside the right series', () => {
    bankgiro.init('5402-9681');
    expect(bankgiro.fundraising()).to.be.false;
  });

});
