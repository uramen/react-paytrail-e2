import shajs from 'sha.js'

class FieldMap extends Map {
  add(key: string, value: Nullable<string>) {
    if (value === undefined || value === null || value.length === 0) {
      return this
    }

    return this.set(key, value.toString())
  }

  products(products: Product[]) {
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

  params() {
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
