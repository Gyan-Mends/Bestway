import { Button, Input, Select, SelectItem, TableCell, TableRow, Textarea, User } from "@nextui-org/react"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import BackIcon from "~/components/icons/BackIcon"
import PlusIcon from "~/components/icons/PlusIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import EditModal from "~/components/modal/EditModal"
import { SalesColumns } from "~/components/table/columns"
import CustomTable from "~/components/table/table"
import { errorToast, successToast } from "~/components/toast"
import adminDashboardController from "~/controllers/AdminDashBoardController"
import productsController from "~/controllers/productsController"
import refundController from "~/controllers/refund"
import salesController from "~/controllers/sales"
import { RegistrationInterface, SalesInterface } from "~/interfaces/interface"
import AdminLayout from "~/layout/adminLayout"
import AttendantLayout from "~/layout/attendantLayout"
import { getSession } from "~/session"

const Sales = () => {
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const { sales, user } = useLoaderData<{ sales: SalesInterface[], user: RegistrationInterface[] }>()
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<SalesInterface>()
    const actionData = useActionData<any>()
    const navigate = useNavigate()


    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage)
    }
    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };
    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }
    //    const generateReceipt = () => {
    //    let receipt = `
    //     <div className="flex justify-between">
    //         <div className="text-default-500 font-nunito text-sm">
    //             <p>Receipt No</p>
    //             <p>${dataValue?._id}</p>
    //         </div>
    //         <div className="font-nunito text-default-500 text-sm">
    //             <p>Attendant</p>
    //             <p>${dataValue?.attendant.firstName} ${dataValue?.attendant.middleName} ${dataValue?.attendant.lastName}</p>
    //         </div>
    //     </div>

    //     <p className="mt-6 font-nunito text-md font-semibold">Product Details</p>
    //     <div className="flex justify-between mt-2 text-md text-default-500">
    //         <div>
    //             <p className="font-nunito font-semibold">Products</p>
    //             ${dataValue.products.map((productDetail: SalesInterface, idx: number) => `
    //                 <div key=${idx}>
    //                     <p>${productDetail?.product?.name}</p>
    //                 </div>
    //             `).join('')}
    //         </div>
    //         <div>
    //             <p className="font-nunito font-semibold">Quantities</p>
    //             ${dataValue.products.map((productDetail: SalesInterface, idx: number) => `
    //                 <div key=${idx}>
    //                     <p>${productDetail?.quantity}</p>
    //                 </div>
    //             `).join('')}
    //         </div>
    //     </div>

    //     <p className="mt-10 font-nunito text-md font-semibold">Payment Details</p>
    //     <div className="flex justify-between mt-2">
    //         <div className="text-default-500 text-md">
    //             <p className="font-nunito font-semibold">Total Amount</p>
    //             <p className="font-nunito text-sm">GHC ${dataValue?.totalAmount}</p>
    //         </div>
    //         <div className="text-default-500 text-md">
    //             <p className="font-nunito font-semibold">Amount Paid</p>
    //             <p className="font-nunito text-sm">GHC ${dataValue?.amountPaid}</p>
    //         </div>
    //         <div className="text-default-500 text-md">
    //             <p className="font-nunito font-semibold">Balance</p>
    //             <p className="font-nunito text-sm">GHC ${dataValue?.balance}</p>
    //         </div>
    //     </div>
    // `;

    //     return receipt
    //    }

    
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message)
            } else {
                errorToast(actionData.message)
            }
        }
    }, [actionData])

    return (
        <AdminLayout pageName="Sales Managemwent">
            <div className="flex z-0 mt-6 justify-between gap-2 overflow-y-hidden">
                <Toaster position="top-right" />
                <div className="flex items-center justify-center gap-2">
                    {/* back */}
                    {/* back */}
                    <Button size="sm" onClick={() => {
                        navigate(-1)
                    }} color="primary" className="font-nunito text-sm  border-b-white dark:border-primary  dark:text-white dark:bg-[#333]">
                        <BackIcon className="h-[20px] w-[20px] dark:text-success" /><p >Back</p>
                    </Button>
                </div>
                <div className="flex gap-4">
                    {/* search */}
                    {/* search */}
                    <Input
                        size="sm"
                        placeholder="Search user..."
                        startContent={<SearchIcon className="" />}
                        onValueChange={(value) => {
                            const timeoutId = setTimeout(() => {
                                navigate(`?search_term=${value}`);
                            }, 100);
                            return () => clearTimeout(timeoutId);
                        }} classNames={{
                            inputWrapper: "bg-white shadow-sm text-sm font-nunito dark:bg-[#333] border border-white/5 ",
                        }}
                    />

                </div>
            </div>

            <CustomTable columns={SalesColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                {sales.map((sale: SalesInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="">
                            {sale._id}
                        </TableCell>

                        <TableCell className="">
                            {sale.attendant?.firstName} {sale?.attendant?.middleName} {sale.attendant?.lastName}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale.totalAmount}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale.amountPaid}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale.amountLeft}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale.balance}
                        </TableCell>

                        <TableCell className="relative flex items-center gap-4">
                            <Button
                                size="sm"
                                color="success"
                                variant="flat"
                                onClick={() => {
                                    setIsEditModalOpened(true);
                                    setDataValue(sale);
                                }}
                            >
                                View
                            </Button>

                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>



            <EditModal modalTitle="Refund" className="" onOpenChange={handleEditModalClosed} isOpen={isEditModalOpened}>
                {(onClose) => (
                    <Form method="post" action="/sales">
                        <div className="flex justify-between">
                            <div className="text-default-500 font-nunito text-sm">
                                <p>Receipt No</p>
                                <p>{dataValue?._id}</p>
                            </div>
                            <div className="font-nunito text-default-500 text-sm">
                                <p>Attendant</p>
                                <p>{dataValue?.attendant.firstName} {dataValue?.attendant?.middleName} {dataValue?.attendant?.lastName}</p>
                            </div>
                        </div>

                        <p className="mt-6 font-nunito text-md font-semibold">Product Details</p>
                        <div className="flex justify-between mt-2 text-md text-default-500">
                            <div>
                                <p className="font-nunito font-semibold">Products</p>
                                {dataValue.products.map((productDetail: SalesInterface, idx: number) => (
                                    <div key={idx}>
                                        <p>{productDetail.product.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="font-nunito font-semibold">Quantities</p>
                                {dataValue.products.map((productDetail: SalesInterface, idx: number) => (
                                    <div key={idx}>
                                        <p>{productDetail?.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-10 font-nunito text-md font-semibold">Payment Details</p>
                        <div className="flex justify-between mt-2">
                            <div className="text-default-500 text-md">
                                <p className="font-nunito font-semibold">Total Amount</p>
                                <p className="font-nunito text-sm">GHC {dataValue?.totalAmount}</p>
                            </div>
                            <div className="text-default-500 text-md">
                                <p className="font-nunito font-semibold">Amount Paid</p>
                                <p className="font-nunito text-sm">GHC {dataValue?.amountPaid}</p>
                            </div>
                            <div className="text-default-500 text-md">
                                <p className="font-nunito font-semibold">Balance</p>
                                <p className="font-nunito text-sm">GHC {dataValue?.balance}</p>
                            </div>
                        </div>


                    </Form>
                )}
            </EditModal>
        </AdminLayout>
    )
}

export default Sales

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const balance = formData.get("balance") as string
    const amountPaid = formData.get("amountPaid") as string
    const totalAmount = formData.get("totalAmount") as string
    const attendant = formData.get("attendant") as string
    const intent = formData.get("intent") as string
    const product = formData.get("product") as string
    const quantity = formData.get("quantity") as string
    const reason = formData.get("reason") as string
    console.log(quantity);


    // switch (intent) {
    //     // case "refund":
    //     //     const makeRefund = await refundController.ApplyRefund({
    //     //         intent,
    //     //         request,
    //     //         attendant,
    //     //         totalAmount,
    //     //         amountPaid,
    //     //         balance,
    //     //         quantity,
    //     //         product,
    //     //     })
    //         return makeRefund

    //     default:
    //         break;
    // }
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
     const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if(!token){
        return redirect("/")
    }
    // Fetch product data (assuming productsController.FetchProducts works this way)
    const { user } = await productsController.FetchProducts({
        request,
        page,
    });
    const {

        sales,
        // Add the olderTotal
    } = await adminDashboardController.getSales({
        request,
        page,
        search_term,
        limit: 10,
    });

    return json({ sales, user })
}