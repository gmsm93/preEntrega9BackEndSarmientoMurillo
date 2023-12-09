import { Router } from "express";
import {getAll, getByID, createPrd, postPrd, putPrd, deletePrd} from "../controllers/prd.controller.js"

const router = Router()

// obtener products
router.get('/', getAll)

router.get('/:id', getByID)

// Formulario crear products
router.get('/create', createPrd)

// Post crear products
router.post('/', postPrd)

// Buscar un product por nombre
router.put('/:id', putPrd)

// Borrar un product por nombre
router.delete('/:id', deletePrd)

export default router