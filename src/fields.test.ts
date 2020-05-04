import FieldMap from './fields'

let fieldMap: FieldMap

beforeEach(() => (fieldMap = new FieldMap()))
afterEach(() => fieldMap.clear())

test('fields with real value are added', () => {
  const self = fieldMap.add('foo', 'bar')

  expect(self).toBeInstanceOf(FieldMap)
  expect(self.get('foo')).toBe('bar')
})

test('fields with nullish value are discarded', () => {
  fieldMap.add('first', undefined).add('second', null).add('third', '')

  expect(fieldMap.get('first')).toBeUndefined()
  expect(fieldMap.get('second')).toBeUndefined()
  expect(fieldMap.get('third')).toBeUndefined()
})

test('URL fields are added with correct keys', () => {
  const urls = {
    success: new URL('http://localhost/success'),
    cancel: new URL('http://localhost/cancel'),
    notify: new URL('http://localhost/notify'),
  }

  fieldMap.addURLs(urls)

  expect(fieldMap.get('URL_SUCCESS')).toBe(urls.success.href)
  expect(fieldMap.get('URL_CANCEL')).toBe(urls.cancel.href)
  expect(fieldMap.get('URL_NOTIFY')).toBe(urls.notify.href)
})

test('product fields with correct keys are added', () => {
  const products = [
    {
      id: 1,
      title: 'Deluxe Couch',
      price: 499.899,
      quantity: 1,
      discount: 10,
      vat: 24,
      type: 1,
    },
    {
      id: 2,
      title: 'Shipping fees',
      price: 10.0,
      quantity: 1,
      discount: 0,
      vat: 24,
      type: 2,
    },
  ]

  fieldMap.addProducts(products)

  expect(fieldMap.get('ITEM_ID[0]')).toBe('1')
  expect(fieldMap.get('ITEM_TITLE[0]')).toBe('Deluxe Couch')
  expect(fieldMap.get('ITEM_UNIT_PRICE[0]')).toBe('499.90')
  expect(fieldMap.get('ITEM_QUANTITY[0]')).toBe('1')
  expect(fieldMap.get('ITEM_DISCOUNT_PERCENT[0]')).toBe('10')
  expect(fieldMap.get('ITEM_VAT_PERCENT[0]')).toBe('24')
  expect(fieldMap.get('ITEM_TYPE[0]')).toBe('1')
  expect(fieldMap.get('ITEM_ID[1]')).toBe('2')
  expect(fieldMap.get('ITEM_TITLE[1]')).toBe('Shipping fees')
  expect(fieldMap.get('ITEM_UNIT_PRICE[1]')).toBe('10.00')
  expect(fieldMap.get('ITEM_QUANTITY[1]')).toBe('1')
  expect(fieldMap.get('ITEM_DISCOUNT_PERCENT[1]')).toBe('0')
  expect(fieldMap.get('ITEM_VAT_PERCENT[1]')).toBe('24')
  expect(fieldMap.get('ITEM_TYPE[1]')).toBe('2')
})

test('customer fields with correct keys are added', () => {
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
      country: 'FI',
    },
  }

  fieldMap.addCustomer(customer)

  expect(fieldMap.get('PAYER_PERSON_FIRSTNAME')).toBe(customer.firstName)
  expect(fieldMap.get('PAYER_PERSON_LASTNAME')).toBe(customer.lastName)
  expect(fieldMap.get('PAYER_PERSON_EMAIL')).toBe(customer.email)
  expect(fieldMap.get('PAYER_PERSON_PHONE')).toBe(customer.phone)
  expect(fieldMap.get('PAYER_PERSON_ADDR_STREET')).toBe(customer.address.street)
  expect(fieldMap.get('PAYER_PERSON_ADDR_POSTAL_CODE')).toBe(customer.address.postalCode)
  expect(fieldMap.get('PAYER_PERSON_ADDR_TOWN')).toBe(customer.address.town)
  expect(fieldMap.get('PAYER_PERSON_ADDR_COUNTRY')).toBe(customer.address.country)
  expect(fieldMap.get('PAYER_COMPANY_NAME')).toBe(customer.company)
})

test('message fields with correct keys are added', () => {
  const messages = {
    merchantPanel: "This is a message for the Merchant's Panel",
    payer: 'This is a message for the customer',
    paymentMethod: 'This is a message for the payment method',
  }

  fieldMap.addMessages(messages)

  expect(fieldMap.get('MSG_UI_MERCHANT_PANEL')).toBe(messages.merchantPanel)
  expect(fieldMap.get('MSG_UI_PAYMENT_METHOD')).toBe(messages.paymentMethod)
  expect(fieldMap.get('MSG_SETTLEMENT_PAYER')).toBe(messages.payer)
})

test('field PARAMS_IN is added', () => {
  fieldMap.add('MERCHANT_ID', '1').add('ORDER_NUMBER', '123').addParams()
  expect(fieldMap.get('PARAMS_IN')).toBe('MERCHANT_ID,ORDER_NUMBER')
})
