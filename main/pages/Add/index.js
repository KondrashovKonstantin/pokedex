import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { observer, emit, useModel, useValue } from 'startupjs'
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
  const [pokemonData, $pokemonData] = useValue({
    types: [],
    weaks: []
  })
  const [showError, setError] = useState(false)

  async function postPokemon () {
    if (pokemonData.name) {
      let pokemon = $pokemon.query('pokemons', { $count: true })
      await pokemon.subscribe()
      let number = pokemon.getExtra()
      $pokemon.addSelf({ ...pokemonData, number: number + 1 })
      emit('url', '/')
    } else {
      setError(true)
    }
  }

  return pug`
    ScrollView.root
      Content
        Span.label(styleName=showError?'error':null)= "Pokemon Name" + showError ? "- this fields is required" : null
        TextInput(
          placeholder='enter pokemon name...'
          value=pokemonData.name
          onChangeText=(value)=>$pokemonData.set('name', value)
          inputStyle=showError?{borderColor:'red'}:null)
        Br
        TextInput(
          placeholder='image uri...'
          value=pokemonData.image
          onChangeText=(value)=>$pokemonData.set('image', value)
        )
        Br
        Span.label Types
        Multiselect(
          placeholder="select one or more types..."
          options=tags
          value=pokemonData.types
          onChange=(value)=>$pokemonData.set('tags', value)
          TagComponent=tagLabel
        )
        Br
        Span.label Weaknes
        Multiselect(
          placeholder="select one or more types..."
          options=tags
          value=pokemonData.weaks
          onChange=(value)=>$pokemonData.set('weaks', value)
          TagComponent=tagLabel
        )
        Br
        Span.label Weight
        TextInput(
          placeholder='weight'
          value=pokemonData.weight
          onChange=(value)=>$pokemonData.set('weight', value)
        )
        Br
        Span.label Height
        TextInput(
          placeholder='height'
          value=pokemonData.height
          onChange=(value)=>$pokemonData.set('height', value)
        )
        Br
        Span.label(styleName=showError?'error':null) Category #{showError?'- this fields is required':null}
        TextInput(
          placeholder='category'
          value=pokemonData.category
          onChange=(value)=>$pokemonData.set('category', value)
          inputStyle=showError?{borderColor:'red'}:null)
        Br
        Span.label Ability
        TextInput(
          placeholder='ability'
          value=pokemonData.ability
          onChange=(value)=>$pokemonData.set('ability', value)
        )
        Br
        Button(color='success' variant='flat' onPress=postPokemon) Save
        Br

  `
})
