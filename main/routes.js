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
  }
]
