import React from 'react'
import FieldMap from './fields'

const Debug: React.FC<DebugProps> = ({ fields }) => {
  return (
    <ul>
      {fields.map(([key, value], index) => (
        <li key={index}>
          <strong>{key}:</strong>
          {' ' + value}
        </li>
      ))}
    </ul>
  )
}

export const Form: React.FC<FormProps> = (props) => {
  const gateway = 'https://payment.paytrail.com/e2'
  const method = 'post'
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

  const outParameters = ['ORDER_NUMBER', 'PAYMENT_ID', 'AMOUNT', 'CURRENCY', 'PAYMENT_METHOD', 'TIMESTAMP', 'STATUS']

  const fields: Mappable<string, string> = new FieldMap()

  fields
    .add('MERCHANT_ID', merchant.id)
    .add('URL_SUCCESS', urls.success.href)
    .add('URL_CANCEL', urls.cancel.href)
    .add('ORDER_NUMBER', orderNumber)
    .add('PARAMS_IN', 'MERCHANT_ID')
    .add('PARAMS_OUT', outParameters.join(','))
    .add('MSG_UI_MERCHANT_PANEL', messages?.merchantPanel)
    .add('MSG_SETTLEMENT_PAYER', messages?.payer)
    .add('MSG_UI_PAYMENT_METHOD', messages.paymentMethod)
    .add('URL_NOTIFY', urls.notify?.href)
    .add('LOCALE', locale)
    .add('CURRENCY', currency)
    .add('REFERENCE_NUMBER', reference)
    .add('EXPIRATION_FOR_PAYMENT_CREATION', expiresAt)
    .add('PAYMENT_METHODS', paymentMethods.join(','))
    .add('PAYER_PERSON_PHONE', customer?.phone)
    .add('PAYER_PERSON_EMAIL', customer?.email)
    .add('PAYER_PERSON_FIRSTNAME', customer?.firstName)
    .add('PAYER_PERSON_LASTNAME', customer?.lastName)
    .add('PAYER_COMPANY_NAME', customer?.company)
    .add('PAYER_PERSON_ADDR_STREET', customer?.address?.street)
    .add('PAYER_PERSON_ADDR_POSTAL_CODE', customer?.address?.postalCode)
    .add('PAYER_PERSON_ADDR_TOWN', customer?.address?.town)
    .add('PAYER_PERSON_ADDR_COUNTRY', customer?.address?.country)
    .add('VAT_IS_INCLUDED', includeVat ? '1' : '0')
    .add('ALG', algorithm === 'sha256' ? '1' : '')
    .products(products)
    .params()

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
