const cds = require('@sap/cds')
const { DateTime } = require('luxon')
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

  async overviewMetrics(data) { 
    const { startDate, endDate } = data

    const { Z_C_BPEM_CASE_ODATA } = this._s4.entities
    const products = await this._s4.run(SELECT.from(Z_C_BPEM_CASE_ODATA))

    const backlogCases = products.filter((product) => { 
      const dueDate = DateTime.fromFormat(product?.Duedate, 'yyyyMMdd')
      const systemDate = DateTime.fromFormat(product?.BPEMCaseSystemDate, 'yyyyMMdd')
      return (product.BPEMCaseStatus === '1' || product.BPEMCaseStatus === '2') && dueDate < systemDate
    })

    return {
      numberOfTotalCases: products.length,
      numberOfBacklogCases: backlogCases.length,
    }
  }
}

module.exports = BpemService
