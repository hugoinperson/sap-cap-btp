const cds = require('@sap/cds')
require('dotenv').config()

class BpemOdataService {
  constructor () {
    this._isOnBtp = !!process.env.VCAP_SERVICES
    this._SERVICE_NAME = 'Z_C_BPEM_CASE_ODATA_CDS'
  }

  async get () {
    let s4
    if (this._isOnBtp) {
      s4 = await cds.connect.to(this._SERVICE_NAME)
    } else {
      s4 = await cds.connect.to(this._SERVICE_NAME, {
        credentials: {
          url: process.env.S4_URL,
          path: process.env.S4_BPEM_ODATA_PATH,
          queries: {
            'sap-client': process.env.SAP_CLIENT
          },
          authentication: 'BasicAuthentication',
          username: process.env.USERNAME,
          password: process.env.PASSWORD
        }
      })
    }
    return s4
  }
}

module.exports = BpemOdataService
