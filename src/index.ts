import express, { Request, Response, NextFunction } from 'express'
import usersRouter from '~/routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlerwares'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world')
})
app.use(express.json())
app.use('/users', usersRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`example app is running on port ${port}`)
})
