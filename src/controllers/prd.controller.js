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
        const productNew = req.body;
        productNew.owner = req.user._id;
        const result = await prdModel.create(productNew);
        res.redirect('/product');
    } catch(error){
        res.render('error',{error:'Error al crear el product'})
    }
};

export const putPrd = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prdModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (req.user.role === 'premium' && String(product.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: 'No tienes permiso para modificar este producto' });
        }

        const updatedProduct = await prdModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.json({ status: 'success', product: updatedProduct });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePrd = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prdModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (req.user.role === 'premium' && String(product.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
        }

        await prdModel.deleteOne({ _id: id });
        return res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json(error);
    }
};



