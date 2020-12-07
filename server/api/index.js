import express from 'express'

const router = express.Router()

// All API routes are automatically prefixed with /api (see server/index.js file)

router.get('/test-thing', async (req, res) => {
    const { model } = req
    const $testThing = model.at('testThings.first')
    await $testThing.subscribe()
    res.json({ name: 'Test API', testThing: $testThing.get() })
  })
  router.post('/pokemon', async (req, res) => {
    const { model } = req
    const $pokemon = model.at('pokemon.')
    await $pokemon.addNew(req.body)
    res.json({ message:'succesfully added' })
  })
  router.get('/pokemon', async (req, res) => {
    const { model } = req
    const {limit, page} = req.query
    const search = req.query.search?req.query.search:''
    const tags = req.query.tags?req.query.tags:[]
    const skip = limit*(page-1)
    let $query
    if (tags.length>0){
      $query = model.query('pokemons',{$limit:parseInt(limit), $skip:skip, name:{$regex: search, $options:'-i'}, types:{$all:tags}})
    }
    else{
      $query = model.query('pokemons',{$limit:parseInt(limit), $skip:skip, name:{$regex: search, $options:'-i'}})
    }
    await $query.fetch()
    const $countquery = model.query('pokemons', {})
    await $countquery.fetch()
    let count = $countquery.get().length
    let pagesCount = Math.ceil(count / limit)
    res.json({items:$query.get(), pagesCount})
  })
// Add new REST API routes here

export default router
