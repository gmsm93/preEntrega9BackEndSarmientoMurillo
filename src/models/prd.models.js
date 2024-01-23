import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const prdCollection = 'products'

const prdSchema = new mongoose.Schema({
    id:{type:String, unique:true},
    title:{type:String},
    description:{type:String},
    code:{type:String},
    price:{type:Number},
    status:{type:Boolean},
    stock:{type:Number},
    category:{type:String},
    thumbnails:{type:String},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  })

prdSchema.plugin(mongoosePaginate)

const prdModel = mongoose.model(prdCollection, prdSchema)

export default prdModel