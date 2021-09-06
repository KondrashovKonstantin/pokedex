import React from 'react'
import { Image } from 'react-native'
import { observer, emit } from 'startupjs'
import { Card, Span, Div, Row } from '@startupjs/ui'
import Tag from '../Tag'
import './index.styl'

export default observer(function PokemonCard ({ image, name, number, tags, prop, id }) {
  return pug`
    Card.root(onPress = ()=> emit('url', '/pokemon/'+id))
      Div
        Image.img(source={ uri: image || 'https://assets.thespinoff.co.nz/1/2019/04/HddtBOT.png'})
      Row.line(align = 'between' vAlign = 'center')
        Span.title= name
        Span.number(bold)= '#' + number
      Row.tagsHolder
        for tag in tags
          Tag(
            type=tag
            key=tag
          )
      Row.attributes(align='between')
        Div.col
          Span.att(bold) Height: 
          Span.val(bold)= prop.height ? prop.height + 'm' : 'unknown'
          Span.att(bold) Weight: 
          Span.val(bold)= prop.weight ? prop.weight + 'kg' : 'unknown'
        Div.col
          Span.att(bold) Category: 
          Span.val(bold)= prop.category || 'unknown' 
          Span.att(bold) Abilities: 
          Span.val(bold)= prop.ability || 'unknown'
  `
})
