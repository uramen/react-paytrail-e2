import React from 'react'
import renderer from 'react-test-renderer'

import { Form } from '.'

const getURLs = (baseURI: string): URLSet => ({
  success: new URL(`${baseURI}/success`),
  cancel: new URL(`${baseURI}/cancel`),
  notify: new URL(`${baseURI}/notify`)
})

test('Form renders with minimum fields', async () => {
  const merchant: Merchant = {
    id: '1',
    secret: '123'
  }

  const orderNumber = '1'
  const urls = getURLs('https://example.com')

  const customer: Customer = {
    firstName: 'Alice',
    lastName: 'Angel'
  }

  const product: Product = {
    id: '123',
    title: 'Test Product',
    price: 100
  }

  const form = renderer.create(
    <Form
      merchant={merchant}
      orderNumber={orderNumber}
      customer={customer}
      products={[product]}
      urls={urls}
    />
  )

  const tree = form.toJSON()
  expect(tree).toMatchSnapshot()
})
