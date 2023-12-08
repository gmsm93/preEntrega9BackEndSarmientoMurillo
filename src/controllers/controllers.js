import modelService from "../services/services.js";

const modelService = new modelService()

export const getAll = (req, res) => {
    res.json(modelService.getAll())
}

export const create = (req, res) => {
    const data = req.body

    res.json(modelService.create(data))
}

export const turnOff = (req, res) => {
    const id = parseInt(req.params.id)

    res.json(modelService.turnOff(id))
}