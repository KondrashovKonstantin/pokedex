import React, { useState } from 'react'
import { observer, useValue, emit } from 'startupjs'
import { ScrollView } from 'react-native'
import './index.styl'
import { Content, TextInput, Multiselect, Span, Div, Br, Button } from '@startupjs/ui'
import { Tag, TestComponent} from '../../../components'
import axios from 'axios'

const tags = [
  {label:'bug', value:'bug'}, {label:'dragon', value:'dragon'},
  {label:'fairy', value:'fairy'}, {label:'fire', value:'fire'},
  {label:'ghost', value:'ghost'},{label:'ground', value:'ground'},
  {label:'normal', value:'normal'},{label:'psychik', value:'psychik'},
  {label:'steel', value:'steel'},{label:'dark', value:'dark'},
  {label:'electric', value:'electric'},{label:'fighting', value:'fighting'},
  {label:'flying', value:'flying'},{label:'grass', value:'grass'},
  {label:'ice', value:'ice'},{label:'poission', value:'poission'},
  {label:'rock', value:'rock'},{label:'watter', value:'watter'},
]

export default observer(function Add () {

  const tagLabel = ({record}) => {
    return pug`
      Tag(type=record.label input)
    `
  }

  const [, $prop] = useValue()
  const [, $stat] = useValue()
  const [types, setTypes] = useState([])
  const [weaks, setWeak] = useState([])
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [category, setCategory] = useState()
  const [ability, setAbility] = useState()

  async function postPokemon(){
    let pokemonData={name, types, weaks, image, height, weight, category, ability }
    await axios.post('/api/pokemon', pokemonData)
    emit('url', '/')
  }


  return pug`
    ScrollView.root
      Content
        TextInput(
          label='Pokemon Name' 
          placeholder='enter pokemon name...'
          value=name
          onChangeText=setName)
        Br
        TextInput(
          label='Image URI'
          placeholder='image uri...'
          value=image
          onChangeText=setImage)
        Br
        Multiselect(
          label="Type"
          placeholder="select one or more types..."
          options=tags
          value=types
          onChange=setTypes
          TagComponent=tagLabel
        )
        Br
        Multiselect(
          label="Weaknesses"
          placeholder="select one or more types..."
          options=tags
          value=weaks
          onChange=setWeak
          TagComponent=tagLabel
        )
        Br
        TextInput(
          placeholder='weight'
          label='Weight'
          value=weight
          onChangeText=setWeight
        )
        Br
        TextInput(
          placeholder='height'
          label='Height'
          value=height
          onChangeText=setHeight
        )
        Br
        TextInput(
          placeholder='category'
          label='Category'
          value=category
          onChangeText=setCategory
        )
        Br
        TextInput(
          placeholder='ability'
          label='Ability'
          value=ability
          onChangeText=setAbility
        )
        Br
        Button(color='success' variant='flat' onPress=postPokemon) Save
        Br

  `
})
