# Bankverify

I needed a way to do a quick verification of Swedish bank accounts. Supports personal accounts from a wide variety of banks, Bankgiro as well as Plusgiro.

## Usage

### Personal accounts

``` JavaScript
let account = BankVerify.init('8323-6 988.123.838-4', 'account');
```

``` JavaScript
let accountNumber = accunt.getAccountNumber() // 8323-6 988.123.838-4
let bank = account.bank() // Swedbank
let clearingNumber = account.clearingNumber() // 8323-6
let serialNumber.serialNumber() // 9881238384
let normalized = account.normalize() // 8323-6 988.123.838-4
let valid = account.valid() // false
```

### Bankgiro

``` JavaScript
let account = BankVerify.init('5402--9681', 'bankgiro');
```

``` JavaScript
let number = accunt.getNumber() // 5402--9681
let normalized = account.normalize() // 5402-9681
let isFundraising = account.fundraising() // false (Needs to be 900-nnnn to 904-nnnn)
let valid = account.valid() // true
```

### Plusgiro

``` JavaScript
let account = BankVerify.init('2865434', 'plusgiro');
```

``` JavaScript
let number = accunt.getNumber() // 2865434
let normalized = account.normalize() // 28 65 43-4
let isFundraising = account.fundraising() // false (Needs to be 90-NNNN)
let valid = account.valid() // true
```