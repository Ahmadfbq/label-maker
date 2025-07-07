import express from 'express'
import morgan from 'morgan'
import { usersRouter } from './routes/users'
import { authRouter } from './routes/auth'
import { publicRouter } from './routes/public.routes'
import { labelsRouter } from './routes/labels'
import { ingredientsRouter } from './routes/ingredients'
import { brandsRouter } from './routes/brands'
import { menusRouter } from './routes/menus'
import cors from 'cors'  

// setup express app
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// urls
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/labels', labelsRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/brands', brandsRouter)
app.use('/api/menus', menusRouter)
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
