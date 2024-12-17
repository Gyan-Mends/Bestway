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
      customerNumber: string
  }) {
    if (intent === "addCartToSales") {
      try {
        const session = await getSession(request.headers.get("Cookie"));
        const token = session.get("email");
        const user = await Registration.findOne({ email: token });
        const carts = await Cart.find({ attendant: user?._id }).populate("product");

        if (carts.length === 0) {
          return json({
            message: "There is no item in your cart, can't proceed to checkout",
            success: false,
            status: 400,
          });
        } else {
          // Allow partial payments
          const totalPaid = Number(amountPaid); // Initialize with the received part payment
          let remainingBalance = Number(totalAmount) - totalPaid; // Calculate balance

          // If amountPaid is less than totalAmount, set balance to 0
          if (totalPaid < Number(totalAmount)) {
            remainingBalance = 0; // Balance should remain zero when amountPaid < totalAmount
          }

          // Create an array of products in the cart
          const productsArray = [];
          for (const item of carts) {
            const { product: prod, quantity } = item;
            if (prod) {
              const { price, costprice } = prod;
              productsArray.push({
                product: prod,
                quantity,
                price,
                costprice,
              });
            }
          }

          // Create the sale record
          const sale = new Sales({
            products: productsArray,
            attendant,
            totalAmount,
            amountPaid: totalPaid.toString(),
            balance: remainingBalance.toString(),
            payments: [{
              customerNumber: customerNumber || "Unkown",
              customerName: customerName || "Unknown",
              amount: totalPaid,
              paymentDate: new Date(),
              method: "cash", // Modify this based on your payment method
            }],
          });

          // Save the sale record
          const addSales = await sale.save();
          if (addSales) {
            // Empty the cart after the sale is successful
            const emptyCart = await Cart.deleteMany({ attendant: user });

            // Update the inventory based on the cart items
            for (const item of carts) {
              const { product: prod, quantity } = item;
              const productInInventory = await Product.findById(prod);
              if (productInInventory) {
                const newQuantity = productInInventory.quantity - Number(quantity);
                await Product.findByIdAndUpdate(prod, { quantity: newQuantity });
              }
            }

            return json({
              message: "Sales made successfully",
              success: true,
              status: 200,
            });
          } else {
            return json({
              message: "Unable to make sales",
              success: false,
              status: 400,
            });
          }
        }
      } catch (error: any) {
        return json({
          message: error.message,
          success: false,
          status: 500,
        });
      }
    } else {
      return json({
        message: "Wrong intent",
        success: false,
        status: 500,
      });
    }
  }




  async  getSales({
    request,
    page,
    search_term,
    limit = 9
}: {
    request?: Request,
    page?: number | any;
    search_term?: string;
    limit?: number;
}):Promise<{
    user: RegistrationInterface[],
    sales:SalesInterface[],
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