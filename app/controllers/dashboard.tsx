import { json } from "@remix-run/node";
import { ProductInterface, RegistrationInterface, SalesInterface, SuppliersInterface } from "~/interfaces/interface";
import Category from "~/modal/category";
import Product from "~/modal/products";
import Registration from "~/modal/registration";
import Sales from "~/modal/sales";
import Suppliers from "~/modal/suppliers";

class DashboardController {
    async Dashboard(): Promise<{
        adminsales: SalesInterface[],
        userCount: number,
        supplierCount: number,
        productsCount: number,
        profit:number,
        categoryCount:number

    }> {
        const adminsales = await Sales.find()
            .populate("products.product")
            .populate("attendant")
            .exec();

        const userCount = await Registration.countDocuments().exec();
        const supplierCount = await Suppliers.countDocuments().exec()
        const productsCount = await Product.countDocuments()
        const products = await Product.find()

        const sellinPrice = products.reduce((acc, products) => {
            return acc + Number(products.price); // Ensure quantity is treated as a number
        }, 0);

        const costPrice = products.reduce((acc, products) => {
            return acc + Number(products.costPrice); // Ensure quantity is treated as a number
        }, 0);

        const profit = sellinPrice - costPrice
        const categoryCount = await Category.countDocuments()



        return {
            adminsales,
            userCount,
            supplierCount,
            productsCount,
            profit,
            categoryCount,
        }
    }
}

const dashboardController = new DashboardController
export default dashboardController