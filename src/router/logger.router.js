import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router()

router.get('/loggerTest', (req, res) => {
  try {
    logger.debug('Este es un mensaje de debug');
    logger.info('Este es un mensaje de info');
    logger.warn('Este es un mensaje de advertencia');
    logger.error('Este es un mensaje de error');
    logger.fatal('Este es un mensaje fatal');

    throw new Error('Este es un error de prueba');
  } catch (error) {

    logger.error(error.message);

    res.status(500).send('Error interno del servidor');
  }
});

export default router
