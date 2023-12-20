import { Router } from "express";
import {getCardID, createCardID, postCardID, putCardID, deleteCardID, finalizePurchase} from "../controllers/cart.controller.js"


const router = Router()

router.get('/:cartId', getCardID)

router.get('/create', createCardID)

router.post('/', postCardID)

router.put('/:cartId', putCardID)

router.delete('/:cartId', deleteCardID)

router.post('/:cartId/purchase', finalizePurchase);

export default router