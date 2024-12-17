import { Button, Input, Select, SelectItem, TableCell, TableRow, Textarea, User } from "@nextui-org/react"
import { ActionFunction, LoaderFunction } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import PlusIcon from "~/components/icons/PlusIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import ConfirmModal from "~/components/modal/confirmModal"
import EditModal from "~/components/modal/EditModal"
import { SalesColumns } from "~/components/table/columns"
import CustomTable from "~/components/table/table"
import { errorToast, successToast } from "~/components/toast"
import refundController from "~/controllers/refund"
import salesController from "~/controllers/sales"
import { ProductInterface, SalesInterface } from "~/interfaces/interface"
import AttendantLayout from "~/layout/attendantLayout"

const Sales = () => {
    const [rowsPerPage, setRowsPerPage] = useState(8)
    const { sales } = useLoaderData<{ sales: SalesInterface[] }>()
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSales, setFilteredSales] = useState(sales);
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [isConfirmModalOpened, setIsConfirmedModalOPened] = useState(false)
    const [dataValue, setDataValue] = useState<SalesInterface>()
    const [productDataValue, setProductDataValue] = useState<ProductInterface>()
    const actionData = useActionData<any>()
    const submit = useSubmit()

    const handleConfirmedModalClosed = () => {
        setIsConfirmedModalOPened(false)
    }
    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage)
    }
    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };
    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }
    
    //     const generateReceipt = () => {
    //         let receipt = `
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
    //                     <p>${productDetail.product?.name}</p>
    //                 </div>
    //             `).join('')}
    //         </div>
    //         <div>
    //             <p className="font-nunito font-semibold">Quantities</p>
    //             ${dataValue.products.map((productDetail: SalesInterface, idx: number) => `
    //                 <div key=${idx}>
    //                     <p>${productDetail.quantity}</p>
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

    //         return receipt
    //     }

    // useEffect(() => {
    //     const filtered = sales.filter(sale => {
    //         const lowerCaseQuery = searchQuery.toLowerCase();
    //         return (
    //             sale._id.toLowerCase().includes(lowerCaseQuery)
    //         );
    //     });
    //     setFilteredSales(filtered);
    // }, [searchQuery, sales]);
    // useEffect(() => {
    //     if (actionData) {
    //         if (actionData.success) {
    //             successToast(actionData.message)
    //         } else {
    //             errorToast(actionData.message)
    //         }
    //     }
    // }, [actionData])

    return (
        <AttendantLayout pageName="Sales Managemwent">
            <div className="flex z-0 justify-between gap-2">
                <Toaster position="top-center" />
                <div>
                    <Input
                        placeholder="Search product..."
                        startContent={<SearchIcon className="" />}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        classNames={{
                            inputWrapper: "h-14 lg:w-80",
                        }}
                    />
                </div>
                <div>
                    <Button variant="flat" onClick={() => {
                        // setIsCreateModalOpened(true)
                    }} color="primary" className="h-14 font-nunito text-md">
                        <PlusIcon className="h-6 w-6" />Create User
                    </Button>
                </div>
            </div>

            <CustomTable columns={SalesColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                {sales.map((sale: SalesInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="">
                            {sale._id}
                        </TableCell>
                        <TableCell className="">
                            {sale?.attendant?.firstName} {sale?.attendant?.middleName} {sale?.attendant?.lastName}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale?.totalAmount}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale?.amountPaid}
                        </TableCell>
                        <TableCell className="">
                            GHC {sale?.balance}
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
                                Refund
                            </Button>
                            {/* <Button
                                size="sm"
                                color="success"
                                variant="flat"
                                onClick={() => {
                                    const receipt = generateReceipt()
                                    const printWindow = window.open('', '_blank', 'width=800,height=600');
                                    printWindow?.document.write(receipt);
                                    printWindow?.document.close();
                                    printWindow?.print()
                                    setDataValue(sale)
                                }}
                            >
                                Print
                            </Button> */}
                        </TableCell>
                    </TableRow>
                ))}
            </CustomTable>



            {/* <EditModal modalTitle="Refund" className="dark:bg-slate-950 bg-gray-200 border border-white/5" onOpenChange={handleEditModalClosed} isOpen={isEditModalOpened}>
                {(onClose) => (
                    <div className="grid grid-cols-2 gap-4">
                        {
                            dataValue?.sales?.map((product: ProductInterface, index: number) => (
                                <div key={index}>
                                    <div className="dark:bg-slate-900 bg-white rounded-xl flex flex-col gap-2 border border-white/5 w-40 p-2">
                                        <img className="w-40 h-20 rounded-xl" src={product?.product?.image} alt="" />
                                       <div>
                                       <p className="font-nunito text-xs">{product?.product?.name}</p>
                                       <p className="font-nunito text-xs">{product?.price}</p>
                                       </div>
                                        <Button  size="sm" color="primary"  variant="flat" onClick={() => {
                                            setIsConfirmedModalOPened(true)
                                            setProductDataValue(product)
                                        }}>
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </EditModal> */}

            <ConfirmModal className="dark:slate-900" header="Confirm Remove" content="Are you sure to refund item? " isOpen={isConfirmModalOpened} onOpenChange={handleConfirmedModalClosed}>
                <div className="flex gap-4">
                    <Button color="primary" variant="flat" className="font-nunito text-md" onPress={handleConfirmedModalClosed}>
                        No
                    </Button>
                    <Button color="danger" variant="flat" className="font-nunito text-md" onClick={() => {
                        setIsConfirmedModalOPened(false);
                        if (productDataValue) {
                            submit({
                                intent: "refund",
                                id: productDataValue?._id
                                
                            }, {
                                method: "post"
                            });
                        }
                    }}>
                        Yes
                    </Button>
                </div>
            </ConfirmModal>
        </AttendantLayout>
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
    const id =  formData.get("reason") as string


    switch (intent) {
        case "refund":
            const makeRefund = await refundController.Refund({
               request,
               id
            })
            return makeRefund

        default:
            break;
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const { sales } = await salesController.getSales({ request });

    console.log(sales);
    return { sales }

}