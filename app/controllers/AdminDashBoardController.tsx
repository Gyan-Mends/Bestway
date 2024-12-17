import { redirect } from "@remix-run/node";
import moment from "moment"; // Install moment.js for date manipulation
import Category from "~/modal/category";
import Product from "~/modal/products";
import Registration from "~/modal/registration";
import Sales from "~/modal/sales";
import Suppliers from "~/modal/suppliers";
import { commitSession, getSession } from "~/session";

class AdminDashboardController {
    async getSales({
        request,
        page = 1,
        search_term,
        limit = 8,
    }: {
        request?: Request;
        page?: number;
            search_term: string,
        limit?: number;
    }) {
        const skipCount = (page - 1) * limit; // Calculate the number of documents to skip

        // Define the search filter only once
        const searchFilter = search_term
            ? {
                $or: [
                    {
                        "payments.customerName": { // Corrected field name and syntax
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=.*${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        "payments.customerNumber": { // Corrected field name and syntax
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
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");
            const user = await Registration.findOne({ email: token });
            const productCount = await Product.countDocuments();
            const usersCount = await Registration.countDocuments();
            const suppliersCount = await Suppliers.countDocuments();
            const categoryCount = await Category.countDocuments();

            // Get paginated sales
            const sales = await Sales.find(searchFilter)
                .populate("attendant")
                .populate("products.product")
                .sort({ createdAt: -1 })
                .skip(skipCount)
                .limit(limit)
                .exec();

            const debtors = await Sales.find(
                {
                    ...searchFilter,
                    attendant: user?._id,
                    amountLeft: { $gt: 0 }
                }
            )
                .populate("products.product")

            const admindebtors = await Sales.find(
                {
                    ...searchFilter,
                    amountLeft: { $gt: 0 }
                }
            )
                .populate("attendant")
                .populate("products.product")
                .sort({ createdAt: -1 })
                .skip(skipCount)
                .limit(limit)
                .exec();


            // Define date ranges
            const today = moment().startOf("day").toDate();
            const thisWeek = moment().startOf("week").toDate();
            const thisMonth = moment().startOf("month").toDate();
            const thisYear = moment().startOf("year").toDate();
            const oneYearAgo = moment().subtract(1, "year").startOf("day").toDate();

            // Aggregations for date ranges
            const dailySales = await Sales.aggregate([
                { $match: { createdAt: { $gte: today } } },
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);

            const weeklySales = await Sales.aggregate([
                { $match: { createdAt: { $gte: thisWeek } } },
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);

            const monthlySales = await Sales.aggregate([
                { $match: { createdAt: { $gte: thisMonth } } },
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);

            const yearlySales = await Sales.aggregate([
                { $match: { createdAt: { $gte: thisYear } } },
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);

            const olderSales = await Sales.aggregate([
                { $match: { createdAt: { $lt: oneYearAgo } } },
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);

            const result = await Product.aggregate([
                {
                    $group: {
                        _id: null, // No grouping key; aggregates all documents
                        totalProductAmount: { $sum: "$totalProductAmount" } // Sum the totalAmount field
                    }
                }
            ]);
            const result1 = await Product.aggregate([
                {
                    $group: {
                        _id: null, // No grouping key; aggregates all documents
                        totalProductAmountAfterSales: { $sum: "$totalProductAmountAfterSales" } // Sum the totalAmount field
                    }
                }
            ]);
            const result2 = await Product.aggregate([
                {
                    $group: {
                        _id: null, // No grouping key; aggregates all documents
                        profitAfterSales: { $sum: "$profitAfterSales" } // Sum the totalAmount field
                    }
                }
            ]);



            // Access the totalAmount value
            const total = result.length > 0 ? result[0].totalProductAmount : 0;
            const totalAfterSales = result1.length > 0 ? result1[0].totalProductAmountAfterSales : 0;
            const totalProfitAfterSales = result2.length > 0 ? result2[0].profitAfterSales : 0;

            // Extract totals
            const dailyTotal = dailySales[0]?.total || 0;
            const weeklyTotal = weeklySales[0]?.total || 0;
            const monthlyTotal = monthlySales[0]?.total || 0;
            const yearlyTotal = yearlySales[0]?.total || 0;
            const olderTotal = olderSales[0]?.total || 0;

            // Overall total
            const totalSalesAmount = await Sales.aggregate([
                { $group: { _id: null, total: { $sum: { $toDouble: "$totalAmount" } } } },
            ]);
            const totalAmount = totalSalesAmount[0]?.total || 0;

            return {
                productCount,
                usersCount,
                suppliersCount,
                categoryCount,
                sales,
                debtors,
                admindebtors,
                user,
                totalAmount,
                dailyTotal,
                weeklyTotal,
                monthlyTotal,
                yearlyTotal,
                olderTotal,
                total,
                totalAfterSales,
                totalProfitAfterSales
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async logout(intent: string) {
        if (intent === "logout") {
            const session = await getSession();

            return redirect("/", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        }
    }
}

const adminDashboardController = new AdminDashboardController();
export default adminDashboardController;
