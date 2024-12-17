import { Schema } from "mongoose";
import mongoose from "~/mongoose.server";
import { CartInterface } from "~/interfaces/interface";

const CartSchema = new mongoose.Schema({
    quantity: {
        type:String,
        require:true
    },
    product: {
        type:Schema.Types.ObjectId,
        ref:"product",
        require:true
    },
    attendant: {
        type:Schema.Types.ObjectId,
        ref:"registration",
        require:true
    },
    price: {
        type:String,
        require:true
    },
   
},{
    timestamps:true
})

let Cart: mongoose.Model<CartInterface>;

try {
    Cart =  mongoose.model<CartInterface>("cart");
} catch (error) {
    Cart =  mongoose.model<CartInterface>("cart",CartSchema);
}

export default Cart