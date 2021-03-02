import { BaseModel } from 'startupjs/orm'

export default class PokemonModel extends BaseModel {
  async addSelf (pokemonData) {
    console.log(pokemonData)
    await this.root.add('pokemons', { ...pokemonData })
  }
}
