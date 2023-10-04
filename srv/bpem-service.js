const cds = require('@sap/cds')

class BpemService extends cds.ApplicationService {
  async init () {
    await super.init()
    const { BpemCases } = this.entities
    this.on('READ', BpemCases, async (req) => {
      const { ID } = req.params
      const tx = cds.transaction(req)
      const cases = await tx.run(SELECT.from(BpemCases).where({ ID }))
      return cases
    })
  }
}

module.exports = BpemService