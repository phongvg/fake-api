import express from 'express'
import usersRouter from '~/routes/users.routes'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world')
})
app.use(express.json())
app.use('/users', usersRouter)
app.listen(port, () => {
  console.log(`example app is running on port ${port}`)
})
