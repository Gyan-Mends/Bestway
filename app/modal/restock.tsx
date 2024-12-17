import { Schema } from "mongoose";
import { RestockInterface } from "~/interfaces/interface";
import mongoose from "~/mongoose.server";

const RestockSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    new_quantity: {
        type: Number,
        require: true,
    },
    user: {
        type: String,
        require: true,
    },
    product: {
        type: String,
        require: true,
    },
    paymentStatus: { type: String, enum: ["Partial", "Paid"], default: "Paid" }, 


}, {
    timestamps: true
})

let Restock: mongoose.Model<RestockInterface>;

try {
    Restock = mongoose.model<RestockInterface>("restock");
} catch (error) {
    Restock = mongoose.model<RestockInterface>("restock", RestockSchema);
}

export default Restock