import express from 'express'

const router = express.Router()

// All API routes are automatically prefixed with /api (see server/index.js file)

router.get('/test-thing', async (req, res) => {
  const { model } = req
  const $testThing = model.at('testThings.first')
  await $testThing.subscribe()
  res.json({ name: 'Test API', testThing: $testThing.get() })
})
// Add new REST API routes here

export default router
