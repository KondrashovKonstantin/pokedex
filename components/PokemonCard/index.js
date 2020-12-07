import React, { useState } from 'react'
import { observer } from 'startupjs'
import { Image } from 'react-native'
import './index.styl'
import { Content, Card, Span, Div, Row } from '@startupjs/ui'
import Tag from '../Tag'

export default observer(function PokemonCard ({image, name, number, tags, prop}) {

    const [height, setHegiht] = useState()

  return pug`
    Card.root
        Div
            Image.img(source={uri:image})
        Row.line(align='between' vAlign='center')
            Span.title #{name}
            Span.number ##{number}
        Row.tags-holder
            for tag in tags
                Tag(type=tag key=tag)
        Row.attributes(align='between')
            Div.col
                Span.att Height: 
                Span.val #{prop.height}m
                Span.att Weight: 
                Span.val #{prop.weight}kg
            Div.col
                Span.att Category: 
                Span.val #{prop.category} 
                Span.att Abilities: 
                Span.val #{prop.ability}
  `
})
