
import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router()

router.get('/', (req, res) => {
    logger.debug('Debug message');
    logger.http('http message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal message');
    res.send('Logger test finalizado exitosamente!');
});

export default router;