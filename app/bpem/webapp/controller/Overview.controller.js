sap.ui.define([
  './BaseController',
  'sap/m/MessageBox'
], function (BaseController, MessageBox) {
  'use strict'
  
  const CLASS_NAME = 'u4u.bpem.controller.Overview'
  const _Controller = BaseController.extend(CLASS_NAME)

  _Controller.prototype.onInit = function () {
    const model = this.getOwnerComponent().getModel('bpem')
    const actionODataContextBinding = model.bindContext('/numberOfCases(...)')
    actionODataContextBinding.setParameter('data', {
      processor: 'jerry'
    })
    actionODataContextBinding.execute().then(
      function() {
        var actionContext = actionODataContextBinding.getBoundContext()
        console.log(actionContext.getObject().value)
      }.bind(this),
      function (oError) {
        MessageBox.alert(oError.message, {
            icon : MessageBox.Icon.ERROR,
            title : 'Error'})
        }
   )
  }

  return _Controller
})
