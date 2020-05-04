import shajs from 'sha.js'

class FieldMap extends Map {
  add(key: string, value: Nullable<string>) {
    if (value === undefined || value === null || value.length === 0) {
      return this
    }

    return this.set(key, value.toString())
  }

  addURLs(urls: URLSet) {
    return this.add('URL_SUCCESS', urls.success.href).add('URL_CANCEL', urls.cancel.href).add('URL_NOTIFY', urls.notify?.href)
  }

  addProducts(products: Product[]) {
    products.forEach((product, index) => {
      const { id, title, price, quantity = '1', vat = '24', discount = '0', type = '1' } = product

      this.add(`ITEM_TITLE[${index}]`, title)
        .add(`ITEM_ID[${index}]`, id)
        .add(`ITEM_QUANTITY[${index}]`, quantity)
        .add(`ITEM_UNIT_PRICE[${index}]`, price.toFixed(2))
        .add(`ITEM_VAT_PERCENT[${index}]`, vat)
        .add(`ITEM_DISCOUNT_PERCENT[${index}]`, discount)
        .add(`ITEM_TYPE[${index}]`, type)
    })

    return this
  }

  addCustomer(customer: Customer) {
    return this.add('PAYER_PERSON_PHONE', customer?.phone)
      .add('PAYER_PERSON_EMAIL', customer?.email)
      .add('PAYER_PERSON_FIRSTNAME', customer?.firstName)
      .add('PAYER_PERSON_LASTNAME', customer?.lastName)
      .add('PAYER_COMPANY_NAME', customer?.company)
      .add('PAYER_PERSON_ADDR_STREET', customer?.address?.street)
      .add('PAYER_PERSON_ADDR_POSTAL_CODE', customer?.address?.postalCode)
      .add('PAYER_PERSON_ADDR_TOWN', customer?.address?.town)
      .add('PAYER_PERSON_ADDR_COUNTRY', customer?.address?.country)
  }

  addMessages(messages: MessageSet) {
    return this.add('MSG_UI_MERCHANT_PANEL', messages?.merchantPanel)
      .add('MSG_SETTLEMENT_PAYER', messages?.payer)
      .add('MSG_UI_PAYMENT_METHOD', messages.paymentMethod)
  }

  addParams() {
    const keys = [...this.keys()].join(',')

    return this.add('PARAMS_IN', keys)
  }

  authCode(secret: string, algorithm: string): string {
    const values = [secret]
    values.push(...this.values())

    return shajs(algorithm).update(values.join('|')).digest('hex').toUpperCase()
  }
}

export default FieldMap
