import { BaseModel } from 'startupjs/orm'

export default class PokemonModel extends BaseModel {
  async addNew (pokemonData={}) {
    console.log(this.getId())
    await this.root.add('pokemons', {
      name: pokemonData.name,
      number: pokemonData.number,
      types: pokemonData.types,
      weaks: pokemonData.weaks,
      weight: pokemonData.weight,
      height: pokemonData.height,
      category: pokemonData.category,
      ability: pokemonData.ability,
      image: pokemonData.image
    })
  }
}
