import React from 'react'
import FieldMap from './fields'

/**
 * Debug component for displaying form inputs
 */
const Debug: React.FC<DebugProps> = ({ fields }) => {
  return (
    <ul>
      {fields.map(([key, value], index) => (
        <li key={index}>
          <strong>{key}:</strong>
          <br />
          <code>{' ' + value}</code>
        </li>
      ))}
    </ul>
  )
}

/**
 * Form component for injecting the E2 payment form.
 *
 * @example ./example/App.js
 */
export const Form: React.FC<FormProps> = props => {
  const {
    merchant,
    orderNumber,
    customer,
    urls,
    products,
    locale = 'fi_FI',
    currency = 'EUR',
    reference = '',
    paymentMethods = [],
    messages = {},
    includeVat = true,
    algorithm = 'sha256',
    expiresAt = '',
    debug = false,
  } = props

  const gateway = 'https://payment.paytrail.com/e2'
  const method = 'post'
  const outParameters = ['ORDER_NUMBER', 'PAYMENT_ID', 'AMOUNT', 'CURRENCY', 'PAYMENT_METHOD', 'TIMESTAMP', 'STATUS']

  const fields = new FieldMap()

  fields
    .add('MERCHANT_ID', merchant.id)
    .add('ORDER_NUMBER', orderNumber)
    .add('PARAMS_IN', 'MERCHANT_ID')
    .add('PARAMS_OUT', outParameters.join(','))
    .add('LOCALE', locale)
    .add('CURRENCY', currency)
    .add('REFERENCE_NUMBER', reference)
    .add('EXPIRATION_FOR_PAYMENT_CREATION', expiresAt)
    .add('PAYMENT_METHODS', paymentMethods.join(','))
    .add('VAT_IS_INCLUDED', includeVat ? '1' : '0')
    .add('ALG', algorithm === 'sha256' ? '1' : '')
    .addURLs(urls)
    .addProducts(products)
    .addCustomer(customer)
    .addMessages(messages)
    .addParams()

  const fieldEntries = [...fields.entries()]

  return (
    <section className='e2-form-wrapper'>
      {debug && <Debug fields={fieldEntries} />}
      <form action={gateway} method={method}>
        {fieldEntries.map(([key, value], index) => (
          <input key={index} name={key} type='hidden' value={value} />
        ))}
        <input name='AUTHCODE' type='hidden' value={fields.authCode(merchant.secret, algorithm)} />
        <button type='submit'>Pay</button>
      </form>
    </section>
  )
}
