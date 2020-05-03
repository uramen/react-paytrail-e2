import React from 'react'

import { Form } from 'react-paytrail-e2'
import 'react-paytrail-e2/dist/index.css'

const App = () => {
  const merchant = {
    id: '13466',
    secret: '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ'
  }

  const orderNumber = `ORDER-${Math.floor(Math.random() * 9999)}`

  const customer = {
    firstName: 'Alice',
    lastName: 'Angel',
    email: 'alice@example.org',
    phone: '040123456',
    company: 'Acme Ltd',
    address: {
      street: 'Test Street 1',
      postalCode: '100200',
      town: 'Helsinki',
      country: 'FI'
    },
  }

  const urls = {
    success: new URL('http://example.com/success'),
    cancel: new URL('http://example.com/cancel'),
    notify: new URL('http://example.com/notify'),
  }

  const products = [
    {
      id: 1,
      title: 'Deluxe Couch',
      price: 499.899,
      quantity: 1,
      discount: 10,
      type: 1
    },
    {
      id: 2,
      title: 'Shipping fees',
      price: 10.0,
      quantity: 1,
      discount: 0,
      type: 2
    },
  ]

  return (
  <div className="container">
    <h1>E2 Form</h1>
    <p>Pay with me please</p>
    <Form
      debug
      merchant={merchant}
      orderNumber={orderNumber}
      urls={urls}
      customer={customer}
      products={products}
      currency='EUR'
      locale='fi_FI'
      reference='RF111232'
      paymentMethods={[1, 2]}
      includeVat
      expiresAt='2099-01-01T12:00:00+00:00'
      algorithm='sha256'
      messages={{
        merchantPanel: "This is a message for the Merchant's Panel",
        payer: "This is a message for the customer",
        paymentMethod: "This is a message for the payment method",
    }} />
  </div>)
}

export default App
