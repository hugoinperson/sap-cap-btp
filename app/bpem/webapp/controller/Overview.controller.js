sap.ui.define([
  './BaseController',
  'sap/m/MessageBox'
], function (BaseController, MessageBox) {
  'use strict'
  
  const CLASS_NAME = 'u4u.bpem.controller.Overview'
  const _Controller = BaseController.extend(CLASS_NAME)

  _Controller.prototype.onInit = function () {
    const model = this.getOwnerComponent().getModel('bpem')
    const contextBinding = model.bindContext('/overviewMetrics(...)')
    contextBinding.setParameter('data', {
      startDate: '',
      endDate: ''
    })
    contextBinding.execute().then(
      () => {
        var actionContext = contextBinding.getBoundContext()
        console.log(actionContext.getObject().value)
      },
      (oError) => {
        MessageBox.alert(oError.message, {
          icon: MessageBox.Icon.ERROR,
          title: 'Error'
        })
      }
   )
  }

  return _Controller
})
