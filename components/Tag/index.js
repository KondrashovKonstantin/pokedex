import React from 'react'
import { observer } from 'startupjs'
import './index.styl'
import { Span } from '@startupjs/ui'

export default observer(function Tag ({ type, input = false, selected }) {
  return pug`
    Span.tag(
        styleName = [type, selected, {withoutHolder: !input}]
      )= type.charAt(0).toUpperCase() + type.slice(1)
  `
})
