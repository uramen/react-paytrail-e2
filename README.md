<h1 align="center">react-paytrail-e2 💸</h1>

[![npm version](https://badge.fury.io/js/react-paytrail-e2.svg)](https://badge.fury.io/js/react-paytrail-e2)
![NPM](https://img.shields.io/npm/l/react-paytrail-e2?style=flat-square)

> React library and component for creating payments with [Paytrail E2 Interface][e2].

## Introduction

![Screenshot](screenshot.png)

This library outputs a new `<form>` HTML element including all the required and optional fields as `<input>` elements for the E2 interface. Authcode required by Paytrail is calculated dynamically on render.

Payment may be dispatched to the service by submitting the form. Invalid parameters will instantly be caught by the payment service.

⚠️ This is still a **work-in-progress**. We appreciate your help in testing the logic and fixing any defects found. See how to [contribute](#contributing).

## Install

```sh
# Yarn
yarn add react-paytrail-e2

# NPM
npm install --save react-paytrail-e2
```

## Usage

The payment form component should be added to your existing order page.

```jsx
import { Form } from '@paytrail/react-paytrail-e2'

/* order page JSX */

<Form {...props} />
```

## Demo

This project includes [a demo React application](example/src/App.js) which you can use to study the on how to pass different properties to this component.

## Contributing

The library source code can be found under the `src/` directory, and the example app under the `example/` directory.

First, install dependencies with `yarn`. Then invoke a _Jest_ watcher with `yarn test:unit` to validate your changes.

**NOTE:** As of yet, there's no automated end-to-end test suite for creating a real payment. Make sure the demo application can create a new payment by click of a button and there are no interface errors.

After you're satisfied with the changes and all tests pass, open a pull request to this project.

## Releases

Follow the steps below to release a new version:

1. Checkout to the master branch and make sure tests pass
2. Modify the `version` field in [package.json](package.json) to contain the new version bumped according to semantic versioning rules
3. Commit this change with message `chore: bump version to <version>` (fill in the new version)
4. Push the commit to master branch
5. Go to the releases page on GitHub and draft a new release
6. Fill in the release details and publish

**NOTE:** GitHub Actions pipeline automatically pushes new releases to GitHub package registry when a new release is published. Currently, there's no automatic publishing to NPM registry so it has to be handled manually. Consider using a tool like [`np`][np] to handle releases.

[e2]: https://docs.paytrail.com/payments/e2-interface/
[np]: https://github.com/sindresorhus/np
