import {
    Button,
    Input,
    TableCell,
    TableRow,
    User,
} from "@nextui-org/react";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import BackIcon from "~/components/icons/BackIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import { EditIcon } from "~/components/icons/EditIcon";
import { SearchIcon } from "~/components/icons/SearchIcon";
import NewCustomTable from "~/components/table/newTable";
import { ProductColumns } from "~/components/table/columns";
import restocking from "~/controllers/restocking";
import { ProductInterface } from "~/interfaces/interface";
import AdminLayout from "~/layout/adminLayout";
import { getSession } from "~/session";
import EditModal from "~/components/modal/EditModal";
import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/toast";
import usersController from "~/controllers/Users";

const Products = () => {
    const [isEditModalOpened, setIseDitModalOpened] = useState(false)
    const actionData = useActionData<any>()
    const [selectedValue, setSelectedValue] = useState<ProductInterface>()
    const handleEditModalClose = () => {
        setIseDitModalOpened(false)
    }
    const { products, totalPages, user } = useLoaderData<{
        products: ProductInterface[];
        totalPages: number;
        user: { _id: string }
    }>();
    const navigate = useNavigate();

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
        <AdminLayout pageName="Low Stock Products">
            <div className="flex mt-6 justify-between gap-2">
                <Toaster position="top-right" />
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        onClick={() => navigate(-1)}
                        color="primary"
                        className="font-nunito text-sm"
                    >
                        <BackIcon className="h-[20px] w-[20px]" />
                        <p>Back</p>
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => navigate("?low_stock=true&page=1")}
                        color="warning"
                    >
                        View Low Stock
                    </Button>
                </div>
                <div className="flex gap-4">
                    <Input
                        size="sm"
                        placeholder="Search product..."
                        startContent={<SearchIcon className="" />}
                        onValueChange={(value) => {
                            const timeoutId = setTimeout(() => {
                                navigate(`?search_term=${value}`);
                            }, 100);
                            return () => clearTimeout(timeoutId);
                        }}
                        classNames={{
                            inputWrapper: "bg-[#191919] border border-white/30 shadow-sm text-sm font-nunito",
                        }}
                    />
                </div>
            </div>

            <NewCustomTable
                columns={ProductColumns}
                loadingState="idle"
                totalPages={totalPages}
                page={1}
                setPage={(page) => navigate(`?page=${page}&low_stock=true`)}
            >
                {products.map((product: ProductInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell>
                            <User
                                avatarProps={{ radius: "sm", src: product.image }}
                                name={<p className="font-nunito text-xs">{product.name}</p>}
                            />
                        </TableCell>
                        <TableCell>{product?.category?.name}</TableCell>
                        <TableCell>{product.costPrice}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.totalProductAmount}</TableCell>
                        <TableCell>{product.totalProductAmountAfterSales}</TableCell>
                        <TableCell>{product.profitAfterSales}</TableCell>
                        <TableCell>
                            {product.quantity < 5 ? (
                                <>
                                    <p className="font-nunito text-danger">
                                        Low Stock
                                    </p>
                                </>) : "In Stock"}
                        </TableCell>
                        <TableCell className="flex gap-4">
                            <Button
                                size="sm"
                                color="success"
                                variant="flat"
                                onClick={() => {
                                    setIseDitModalOpened(true)
                                    setSelectedValue(product)
                                }}
                            >
                                <EditIcon /> Restock
                            </Button>

                        </TableCell>
                    </TableRow>
                ))}
            </NewCustomTable>


            <EditModal modalTitle="Edit Product detail" className="dark:bg-slate-950 bg-gray-200" onOpenChange={handleEditModalClose} isOpen={isEditModalOpened}>
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="Name"
                            name="name"
                            placeholder=" "
                            type="text"
                            readOnly
                            isRequired
                            defaultValue={selectedValue?.name}
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                            }}
                        />
                        <div className="flex gap-10 mt-4">

                            {/* <Input
                                label="Quantity"
                                name="quantity"
                                placeholder=" "
                                type="number"
                                isRequired
                                readOnly
                                className="mt-4"
                                defaultValue={selectedValue?.quantity}
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            /> */}
                            <Input
                                label="New Quantity"
                                name="newQuantity"
                                placeholder=" "
                                isClearable
                                isRequired
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                        </div>


                        <input name="intent" value="create" type="hidden" />
                        <input name="costPrice" value={selectedValue?.costPrice} type="hidden" />
                        <input name="price" value={selectedValue?.price} type="hidden" />
                        <input name="intent" value={selectedValue?.profitAfterSales} type="hidden" />
                        <input hidden name="userid" value={user._id} type="text" />
                        <input name="id" value={selectedValue?._id} type="hidden" />


                        <div className="flex justify-end gap-2 mt-10 font-nunito">
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <button className="bg-primary-400 rounded-xl text-white font-nunito px-4" >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </EditModal>
        </AdminLayout>
    );
};

export default Products;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get("name") as string;
    // const quantity = formData.get("quantity") as string;
    const newQuantity = formData.get("newQuantity") as string;
    const userid = formData.get("userid") as string;
    const product = formData.get("id") as string;
    const costPrice = formData.get("costPrice") as string;
    const price = formData.get("price") as string;
    const intent = formData.get("intent")

    switch (intent) {
        case "create":
            const restock = await restocking.Restock(name, newQuantity, userid, product, costPrice, price);
            return restock

        case "logout":
            const logout = await usersController.logout(intent)
            return logout
        default:
            return json({
                message: "Bad request",
                success: false,
                status: 500
            })
    }

}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") || "";
    const low_stock = url.searchParams.get("low_stock") === "true"; // Check for 'low_stock' query parameter

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) return redirect("/");

    const { products, user, totalPages } = await restocking.FetchProducts({
        request,
        page,
        search_term,
        limit: 10, // Adjust limit as needed
        low_stock, // Pass the low_stock flag
    });

    return json({ products, user, totalPages });
};
