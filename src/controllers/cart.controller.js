import cartModel from "../models/cart.models.js"

export const getCardID = async(req, res) => {
    try{
        const cartId = req.params.cartId
        const product = await cartModel.findById(req.params.cartId).lean().exec()
        res.render('one', {product})
    } catch(error){
        res.render('error',{error:'Error al buscar el product'})
    }
};

export const createCardID = async(req, res) => {
    res.render('create',{})
};

export const postCardID = async(req, res) => {
    try{
        const productNew = req.body
        const result =cartModel.create(productNew)
        res.redirect('/product')
    } catch(error){
        res.render('error',{error:'Error al crear el product'})
    }
};

export const putCardID = async(req, res) => {
    try{
        const cartId = req.params.cartId
        await cartModel.findByIdAndUpdate(req.params.cartId, req.body, { new: true })
        return res.json({status:'success'})
    } catch(error){
        res.status(500).json(error)
    }   
};

export const deleteCardID = async(req, res) => {
    try{
        const cart = await cartModel.findById(cartId)
        cart.id = []
        await cart.save()
        return res.json({status:'success'})
    } catch(error){
        res.status(500).json(error)
    }
};

