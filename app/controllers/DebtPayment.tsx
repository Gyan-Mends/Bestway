import { json } from "@remix-run/node"
import Sales from "~/modal/sales"

class Debtpayment {
    async payDebt({
        totalAmount,
        amountLeft,
        amountPaid,
        amountLeftToBePaid,
        id
    }: {
        totalAmount: string,
        amountLeft: string,
        amountPaid: string,
        amountLeftToBePaid: string,
        id: string
    }) {
        const newAmount = Number(amountPaid) + Number(amountLeftToBePaid)
        const newAmountLeft = Number(amountLeft) - Number(amountLeftToBePaid)

        const UpdatePaidAmount = await Sales.findByIdAndUpdate(id, {
            amountPaid: newAmount,
            amountLeft: newAmountLeft,

        })

        if (UpdatePaidAmount) {
            return json({ message: "Debt paid successfully", success: true }, { status: 200 });
        }
    }
}
const debtPayment = new Debtpayment
export default debtPayment