import TestThing from './TestThingModel'
import Pokemon from './PokemonModel'

export default function (racer) {
  racer.orm('testThings.*', TestThing)
  racer.orm('pokemon.*', Pokemon)
}
