import prdModel from "../models/prd.models.js"

export const getAll = async(req, res) => {
    const products = await prdModel.find().lean().exec()
    res.render('list', {products})
};

export const getByID = async(req, res) => {
    try{
        const id = req.params.id
        const product = await prdModel.findById(req.params.id).lean().exec()
        res.render('one', {product})
    } catch(error){
        res.render('error',{error:'Error al buscar el product'})
    }
};

export const createPrd = async(req, res) => {
    res.render('create',{})
};

export const postPrd = async(req, res) => {
    try{
        const productNew = req.body
        const result =prdModel.create(productNew)
        res.redirect('/product')
    } catch(error){
        res.render('error',{error:'Error al crear el product'})
    }
};

export const putPrd = async(req, res) => {
    try{
        const id = req.params.id
        await prdModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({status:'success'})
    } catch(error){
        res.status(500).json(error)
    } 
};

export const deletePrd = async(req, res) => {
    try{
        const id = req.params.id
        await prdModel.deleteOne({_id:id})
        return res.json({status:'success'})
    } catch(error){
        res.status(500).json(error)
    }
};

