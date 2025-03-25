const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    oldprice:{
        type:Number,
        required:true,
    },
    url_img:{
        type: [String],
        required:true,
    },
    qte_stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
},{timestamps:true})
module.exports=mongoose.model('Produits',productSchema)