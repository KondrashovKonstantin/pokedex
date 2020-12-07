import React, { useEffect, useState } from 'react'
import { observer } from 'startupjs'
import { ScrollView } from 'react-native'
import './index.styl'
import { Span, Div, Row, Loader } from '@startupjs/ui'
import {  Tag, Search } from '../../../components'
import PokemonCards from './PokemonCards'
import axios from 'axios'


export default observer(function Pokemons () {

  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [pagesCount, setPagesCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(async ()=>{
      await axios.get(`api/pokemon?page=${page+1}&limit=${limit}`).then(res=>{
          setPokemons(res.data.items)
          setPagesCount(res.data.pagesCount)
      })
  },[])

  const onSearch = () => {
      const options = {
        params:{
          page:page+1,
          search, limit, tags
        }
      }
      setLoading(true)
      axios.get(`api/pokemon?`, options).then(res=>{
        setPokemons(res.data.items)
        setPagesCount(res.data.pagesCount)
        setLoading(false)
    })
  }
  const onSetPage = async (value) => {
    setPage(value)
    setLoading(true)
    await axios.get(`api/pokemon?page=${value+1}&limit=${limit}`).then(res=>{
        setPokemons(res.data.items)
        setPagesCount(res.data.pagesCount)
        setLoading(false)
    })
}

const onSetLimit = async (value) => {
    setLimit(value)
    setLoading(true)
    await axios.get(`api/pokemon?page=${page+1}&limit=${value}`).then(res=>{
        setPokemons(res.data.items)
        setPagesCount(res.data.pagesCount)
        setLoading(false)
    })
}
  return pug`
    ScrollView.root
      Search(
        search=search
        setSearch=setSearch
        selected=tags
        setSelected=setTags
        onSearch=onSearch)
      if loading
        Div.loader
          Loader(color='error')
      else 
        PokemonCards(
          pokemons=pokemons
          setPokemons=setPokemons
          page=page
          setPage=setPage
          limit=limit
          setLimit=setLimit
          pagesCount=pagesCount
          setPagesCount=setPagesCount
          onSetPage=onSetPage
          onSetLimit=onSetLimit)
  `
})
