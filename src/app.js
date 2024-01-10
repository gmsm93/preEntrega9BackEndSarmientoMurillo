import express from "express"
import logger from "./utils/logger.js";
import prdRouter from './router/prd.router.js'
import loggerRouter from './router/logger.router.js'
import handlebars from 'express-handlebars'
import passport from 'passport'
import mongoose from "mongoose"
import __dirname from "./utils.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import initializePassport from './services/passport.config.js'
import viewsRouter from './router/views.router.js'
import sessionRouter from './router/session.router.js'
import dotenv from 'dotenv'
import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers';
import CartRepository from "./repository/cart.repository.js";

// Inicializamos variables
dotenv.config()
const app=express();
const mongoURL = process.env.MONGO_URL || "mongodb+srv://r2:L53I9bfZi00L9BkV@clusterr2.028npj6.mongodb.net/?retryWrites=true&w=majority";
const mongoDBName = process.env.MONGO_DBNAME || 'ClusterR2';

const yargs  = _yargs(hideBin(process.argv));
const argv = await yargs.argv;

const useFactoryDAO = argv['use-factory-dao'];

// Configuracion de la sesion
app.use(session({
  store: MongoStore.create({
      mongoUrl: mongoURL,
      dbName: mongoDBName,
      ttl: 15
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

const cartRepository = new CartRepository(useFactoryDAO);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// configurar el motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views' );
app.set('view engine', 'handlebars');

// traer info post como JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// carpeta publica
app.use(express.static(__dirname + '/public'));

// configuracion de rutas
app.get('/health', (req, res) => res.send('ok'));
app.use('/product', prdRouter);
app.use('/loggerTest',loggerRouter);
app.use('/', viewsRouter);
app.use('/api/session', sessionRouter);
app.get('/health', (req, res) => res.send('OK'));

// Conectar Mongo DB
mongoose.connect(mongoURL, { dbName: mongoDBName })
  .then(() => {
    logger.info('Conexión a la base de datos exitosa')
    app.listen(process.env.PORT || 8080, () => console.log(`Listening ...`))
  })
  .catch((err) => {
    logger.error('Error de conexión a la base de datos:', err);
  });

