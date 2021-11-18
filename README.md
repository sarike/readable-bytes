# readable-bytes

[![Build Status](https://travis-ci.org/tony19/polymer-typescript-starter-kit.svg?branch=master)](https://travis-ci.org/tony19/polymer-typescript-starter-kit)

A simple useful util to convert bytes value to pretty string with proper unit.

# Install

Install with npm:

```bash
npm install readable-bytes --save
```

or with yarn:

```bash
yarn add readable-bytes
```

# Usage

```javascript
import readableBytes from 'readable-bytes'

// base 10
readableBytes(1000) // 1 KB
readableBytes(1000 * 1000) // 1 MB

parseBytes(1000 * 1000) // { value: 1, unit: 'MB' }

// base 2
readableBytes(1024, 2) // 1KiB
readableBytes(1024 * 1024, 2) // 1MiB
```

The result will only keep two decimal places.

```js
readableBytes(1001) // 1 KB
readableBytes(1060) // 1.06 KB
readableBytes(1069) // 1.07 KB
```


