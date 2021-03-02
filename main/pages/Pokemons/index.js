/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { observer, useQuery } from 'startupjs'
import './index.styl'
import { Search } from '../../../components'
import PokemonCards from './PokemonCards'

export default observer(function Pokemons () {
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [expression, setExpression] = useState({ $skip: page * limit, $limit: limit, name: { $regex: search, $options: '-i' } })
  const [countExpression, setCountExpression] = useState({ name: { $regex: search, $options: '-i' }, $count: true })
  const [pokemons, $pokemons] = useQuery('pokemons', expression)
  const [pokemonsCount, $pokemonsCount] = useQuery('pokemons', countExpression)

  useEffect(() => {
    if (tags.length > 0) {
      setExpression({ $skip: page * limit, $limit: limit, name: { $regex: search, $options: '-i' }, types: { $all: tags } })
      setCountExpression({ name: { $regex: search, $options: '-i' }, types: { $all: tags }, $count: true })
    } else {
      setExpression({ $skip: page * limit, $limit: limit, name: { $regex: search, $options: '-i' } })
      setCountExpression({ name: { $regex: search, $options: '-i' }, $count: true })
    }
  }, [tags, page, limit, search])

  return pug`
    ScrollView.root
      Search(
        search = search
        setSearch = setSearch
        selected = tags
        setSelected = setTags
        setPage = setPage
      )
      PokemonCards(
        pokemons = pokemons
        pokemonsCount = pokemonsCount
        page = page
        setPage = setPage
        limit = limit
        setLimit = setLimit
      )
  `
})
