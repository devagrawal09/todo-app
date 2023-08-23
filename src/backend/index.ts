import { type LooseAuthProp } from '@clerk/clerk-sdk-node'
import { config } from 'dotenv'
config()

import express from 'express'

export const app = express()

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

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
