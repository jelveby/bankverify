# Bankverify

I needed a way to do a quick verification of Swedish bank accounts.

## Usage

``` JavaScript
let account = BankVerify.init('832369881238384', 'account');
```

``` JavaScript
let accountNumber = accunt.getAccountNumber() // 8323-6 988.123.838-4
let bank = account.bank() // Swedbank
let clearingNumber = account.clearingNumber() // 8323-6
let serialNumber.serialNumber() // 9881238384
let normalized = account.normalize() // 8323-6 988.123.838-4
let valid = account.valid() // false
```