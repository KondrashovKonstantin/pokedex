export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.Pokemons
  },
  {
    path: '/add',
    exact: true,
    component: components.Add
  },
  {
    path: '/pokemon/:id',
    exact: true,
    component: components.Pokemon
  }
]
