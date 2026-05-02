[@zokugun/jsonc-preprocessor](https://github.com/zokugun/node-jsonc-preprocessor)
==========================================================

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/jsonc-preprocessor.svg?colorB=green)](https://www.npmjs.com/package/@zokugun/jsonc-preprocessor)
[![Donation](https://img.shields.io/badge/donate-ko--fi-green)](https://ko-fi.com/daiyam)
[![Donation](https://img.shields.io/badge/donate-liberapay-green)](https://liberapay.com/daiyam/donate)
[![Donation](https://img.shields.io/badge/donate-paypal-green)](https://paypal.me/daiyam99)

Disable/enable/ignore blocks based on rules found in the JSONC text

Getting Started
---------------

With [node](http://nodejs.org) previously installed:

	npm install @zokugun/jsonc-preprocessor

```typescript
import {transform} from '@zokugun/jsonc-preprocessor';

const TYPES = {
	version: 'version',
};

function preprocessJSON(text: string, {host: string, os: string, editor: string, version: string}): string {
	const args = {
		host,
		os,
		editor,
		version,
	};

	return transform(text, TYPES, args);
}
```

Directives
----------

### `enable`

```
{
    // #enable(os="linux")
    // "key": "foobar"
}
```

If `os` is equal to `linux`, the block `"key": "foobar"` will be uncommented. If not, the block will be commented.

### `if/else`

```
{
    // #if(os="mac")
    // "key": "foo"
    // #elif(os="windows", host="host1"|"host2")
    // "key": "bar"
    // #elif(version>="2.18.1")
    // "key": "qux"
    // #else
    // "key": "baz"
    // #endif
}
```

`#elif(os="windows", host="host1"|"host2")` is `true` when `os` equals `windows` ***and*** `host` equals `host1` or `host2`.<br />
`#elif(os="windows", version>="2.18.1")` is `true` when `version` is greater than or equal to `2.18.1`.

### `ignore`

```
{
    // #ignore
    "key": "foobar"
}
```

The block `"key": "foobar"` will always be removed.

### `rewrite-enable`/`rewrite-disable`

```
{
    // #rewrite-enable
    // #if(os="mac"|"windows")
    // "key": "#{os}"
    // #else
    // "key": "linux"
    // #endif
    // #rewrite-disable

    // #if(os="mac"|"windows")
    // "key2": "#{os}"
    // #else
    // "key2": "linux"
    // #endif
}
```

`key` will have the following values: `max`, `windows` or `linux`.
`key2` will have the following values: `#{os}` or `linux`.

### `rewrite-next-line`

```
{
    // #rewrite-next-line
    // "key": "#{os}"
}
```

Condition
---------

```
condition = expression ("," expression)*
expression = (unary-operator identifier) | (identifier operator values)
identifier = \w+
operator = "=" | "!=" | "<" | "<=" | ">" | ">="
unary-operator = "?" | "!?"
values = value ("|" value)*
```

`value` is a double quote string.<br />
The operators `<`, `<=`, `>`, `>=` are only working for the identifier `version`.


Donations
---------

Support this project by becoming a financial contributor.

<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_kofi.png" alt="Ko-fi" width="80px" height="80px"></td>
        <td><a href="https://ko-fi.com/daiyam" target="_blank">ko-fi.com/daiyam</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_liberapay.png" alt="Liberapay" width="80px" height="80px"></td>
        <td><a href="https://liberapay.com/daiyam/donate" target="_blank">liberapay.com/daiyam/donate</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_paypal.png" alt="PayPal" width="80px" height="80px"></td>
        <td><a href="https://paypal.me/daiyam99" target="_blank">paypal.me/daiyam99</a></td>
    </tr>
</table>

License
-------

Copyright &copy; 2021-present Baptiste Augrain

Licensed under the [MIT license](https://opensource.org/licenses/MIT).
