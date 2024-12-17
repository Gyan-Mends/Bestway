import { Schema } from "mongoose";
import { ProductInterface } from "~/interfaces/interface";
import mongoose from "~/mongoose.server";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    costPrice: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    totalProductAmount: {
        type: Number,
        require: true,
    },
    totalProductAmountAfterSales: {
        type: Number,
        require: true,
    },
    profitAfterSales: {
        type: Number,
        require: true,
    },
    category: {
        ref:"category",
        type: Schema.Types.ObjectId,
        require: true,
    },
    image: {
        type:String,
        require: true,
    },
    low_stock: {
        type:String,
        require: true,
    },
    description: {
        type:String,
        require: true,
    },
    seller: {
        ref:"registration",
        type:Schema.Types.ObjectId,
        require: true,
    },
})

let Product: mongoose.Model<ProductInterface>;

try {
    Product =  mongoose.model<ProductInterface>("product");
} catch (error) {
    Product =  mongoose.model<ProductInterface>("product",ProductSchema);
}

export default Product