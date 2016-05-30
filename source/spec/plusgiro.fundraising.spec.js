import Plusgiro from '../lib/plusgiro.js';
import { expect } from 'chai';

describe('Plusgiro - Fundraising', () => {
  let plusgiro;

  beforeEach(() => {
    plusgiro = Object.create(Plusgiro);
  });

  it('should be true for the number series 90-NNNN', () => {
    plusgiro.init('90 20 03-3').fundraising().should.be.true;
  });

  it('should be false for invalid numbers in the right series', () => {
    plusgiro.init('90 20 03-4').fundraising().should.be.not.true;
  });

  it('should be false for numbers outside the right series', () => {
    plusgiro.init('4-2');
    expect(plusgiro.fundraising()).to.be.false;
  });

});
