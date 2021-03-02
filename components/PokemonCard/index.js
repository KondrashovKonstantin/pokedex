import React from 'react'
import { Image } from 'react-native'
import { observer, emit } from 'startupjs'
import './index.styl'
import { Card, Span, Div, Row } from '@startupjs/ui'
import Tag from '../Tag'

export default observer(function PokemonCard ({ image, name, number, tags, prop, id }) {
  return pug`
    Card.root(onPress = ()=> emit('url', '/pokemon/'+id))
      Div
        Image.img(source={ uri: image || 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'})
      Row.line(align = 'between' vAlign = 'center')
        Span.title= name
        Span.number= '#' + number
      Row.tagsHolder
        for tag in tags
          Tag(type = tag key = tag)
      Row.attributes(align='between')
        Div.col
          Span.att Height: 
          Span.val= prop.height ? prop.height + 'm' : 'unknown'
          Span.att Weight: 
          Span.val= prop.weight ? prop.weight + 'kg' : 'unknown'
        Div.col
          Span.att Category: 
          Span.val= prop.category || 'unknown' 
          Span.att Abilities: 
          Span.val= prop.ability || 'unknown'
  `
})
