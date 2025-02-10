import { json, redirect } from "@remix-run/node"
import Category from "~/modal/category"
import Product from "~/modal/products"
import Registration from "~/modal/registration"
import { getSession } from "~/session"
import category from "./categoryController"
import { ProductInterface, RegistrationInterface } from "~/interfaces/interface"

class ProductsController {
    async ProductAdd(
        request: Request,
        name: string,
        price: string,
        quantity: string,
        category: string,
        base64Image: string,
        low_stock: string,
        description: string,
        seller: string,
        costPrice: string,
        intent: string,

    ) {
        try {
            if (intent === "create") {
                // Check if the porduct does not exist
                const ProductCheck = await Product.findOne({ name: name })
                if (ProductCheck) {
                    return json({ message: "Product already exist. Just update it quantity", success: false }, { status: 400 })
                }

                const totalProductAmount = Number(costPrice) * Number(quantity);
                const totalProductAmountAfterSales = Number(price) * Number(quantity)
                const profitAfterSales = Number(totalProductAmountAfterSales) - Number(totalProductAmount)

                //saving the data
                const products = new Product({
                    name,
                    price,
                    quantity,
                    category,
                    image: base64Image,
                    low_stock,
                    description,
                    seller,
                    costPrice,
                    totalProductAmount,
                    totalProductAmountAfterSales,
                    profitAfterSales
                })

                if (Number(low_stock) >= Number(quantity)) {
                    return json({ message: "Low stock must be less than quantity", success: false }, { status: 400 })
                } else if (Number(price) < Number(costPrice)) {
                    return json({ message: "Runnig at loss, selling price must be equal to or more than cost price", success: false }, { status: 400 })
                } else {
                    const response = await products.save();

                    if (response) {
                        return json({ message: "Poduct saved successfully", success: true }, { status: 200 })
                    } else {
                        return json({ message: "Uable to save product", success: false }, { status: 400 })

                    }
                }

            } else {
                return json({
                    message: "Wrong intent",
                    success: false,
                    status: 400
                })

            }


        } catch (error: any) {
            return json({ message: error.message, success: false }, { status: 400 })

        }

    }


}

const productsController = new ProductsController
export default productsController