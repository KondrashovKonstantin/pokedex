import React, { useState } from 'react'
import { observer } from 'startupjs'
import './index.styl'
import { Div, Pagination, Row, Select } from '@startupjs/ui'
import { PokemonCard, Tag, Search } from '../../../../components'



export default observer(function Pokemons ({pokemons, setPokemons, page, setPage, limit, setLimit, pagesCount, setPagesCount, onSetPage, onSetLimit}) {


  return pug`
    Select.drpdwn(value=limit, options=[10, 25, 50], onChange=onSetLimit)
    Div.root
        for pokemon in pokemons
            PokemonCard(
                image=pokemon.image
                name=pokemon.name
                number=pokemon.number
                tags=pokemon.types
                prop={height:pokemon.height, weight:pokemon.weight, category:pokemon.category, ability:pokemon.ability}
                id=pokemon.id

            )
    if pagesCount > 1
        Row(align='center' style={marginTop:16})
            Pagination(
                pages=pagesCount
                page=page
                onChangePage=onSetPage) 
  `
})
