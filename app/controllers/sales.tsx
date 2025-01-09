import { json } from "@remix-run/node";
import { RegistrationInterface, SalesInterface } from "~/interfaces/interface";
import Cart from "~/modal/cart";
import Product from "~/modal/products";
import Registration from "~/modal/registration";
import Sales from "~/modal/sales";
import { getSession } from "~/session";

class SalesController {
  async AddCartToSales({
    intent,
    request,
    attendant,
    totalAmount,
    amountPaid,
    balance,
    quantity,
    costprice,
    price,
    product,
    customerName,
    customerNumber
  }: {
    intent: string;
    request: Request;
    product: string;
    costprice: string;
    attendant: string;
    totalAmount: string;
    amountPaid: string;
    balance: string;
    quantity: string;
    price: string;
    customerName: string;
    customerNumber: string;
  }) {
    const UNKNOWN_CUSTOMER = "Unknown";
    const PAYMENT_METHOD = "cash";

    if (intent === "addCartToSales") {
      try {
        const session = await getSession(request.headers.get("Cookie"));
        const token = session.get("email");
        const user = await Registration.findOne({ email: token });
        const carts = await Cart.find({ attendant: user?._id }).populate("product");

        if (!carts.length) {
          return json({
            message: "Your cart is empty. Cannot proceed to checkout.",
            success: false,
            status: 400,
          });
        }

        const totalPaid = Math.min(Number(amountPaid), Number(totalAmount)); // Cap to totalAmount
        const remainingBalance = Number(totalAmount) - totalPaid;

        const productsArray = carts.map((item) => ({
          product: item.product._id,
          quantity: Number(item.quantity),
          price: Number(item.product.price),
          costprice: Number(item.product.costprice),
        }));

        const sale = new Sales({
          products: productsArray,
          attendant,
          totalAmount: Number(totalAmount),
          amountPaid: totalPaid,
          balance: remainingBalance,
          payments: [
            {
              customerNumber: customerNumber || UNKNOWN_CUSTOMER,
              customerName: customerName || UNKNOWN_CUSTOMER,
              amount: totalPaid,
              paymentDate: new Date(),
              method: PAYMENT_METHOD,
            },
          ],
        });

        const addSales = await sale.save();

        if (addSales) {
          await Cart.deleteMany({ attendant: user._id });

          // Bulk inventory update
          const bulkUpdates = carts.map((item) => ({
            updateOne: {
              filter: { _id: item.product._id },
              update: { $inc: { quantity: -item.quantity } },
            },
          }));
          await Product.bulkWrite(bulkUpdates);

          return json({
            message: "Sales completed successfully.",
            success: true,
            status: 200,
          });
        }

        return json({
          message: "Failed to complete sales.",
          success: false,
          status: 500,
        });
      } catch (error: any) {
        console.error("Sales processing error:", error);
        return json({
          message: "An error occurred while processing the sale.",
          success: false,
          status: 500,
        });
      }
    }

  }


  async getSales({
    request,
    page,
    search_term,
    limit = 9
  }: {
    request?: Request,
    page?: number | any;
    search_term?: string;
    limit?: number;
  }): Promise<{
    user: RegistrationInterface[],
    sales: SalesInterface[],
    totalPages: number
  } | any> {
    const skipCount = (page - 1) * limit; // Calculate the number of documents to skip

    // Define the search filter only once
    const searchFilter = search_term
      ? {
        $or: [
          {
            name: {
              $regex: new RegExp(
                search_term
                  .split(" ")
                  .map((term) => `(?=.*${term})`)
                  .join(""),
                "i"
              ),
            },
          },

        ],
      }
      : {};

    try {
      // Get session and user information
      const session = await getSession(request.headers.get("Cookie"));
      const token = session.get("email");
      const user = await Registration.findOne({ email: token });

      // Get total employee count and calculate total pages       
      const totalProductsCount = await Sales.countDocuments(searchFilter).exec();
      const totalPages = Math.ceil(totalProductsCount / limit);

      // Find users with pagination and search filter
      const sales = await Sales.find(searchFilter)
        .populate("category")
        .skip(skipCount)
        .limit(limit)
        .exec();

      const debtors = await Sales.find(searchFilter, {
        attendant: user?._id,
        amountLeft: { $gt: 0 }
      })
        .populate("category")
        .skip(skipCount)
        .limit(limit)
        .exec();


      return { user, sales, totalPages, debtors };
    } catch (error: any) {
      return {
        message: error.message,
        success: false,
        status: 500
      };
    }
  }

  async Refund({
    intent,
    id,
    quantity,
    amount,
  }: {
    intent: string;
    id: string;
    quantity: string;
    amount: string;
  }) {
    try {
      // Find the sale and remove the specific product
      const updatedSale = await Sales.findOneAndUpdate(
        { "products.product": id }, // Match the sale containing the product
        { $pull: { products: { product: id } } }, // Remove the specific product from the array
        { new: true } // Return the updated document
      );

      if (updatedSale) {
        // Update the amountPaid after refund
        const newAmountPaid = Number(updatedSale.amountPaid) - Number(amount);
        const newTotalAmount = Number(updatedSale.totalAmount) - Number(amount);
        const paymentAmount = Number(updatedSale.payments.amount) - Number(amount);

        if (updatedSale.products.length === 0) {
          // Delete the sale if no products remain
          await Sales.deleteOne({ _id: updatedSale._id });
        } else {
          // Update the amountPaid in the sale document
          updatedSale.amountPaid = newAmountPaid.toString();
          await updatedSale.save();
          updatedSale.totalAmount = newTotalAmount.toString();
          await updatedSale.save();
          updatedSale.payments.amount = paymentAmount.toString();
          await updatedSale.save();
        }

        // Update the product quantity in inventory
        const product = await Product.findById(id);
        if (product) {
          const newQuantity = product.quantity + Number(quantity);
          await Product.findByIdAndUpdate(id, { quantity: newQuantity });

          return json({
            message: "Refund made successfully",
            success: true,
            status: 200,
          });
        } else {
          return json({
            message: "Product not found",
            success: false,
            status: 404,
          });
        }
      } else {
        return json({
          message: "Sale or product not found",
          success: false,
          status: 404,
        });
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      return json({
        message: "An error occurred while processing the refund",
        success: false,
        status: 500,
      });
    }
  }



}

const salesController = new SalesController();
export default salesController;


// const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const salesCount = await Sales.countDocuments({
//       createdAt: {
//         $gte: today
//       }
//     }).exec();
//     const dailySales = await Sales.find({
//       createdAt: {
//         $gte: today
//       }
//     }).exec();