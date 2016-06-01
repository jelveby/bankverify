// Based on: https://www.bankgirot.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf

const AccountType = {
  TYPE1: { algorithm: 'mod11', clearingLength: 4, serialLength: 7, weightedNumbers: 10 },
  TYPE2: { algorithm: 'mod11', clearingLength: 4, serialLength: 7, weightedNumbers: 11 },
  TYPE3: { algorithm: 'mod10', clearingLength: 4, serialLength: 10, weightedNumbers: 10 },
  TYPE4: { algorithm: 'mod10', clearingLength: 4, serialLength: 9, weightedNumbers: 9 },
  TYPE5: { algorithm: 'mod10', clearingLength: 5, serialLength: 10, weightedNumbers: 10 }
};

export default AccountType;
