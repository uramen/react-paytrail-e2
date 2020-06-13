<h1 align="center">react-paytrail-e2 💸</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> React library and component for creating payments with [Paytrail E2 Interface](https://docs.paytrail.com).

## Introduction

![Screenshot](screenshot.png)

This library outputs a new `<form>` HTML element including all the required and optional fields as `<input>` elements for the E2 interface. Authcode required by Paytrail is calculated dynamically on render.

Payment may be dispatched to the service by submitting the form. Invalid parameters will instantly be caught by the payment service.

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
import { Form } from 'react-paytrail-e2'

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
