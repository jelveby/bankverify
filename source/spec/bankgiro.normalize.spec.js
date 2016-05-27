import Bankgiro from '../lib/bankgiro.js';

describe('Bankgiro - Normalize', () => {
  let bankgiro;

  beforeEach(() => {
    bankgiro = Object.create(Bankgiro);
  });

  it('should normalize 7 digit numbers to NNN-NNNN', () => {
    bankgiro.init(' 6-40 - 5070');
    bankgiro.normalize().should.eql('640-5070');
  });

  it('should normalize 8 digit numbers to NNNN-NNNN', () => {
    bankgiro.init(' 5-4-0-2-9-6- 81-  ');
    bankgiro.normalize().should.eql('5402-9681');
  });

  it('should not normalize invalid numbers', () => {
    bankgiro.init(' 1-2-3 ');
    bankgiro.normalize().should.eql(' 1-2-3 ');
  });

});
