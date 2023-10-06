sap.ui.define([
  './BaseController',
  'sap/ui/core/Fragment',
  'u4u/bpem/lib/WebChat'
], function (BaseController, Fragment, WebChat) {
  'use strict'

  const CLASS_NAME = 'u4u.bpem.controller.App'

  const _Controller = BaseController.extend(CLASS_NAME)

  _Controller.prototype.onInit = function () {
    WebChat // to load the WebChat library
    this._chatBotInitialized = false
  }

  // _Controller.prototype.onStateChanged = function (oEvent) {
  //   const bIsNavigationArrow = oEvent.getParameter('isNavigationArrow')
  //   const sLayout = oEvent.getParameter('layout')

  //   this._updateUIElements()

  //   // Replace the URL with the new layout if a navigation arrow was used
  //   if (bIsNavigationArrow) {
  //     this.oRouter.navTo(
  //       this.currentRouteName,
  //       {
  //         layout: sLayout,
  //         product: this.currentProduct,
  //         supplier: this.currentSupplier
  //       },
  //       true
  //     )
  //   }
  // }

  // _Controller.prototype._updateUIElements = function () {
  //   const oModel = this.oOwnerComponent.getModel()
  //   let oUIState
  //   this.oOwnerComponent.getHelper().then(function (oHelper) {
  //     oUIState = oHelper.getCurrentUIState()
  //     oModel.setData(oUIState)
  //   })
  // }

  _Controller.prototype.onPress = async function (event) {
    const button = event.getSource()

    if (!this._chatBotPopover) {
      this._chatBotPopover = await this._getChatBotPopover()
    }
    
    this._chatBotPopover.openBy(button)

    if (!this._chatBotInitialized) {
      this._initChatBot()
    }
  }

  _Controller.prototype._getChatBotPopover = function () { 
    const view = this.getView()

    return Fragment.load({
      id: view.getId(),
      name: 'u4u.bpem.fragment.ChatBot',
      controller: this
    }).then(function(oPopover) {
      view.addDependent(oPopover)
      return oPopover
    })
  }

  _Controller.prototype._initChatBot = function () { 
    const token = 'rMQz-qVYVpE.RPO8XdRfsu-q4iWaPGDNICjcNSrI2fn-nWIQ_jWSo40'
    const avatarOptions = {
      botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
      botAvatarInitials: 'UT',
      userAvatarImage: 'https://github.com/compulim.png?size=64',
      userAvatarInitials: 'TN'
    }
    const store = window.WebChat.createStore({}, ({ dispatch }) => next => async action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        console.log('Chatbot event dispatched')
        dispatch({
          type: 'WEB_CHAT/SEND_EVENT',
          payload: {
            name: 'webchat/join',
            value: {
              language: window.navigator.language
            }
          }
        })
      } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        if (action.payload.activity.from.role === 'bot') {
          console.log('bot: ' + action.payload.activity.text)
        }
        if (action.payload.activity.from.role === 'user') {
          console.log('user: ' + action.payload.activity.text)
          let txt = action.payload.activity.text
          if (txt === undefined) {
            txt = ''
          }
        }
      }

      return next(action)
    })

    const styleSet = window.WebChat.createStyleSet({
      // bubbleBackground: 'rgba(0, 0, 255, .1)',
      // bubbleFromUserBackground: 'rgba(0, 255, 0, .1)',
      rootHeight: '690px',
      rootWidth: '100%',
      backgroundColor: 'azure'
    })

    // After generated, you can modify the CSS rules.
    // Change font family and weight.
    styleSet.textContent = {
      ...styleSet.textContent,
      fontFamily: '\'Roboto\', \'Arial\', sans-serif',
      fontWeight: 'regular'
    }
    
    window.WebChat.renderWebChat({
      directLine: window.WebChat.createDirectLine({ token: token }),
      store: store,
      styleSet,
      styleOptions: avatarOptions
    }, document.getElementById(`${this.getView().getId()}--webchat`))

    this._chatBotInitialized = true
  }
  

  return _Controller
})
