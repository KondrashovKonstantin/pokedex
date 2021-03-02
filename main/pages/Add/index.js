import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { observer, emit, useModel } from 'startupjs'
import './index.styl'
import { Content, TextInput, Multiselect, Span, Br, Button } from '@startupjs/ui'
import { Tag } from '../../../components'

const tags = [
  { label: 'bug', value: 'bug' }, { label: 'dragon', value: 'dragon' },
  { label: 'fairy', value: 'fairy' }, { label: 'fire', value: 'fire' },
  { label: 'ghost', value: 'ghost' }, { label: 'ground', value: 'ground' },
  { label: 'normal', value: 'normal' }, { label: 'psychik', value: 'psychik' },
  { label: 'steel', value: 'steel' }, { label: 'dark', value: 'dark' },
  { label: 'electric', value: 'electric' }, { label: 'fighting', value: 'fighting' },
  { label: 'flying', value: 'flying' }, { label: 'grass', value: 'grass' },
  { label: 'ice', value: 'ice' }, { label: 'poission', value: 'poission' },
  { label: 'rock', value: 'rock' }, { label: 'watter', value: 'watter' }
]

export default observer(function Add () {
  const tagLabel = ({ record }) => {
    return pug`
      Tag(type=record.label input)
    `
  }
  const $pokemon = useModel('pokemon.*')
  const [types, setTypes] = useState([])
  const [weaks, setWeak] = useState([])
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [category, setCategory] = useState()
  const [ability, setAbility] = useState()
  const [showError, setError] = useState(false)

  async function postPokemon () {
    if (name) {
      let pokemon = $pokemon.query('pokemons', { $count: true })
      await pokemon.subscribe()
      let number = pokemon.getExtra()
      $pokemon.addSelf({ name, types, weaks, image, height, weight, category, ability, number: number + 1 })
      emit('url', '/')
    } else {
      setError(true)
    }
  }

  return pug`
    ScrollView.root
      Content
        Span.label(styleName=showError?'error':null) Pokemon Name #{showError?'- this fields is required':null}
        TextInput(
          placeholder='enter pokemon name...'
          value=name
          onChangeText=setName
          inputStyle=showError?{borderColor:'red'}:null)
        Br
        TextInput(
          placeholder='image uri...'
          value=image
          onChangeText=setImage
        )
        Br
        Span.label Types
        Multiselect(
          placeholder="select one or more types..."
          options=tags
          value=types
          onChange=setTypes
          TagComponent=tagLabel
        )
        Br
        Span.label Weaknes
        Multiselect(
          placeholder="select one or more types..."
          options=tags
          value=weaks
          onChange=setWeak
          TagComponent=tagLabel
        )
        Br
        Span.label Weight
        TextInput(
          placeholder='weight'
          value=weight
          onChangeText=setWeight
        )
        Br
        Span.label Height
        TextInput(
          placeholder='height'
          value=height
          onChangeText=setHeight
        )
        Br
        Span.label(styleName=showError?'error':null) Category #{showError?'- this fields is required':null}
        TextInput(
          placeholder='category'
          value=category
          onChangeText=setCategory
          inputStyle=showError?{borderColor:'red'}:null)
        Br
        Span.label Ability
        TextInput(
          placeholder='ability'
          value=ability
          onChangeText=setAbility
        )
        Br
        Button(color='success' variant='flat' onPress=postPokemon) Save
        Br

  `
})
