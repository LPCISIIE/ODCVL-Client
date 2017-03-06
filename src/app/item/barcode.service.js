import JsBarcode from 'jsbarcode'

export default class Barcode {
  renderer (selector) {
    return JsBarcode(selector)
  }

  generate () {
    let code = '300' + Math.ceil(Math.random() * Math.pow(10, 9))

    let weight
    let sum = 0
    for (let i in code) {
      weight = i % 2 === 0 ? 1 : 3
      sum += code.charAt(i) * weight
    }

    let modulo = sum % 10
    if (modulo !== 0) {
      modulo = 10 - modulo
    }

    return code + modulo
  }
}
