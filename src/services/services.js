import mModel from '../models/model.js'

class modelService {
    constructor() {
        this.mModel = new mModel()
    }

    getAll = () => {
        return this.mModel.getAll()
    }

    create = data => {
        return this.mModel.create(data)
    }

    turnOff = id => {
        this.mModel.update(id, {turn: false})

        return true
    }

}

export default modelService