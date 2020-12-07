import React, { useState } from 'react'
import { observer } from 'startupjs'
import { TouchableOpacity } from 'react-native'
import './index.styl'
import { Span, Div, Row, TextInput, Button } from '@startupjs/ui'
import { faSearch, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Tag from '../Tag'

const tags = [
  'bug', 'dragon', 'fairy', 'fire', 'ghost', 
  'ground', 'normal', 'psychik', 'steel', 'dark', 
  'electric', 'fighting', 'flying', 'grass', 'ice', 
  'poission', 'rock', 'watter'
]


export default observer(function Search ({search, setSearch, onSearch, selected, setSelected}) {

    const [searchF, toggle] = useState(false)

    const setTag=(tag)=>{
        let arr = [...selected]
        let index = selected.indexOf(tag)
        if(index!==-1){
            arr.splice(index, 1)
        }
        else{
            arr.push(tag)
        }
        setSelected(arr)
    }

    return pug`
        Div.root
            TextInput(
            icon=faSearch, 
            placeholder='Search by pokemon name'
            value=search
            onChangeText=setSearch)
            Row(vAlign='center', align='between' styleName='section')
                Button.expand(
                    icon=faChevronRight 
                    color='white' 
                    onPress=()=>toggle(!searchF))
                Span(styleName='search-text') Advanced Search
            if searchF
                Div.section
                    Row.tags-holder
                        for tag in tags
                            TouchableOpacity(
                                onPress=()=>setTag(tag))
                                Tag(type=tag key=tag selected=selected.indexOf(tag)!==-1?true:false)
                    Button.section(color='success' variant='flat' onPress=onSearch styleName='ok-btn') Search
    `
})
