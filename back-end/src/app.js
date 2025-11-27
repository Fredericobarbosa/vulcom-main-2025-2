import dotenv from 'dotenv'
dotenv.config() // Carrega as variáveis de ambiente do arquivo .env

import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

/*
  Vulnerabilidade API8:2023 - Má Configuração de Segurança
  Esta vunerabilidade foi parcialmente mitigada com CORS configurado (origin restrito), rate limiting ativo, dotenv para variáveis sensíveis.
  1- Poderia haver melhora adicionando helmet (headers de segurança HTTP), desabilitamento do stack traces em produção (NODE_ENV=production),
  2- Validação que TOKEN_SECRET seja forte, HTTPS obrigatório, logs sem dados sensíveis.
  3- Revisão do bypassRoutes (auth.js) para não expor endpoints desnecessários.
*/

const app = express()

import cors from 'cors'

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
}))

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// Rate limiter: limita a quantidade de requisições que cada usuário/IP
// pode efetuar dentro de um determinado intervalo de tempo
import { rateLimit } from 'express-rate-limit'


const limiter = rateLimit({
 windowMs: 60 * 1000,    // Intervalo: 1 minuto
 limit: 20               // Máximo de 20 requisições
})


app.use(limiter)

/*********** ROTAS DA API **************/

// Middleware de verificação do token de autorização
import auth from './middleware/auth.js'
app.use(auth)

import carsRouter from './routes/cars.js'
app.use('/cars', carsRouter)

import customersRouter from './routes/customers.js'
app.use('/customers', customersRouter)

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

export default app
