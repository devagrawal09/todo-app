import { config } from 'dotenv'
config()

import { remultExpress } from 'remult/remult-express'
import { ClerkExpressWithAuth, type LooseAuthProp } from '@clerk/clerk-sdk-node'
import swaggerUi from 'swagger-ui-express'
import { createSchema, createYoga } from 'graphql-yoga'
import { remultGraphql } from 'remult/graphql'
import express from 'express'
import { Task } from '../models/Task'

export const app = express()

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

const api = remultExpress({
  entities: [Task],
})

app.use(ClerkExpressWithAuth(), api)

const openApiDocument = api.openApiDoc({ title: 'remult-react-todo' })
app.get('/api/openApi.json', (req, res) => res.json(openApiDocument))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument))

const yoga = createYoga({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema(
    remultGraphql({
      entities: [Task],
    })
  ),
})
app.use(yoga.graphqlEndpoint, api.withRemult, yoga)

/**
 * In Development:
 * Vite dev server serves and hot reload the api
 * @see
 * vite.config.ts
 *
 * In Production:
 * express serves the api and the react app from /dist
 */
if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.sendFile(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'] || 3002, () => console.log('Server started'))
}
