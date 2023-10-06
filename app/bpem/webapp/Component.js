sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/f/FlexibleColumnLayoutSemanticHelper',
  'sap/f/library'
], function (UIComponent, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
    'use strict'

  return UIComponent.extend('u4u.bpem.Component', {

    metadata: {
      manifest: 'json'
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * In this function, the device models are set and the router is initialized.
     * @public
     * @override
     */
    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments)

      // create the views based on the url/hash
      this.getRouter().initialize()
            
      // if you are a manager
      this.getRouter().navTo('overview')
    },

    getHelper: function () {
      return this._getFcl().then(function (oFCL) {
        const oSettings = {
          defaultTwoColumnLayoutType:
            fioriLibrary.LayoutType.TwoColumnsMidExpanded,
          defaultThreeColumnLayoutType:
            fioriLibrary.LayoutType.ThreeColumnsMidExpanded
        }
        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
          oFCL,
          oSettings
        )
      })
    },

    /**
     * The component is destroyed by UI5 automatically.
     * In this method, the ErrorHandler is destroyed.
     * @public
     * @override
     */
    destroy: function () {
      // call the base component's destroy function
      UIComponent.prototype.destroy.apply(this, arguments)
    }

  })

})