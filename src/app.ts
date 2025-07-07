import express from 'express'
import morgan from 'morgan'
import { usersRouter } from './routes/users'
import { authRouter } from './routes/auth'
import { publicRouter } from './routes/public.routes'
import { labelRouter } from './routes/labels'
import { ingredientRouter } from './routes/ingredients'
import cors from 'cors'  

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/labels', labelRouter)
app.use('/api/ingredients', ingredientRouter)
app.use('/api/public', publicRouter)
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
app.get('/api/test', (req, res) => {
  res.send({ msg: 'Hello' })
})
// Enable CORS for all routes

export default app
