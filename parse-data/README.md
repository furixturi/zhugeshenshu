# Parse 384 yao texts from a webpage into JSON

## Setup TypeScript with Node

### 1. Init package.json

```bash
$ npm init -y
```

### 2. Install and configure TypeScript

#### (1) Install TypeScript

```bash
$ npm i typesctipt -s
```

#### (2) Add npm script

In `package.json`, add to the `scripts` block

```javascript
"scripts": {
  "tsc": "tsc"
}
```

#### (3) Initialize TypeScript

```bash
$ npm run tsc -- --init
```

#### (4) Configure transpiled JS folder

In `tsconfig.json` generated from the last step, find `"outDir"`,
uncomment it and define the output folder for transpiled JS files

```js
"outDir": "./dist"
```

### 3. Watch and auto re-transpile ts files

#### (1) Install `ts-node-dev`

```bash
$ npm i ts-node-dev -s
```

#### (2) Add `dev` and `start` npm scripts in `package.json`

```js
"scripts": {
   "tsc": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./src/index.ts",
    "start": "tsc && node ./dist/index.js",
    ...
}
```

## Run the parsing

While developing:
```bash
$ npm run dev
```

To run in prod mode:

```bash
$ npm start
```