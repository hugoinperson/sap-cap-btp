const cds = require('@sap/cds')
const BpemOdataService = require('./lib/BpemOdataService')
class BpemService extends cds.ApplicationService {
  async init () {
    this._s4 = await new BpemOdataService().get()
  }

  async numberOfCases (data) {
    const { Z_C_BPEM_CASE_ODATA } = this._s4.entities
    const products = await this._s4.run(SELECT.from(Z_C_BPEM_CASE_ODATA))

    console.log('AAAA', data)
    console.log('products', products.length)

    return products
  }
}

module.exports = BpemService
