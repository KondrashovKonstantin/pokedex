import React, { useEffect, useState } from 'react'
import { observer, useDoc, emit } from 'startupjs'
import { ScrollView, Image } from 'react-native'
import './index.styl'
import { Span, Div, Row, Loader, Card, Button, TextInput, Multiselect, Br } from '@startupjs/ui'
import { Tag } from '../../../components'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
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

export default observer(function Pokemon (props) {

    const [pokemon, $pokemon] = useDoc('pokemons', props.match.params.id)
    
    const [edit, toggleEdit] = useState(false)
    const [name, setName] = useState(pokemon.name) 
    const [types, setTypes] = useState(pokemon.types)
    const [weaks, setWeaks] = useState(pokemon.weaks)
    const [weight, setWeight] = useState(pokemon.weight)
    const [height, setHeight] = useState(pokemon.height)
    const [category, setCategory] = useState(pokemon.category)
    const [ability, setAbility] = useState(pokemon.ability)
    const [image, setImage] = useState(pokemon.image)

    const tagLabel = ({record}) => {
        return pug`
          Tag(type=record.label input)
        `
      }

    const onSave = () => {
        const pokemonData = {name, types, weaks, weight, height, category, ability, image, id: pokemon.id}
        axios.put('/api/pokemon', pokemonData)
        toggleEdit(!edit)
    }

  return pug`
    ScrollView.root
        Button(icon=faArrowLeft, style={width: '32px'}, onPress = () => emit('url', '/'))
        Card.pokemon
            Div.wrapper
                Div
                    if edit
                        Image.img(source=image)
                        Br
                        TextInput(value=image onChangeText=setImage)
                    else
                        Image.img(source=pokemon.image)
                Div(styleName='holder')
                    if edit
                        TextInput(value=name, onChangeText=setName)
                        Br
                        Multiselect(
                            label="Types"
                            placeholder="select one or more types..."
                            options=tags
                            value=types
                            onChange=setTypes
                            TagComponent=tagLabel
                        )
                        Br
                        Multiselect(
                            label="Weaks"
                            placeholder="select one or more types..."
                            options=tags
                            value=weaks
                            onChange=setWeaks
                            TagComponent=tagLabel
                        )
                        Div.properties
                            Row.subtitle(vAlign='center', styleName='first', align='between')
                                Span Weight: 
                                TextInput.inp(value=weight onChangeText=setWeight)
                            Row.subtitle(vAlign='center' align='between')
                                Span Height: 
                                TextInput.inp(value=height onChangeText=setHeight)
                            Row.subtitle(vAlign='center' align='between')
                                Span Category: 
                                TextInput.inp(value=category onChangeText=setCategory)
                            Row.subtitle(vAlign='center' align='between')
                                Span Ability: 
                                TextInput.inp(value=ability onChangeText=setAbility)
                    else
                        Span.title #{pokemon.name}
                        Span.subtitle Types:
                        Row
                            for item in pokemon.types
                                Tag(type=item)
                        Span.subtitle Weaks:
                        Row
                            for i in pokemon.weaks
                                Tag(type=i)
                        Div.properties
                            Span.subtitle(styleName='first') Weight: 
                                Span.subtitle(bold) #{pokemon.weight}
                            Span.subtitle Height: 
                                Span.subtitle(bold) #{pokemon.height}
                            Span.subtitle Category: 
                                Span.subtitle(bold) #{pokemon.category}
                            Span.subtitle Ability: 
                                Span.subtitle(bold) #{pokemon.ability}
            if !edit
                Button.btn(color='error', variant='flat' onPress = () => toggleEdit(!edit)) EDIT POKEMON
            else
                Row.subtitle(styleName='btn-hld')
                    Button(color='success' variant='flat' onPress=onSave) SAVE
                    Button.btn-row(color='error' variant='flat' onPress = () => toggleEdit(!edit)) CANCEL   
      
  `
})