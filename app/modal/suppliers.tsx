import mongoose from "~/mongoose.server";
import { SuppliersInterface } from "~/interfaces/interface";

const SuppliersSchema = new mongoose.Schema({
    firstName : {
      require: true,
      type: String,
    },
    middleName : {
      require: true,
      type: String,
    },
    lastName : {
      require: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
    phone: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    admin: {
      require: true,
      type: String,
    },
},{
  timestamps:true
})

let Suppliers : mongoose.Model<SuppliersInterface>

try {
    Suppliers = mongoose.model<SuppliersInterface>("suppliers")
} catch (error) {
    Suppliers = mongoose.model<SuppliersInterface>("suppliers", SuppliersSchema)

}

export default Suppliers