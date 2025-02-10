import { Schema } from "mongoose";
import mongoose from "~/mongoose.server";

interface OrderInterface {
    user: Schema.Types.ObjectId;
    cartItems: Schema.Types.ObjectId[];
    totalAmount: number;
    status: string;
    address: string;
    paymentMethod: string
}

const OrderSchema = new mongoose.Schema<OrderInterface>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "registration",
            required: true,
        },
        cartItems: [
            {
                type: Schema.Types.ObjectId,
                ref: "cart",
                required: true,
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        address: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            default: "Cash on Delivery",
            enum: ["Cash on Delivery"], // Restrict it to "Cash on Delivery"
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

let Order: mongoose.Model<OrderInterface>;

try {
    Order = mongoose.model<OrderInterface>("order");
} catch (error) {
    Order = mongoose.model<OrderInterface>("order", OrderSchema);
}

export default Order;
