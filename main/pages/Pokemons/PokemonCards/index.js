import React from 'react'
import { observer } from 'startupjs'
import './index.styl'
import { Pagination, Row, Select } from '@startupjs/ui'
import { PokemonCard } from '../../../../components'

export default observer(function Pokemons ({ pokemons, page, pokemonsCount, limit, setPage, setLimit }) {
  return pug`
    Select.drpdwn(value=limit options=[10, 25, 50] onChange=(value)=>setLimit(value))
    Row.root
      for pokemon in pokemons
        PokemonCard(
          image=pokemon.image
          name=pokemon.name
          number=pokemon.number
          tags=pokemon.types
          prop={height:pokemon.height, weight:pokemon.weight, category:pokemon.category, ability:pokemon.ability}
          id=pokemon.id
        )
    Row(align='center' style={marginTop:16})
      Pagination(
        pages=Math.ceil(pokemonsCount / limit)
        page=page
        onChangePage=(value)=>setPage(value)) 
  `
})
