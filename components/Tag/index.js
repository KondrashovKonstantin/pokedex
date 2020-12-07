import React from 'react'
import { observer } from 'startupjs'
import './index.styl'
import { Span, Div } from '@startupjs/ui'

export default observer(function Tag ({type, input=false, selected}) {
  return pug`
    Span.tag(
        styleName=type+(selected?' selected':'')
        style=input?null:{marginTop:8}) #{type.charAt(0).toUpperCase() + type.slice(1)}
  `
})
