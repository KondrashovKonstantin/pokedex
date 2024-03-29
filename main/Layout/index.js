import React from 'react'
import { observer, emit, useValue, useLocal } from 'startupjs'
import './index.styl'
import { Row, Div, Layout, SmartSidebar, Menu, Button, H1 } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import APP from '../../app.json'

const { displayName } = APP

const APP_NAME = displayName.charAt(0).toUpperCase() + displayName.slice(1)

const MenuItem = observer(({ url, children }) => {
  const [currentUrl] = useLocal('$render.url')
  return pug`
    Menu.Item(
      activeColor='white'
      active=currentUrl === url
      onPress=() => emit('url', url)
    )= children
  `
})

export default observer(function ({ children }) {
  const [opened, $opened] = useValue(false)

  function renderSidebar () {
    return pug`
      Menu.sidebar-menu
        MenuItem(url='/') Pokemons
        MenuItem(url='/add') Add

    `
  }

  return pug`
    Layout
      SmartSidebar.sidebar(
        path=$opened.path()
        renderContent=renderSidebar
      )
        Row.menu
          Button(color='white' icon=faBars onPress=() => $opened.set(!opened))
          H1.logo= APP_NAME

        Div.body= children
  `
})
