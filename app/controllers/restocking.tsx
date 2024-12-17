import { json } from "@remix-run/node";
import { ProductInterface, RegistrationInterface } from "~/interfaces/interface";
import Product from "~/modal/products";
import Registration from "~/modal/registration";
import Restock from "~/modal/restock";
import { getSession } from "~/session";

class Restocking {
    async Restock(
        name: string,
        newQuantity: string,
        user: string,
        product: string,
        costPrice: string,
        price: string
    ) {
        try {
            // Save the restock record
            const restocks = new Restock({
                name,
                newQuantity,
                user,
                product,
            });

            const response = await restocks.save();
            if (!response) {
                return json({
                    message: "Failed to save restock record.",
                    success: false,
                    status: 500,
                });
            }

            // Find the product to update
            const productData = await Product.findById(product);
            if (!productData) {
                return json({
                    message: "Product not found.",
                    success: false,
                    status: 404,
                });
            }

            // Update the product quantity
            const updatedQuantity = Number(productData.quantity || 0) + Number(newQuantity);
            const newtotalProductAmount = Number(costPrice) * updatedQuantity
            const newtotalProductAmountAfterSales = Number(price) * updatedQuantity
            const newprofitAfterSales = Number(newtotalProductAmountAfterSales) - Number(newtotalProductAmount)

            const success = await Product.findByIdAndUpdate(product, {
                quantity: updatedQuantity,
                totalProductAmount: newtotalProductAmount,
                totalProductAmountAfterSales: newtotalProductAmountAfterSales,
                profitAfterSales: newprofitAfterSales
            });

            if (success) {
                return json({
                    message: "Product restocked successfully.",
                    success: true,
                    status: 200,
                });
            } else {
                return json({
                    message: "Failed to update product quantity.",
                    success: false,
                    status: 500,
                });
            }
        } catch (error: any) {
            return json(
                {
                    message: error.message || "An unexpected error occurred.",
                    success: false,
                },
                { status: 400 }
            );
        }
    }

    async FetchProducts({
        request,
        page,
        search_term,
        limit = 9,
        low_stock = false, 
    }: {
        request: Request;
        page: number;
        search_term: string;
        limit?: number;
        low_stock?: boolean;
    }): Promise<{
        user: RegistrationInterface[];
        products: ProductInterface[];
        totalPages: number;
    } | any> {
        const skipCount = (page - 1) * limit;

        // Define the search filter
        const searchFilter: any = search_term
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

        // Add low stock condition if applicable
        if (low_stock) {
            searchFilter.quantity = { $lt: 5 };
        }

        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");
            const user = await Registration.findOne({ email: token });

            const totalProductsCount = await Product.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalProductsCount / limit);

            const products = await Product.find(searchFilter)
                .populate("category")
                .skip(skipCount)
                .limit(limit)
                .exec();

            return { user, products, totalPages, totalProductsCount };
        } catch (error: any) {
            return {
                message: error.message,
                success: false,
                status: 500,
            };
        }
    }

}

const restocking = new Restocking
export default restocking