import { Schema } from "mongoose";
import mongoose from "~/mongoose.server";
import { SalesInterface } from "~/interfaces/interface";

const SalesSchema = new mongoose.Schema({
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
    },
  }],
  attendant: {
    type: Schema.Types.ObjectId,
    ref: "registration",
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: String,
    default: "0", // Initial payment of 0
  },
  balance: {
    type: String,
    required: true,
  },
  amountLeft: {
    type: String,
    default: function () {
      // Set amountLeft as the difference between totalAmount and amountPaid on creation
      return (parseFloat(this.totalAmount) - parseFloat(this.amountPaid)).toString();
    },
  },
  payments: [{
    amount: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ['cash', 'card', 'mobile'],
      required: true,
    },
    customerName: {
      type: String, // New field to store the customer's name
    },
    customerNumber: {
      type: String, // New field to store the customer's name
    },
  }],
}, {
  timestamps: true,
});

// Ensure that amountLeft is recalculated whenever a payment is made, and set to 0 when amountPaid >= totalAmount
SalesSchema.pre("save", function (next) {
  if (this.isModified("amountPaid") || this.isModified("totalAmount")) {
    const amountPaid = parseFloat(this.amountPaid);
    const totalAmount = parseFloat(this.totalAmount);

    // If amountPaid is greater than or equal to totalAmount, set amountLeft to 0
    if (amountPaid >= totalAmount) {
      this.amountLeft = "0";
    } else {
      this.amountLeft = (totalAmount - amountPaid).toString();
    }
  }
  next();
});

let Sales: mongoose.Model<SalesInterface>;

try {
  Sales = mongoose.model<SalesInterface>("sales");
} catch (error) {
  Sales = mongoose.model<SalesInterface>("sales", SalesSchema);
}

export default Sales;
