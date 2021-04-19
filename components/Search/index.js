import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { observer } from 'startupjs'
import './index.styl'
import { Span, Div, Row, TextInput, Button } from '@startupjs/ui'
import { faSearch, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Tag from '../Tag'

const tags = [
  'bug', 'dragon', 'fairy', 'fire', 'ghost',
  'ground', 'normal', 'psychik', 'steel', 'dark',
  'electric', 'fighting', 'flying', 'grass', 'ice',
  'poission', 'rock', 'watter'
]

export default observer(function Search ({ search, setSearch, selected, setSelected, setPage }) {
  const [searchF, toggle] = useState(false)

  const setTag = (tag) => {
    let arr = [...selected]
    let index = selected.indexOf(tag)
    if (index !== -1) {
      arr.splice(index, 1)
    } else {
      arr.push(tag)
    }
    setSelected(arr)
    setPage(0)
  }

  return pug`
    Div.root
      TextInput(
        icon = faSearch, 
        placeholder = 'Search by pokemon name'
        value = search
        onChangeText = setSearch
      )
      Row.section(vAlign = 'center', align = 'between')
        Button.expand(
          icon = faChevronRight 
          color = 'white' 
          onPress = ()=> toggle(!searchF)
        )
        Span.searchText Advanced Search
      if searchF
        Div.section
          Row.tagsHolder
            for tag in tags
              TouchableOpacity(onPress = ()=> setTag(tag))
                Tag(type = tag key = tag selected = selected.indexOf(tag)!==-1 ? true : false)
    `
})
