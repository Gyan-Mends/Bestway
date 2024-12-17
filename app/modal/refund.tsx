import { Schema } from "mongoose";
import mongoose from "~/mongoose.server";
import { RefundInterface } from "~/interfaces/interface";

const RefundSchema = new mongoose.Schema({
  products: [{
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
    quantity:{
        type:Number,
        required:true
    }
  }],
  attendant: {
    type: Schema.Types.ObjectId,
    ref: "registration",
    required: true
  },
 
  totalAmount: {
    type: String,
    required: true
  },
  amountPaid: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

let Refund: mongoose.Model<RefundInterface>;

try {
    Refund = mongoose.model<RefundInterface>("refund");
} catch (error) {
    Refund = mongoose.model<RefundInterface>("refund", RefundSchema);
}

export default Refund;
