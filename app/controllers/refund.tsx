import { json } from "@remix-run/node";
import mongoose from "mongoose";
import Cart from "~/modal/cart";
import Refund from "~/modal/refund";
import Registration from "~/modal/registration";
import Sales from "~/modal/sales";
import { getSession } from "~/session";

const { ObjectId } = mongoose.Types;

class RefundController {
    async Refund({ request,id }: { request: Request,id:string }) {
        const Delete = await Sales.findByIdAndDelete(id)
        if(Delete){
          return json({
            message: "Refund successful",
            success:true
          })
        }else{
          return json({
            message:"Unable to apply for refund",
            success: false
          })
        }
      }
}

const refundController = new RefundController();
export default refundController;
