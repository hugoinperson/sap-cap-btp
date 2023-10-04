sap.ui.define([
  './BaseController'
], function (BaseController) {
  'use strict'
  
  const CLASS_NAME = 'u4u.bpem.controller.Overview'
  const _Controller = BaseController.extend(CLASS_NAME)

  _Controller.prototype.onInit = function () {
    const model = this.getOwnerComponent().getModel('bpem')
    const actionODataContextBinding = model.bindContext("/numberOfCases(...)")
    actionODataContextBinding.setParameter("data", {
      processor: 'jerry'
    })
    actionODataContextBinding.execute().then(
      function() {
          var actionContext = actionODataContextBinding.getBoundContext()
          console.log(actionContext.getObject().value)
      }.bind(this)
   );
  }

  return _Controller
})
