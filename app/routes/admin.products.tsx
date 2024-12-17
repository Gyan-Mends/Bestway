import { Button, Input, Select, SelectItem, Skeleton, TableCell, TableRow, Textarea, User } from "@nextui-org/react"
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import BackIcon from "~/components/icons/BackIcon"
import { DeleteIcon } from "~/components/icons/DeleteIcon"
import { EditIcon } from "~/components/icons/EditIcon"
import PlusIcon from "~/components/icons/PlusIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import EditModal from "~/components/modal/EditModal"
import ConfirmModal from "~/components/modal/confirmModal"
import CreateModal from "~/components/modal/createModal"
import ViewModal from "~/components/modal/viewModal"
import { ProductColumns } from "~/components/table/columns"
import NewCustomTable from "~/components/table/newTable"
import CustomTable from "~/components/table/table"
import { errorToast, successToast } from "~/components/toast"
import usersController from "~/controllers/Users"
import category from "~/controllers/categoryController"
import productsController from "~/controllers/productsController"
import { CategoryInterface, ProductInterface } from "~/interfaces/interface"
import AdminLayout from "~/layout/adminLayout"
import { getSession } from "~/session"

const Products = () => {

    const [createModalOpened, setCreateModalOpened] = useState(false)
    const { categories, user, products, totalPages } = useLoaderData<{ categories: CategoryInterface[], user: { _id: string }, products: ProductInterface[], totalPages: number }>();
    const actionData = useActionData<any>()
    const [base64Image, setBase64Image] = useState<any>();
    const [viewModalOpened, setViewModalOpened] = useState(false);
    const [editModalOpened, setEditmOdalOpened] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<ProductInterface>()
    const [isConfirmedModalOpened, setIsConfirmedModalOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const submit = useSubmit()
    const navigate = useNavigate()
    const navigation = useNavigation()

    const handleCloseCreateModal = () => {
        setCreateModalOpened(false)
    }
    const handleViewModalClosed = () => {
        setViewModalOpened(false)
    }
    const handleEditModalClose = () => {
        setEditmOdalOpened(false)
    }
    const handleConfirmModalClosed = () => {
        setIsConfirmedModalOpened(false)
    }

    useEffect(() => {
        const timeOut= setTimeout(() =>{
            setIsLoading(true)
        },1000)
        return () => clearTimeout(timeOut)
    },[])

    useEffect(() => {
        if(actionData){
            if(actionData.success){
                successToast(actionData.message)
            }else{
                errorToast(actionData.message)
            }
        }
    }, [actionData])




    return (
        <AdminLayout pageName="Products">
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
                    {/* button to add new user */}
                    {/* button to add new user */}
                    <Button size="sm"
                        variant="flat"
                        onClick={() => {
                            setCreateModalOpened(true)
                        }}
                        className="font-nunito dark:bg-[#333]  text-sm px-8">
                        <PlusIcon className="" /> Add Product
                    </Button>
                </div>
            </div>

            <NewCustomTable
                columns={ProductColumns}
                loadingState={navigation.state === "loading" ? "loading" : "idle"}
                totalPages={totalPages}
                page={1}
                setPage={(page) => {
                    navigate(`?pages=${page}`)
                }}
            >
                {products.map((products: ProductInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell>
                            <User
                                avatarProps={{ radius: "sm", src: products.image }}
                                name={
                                    <p className="font-nunito text-xs">
                                        {products.name}
                                    </p>
                                }
                            />
                        </TableCell>
                        <TableCell>{products?.category?.name}</TableCell>
                        <TableCell>{products.costPrice}</TableCell>
                        <TableCell>{products.price}</TableCell>
                        <TableCell>{products.quantity}</TableCell>
                        <TableCell>{products.totalProductAmount}</TableCell>
                        <TableCell>{products.totalProductAmountAfterSales}</TableCell>
                        <TableCell>{products.profitAfterSales}</TableCell>
                        <TableCell>{products.low_stock}</TableCell>
                        <TableCell className="relative flex items-center gap-4">

                            <Button size="sm" color="success" variant="flat" onClick={() => {
                                setEditmOdalOpened(true)
                                setSelectedProducts(products)
                            }}>
                                <EditIcon /> Edit
                            </Button>
                            <Button size="sm" color="danger" variant="flat" onClick={() => {
                                setIsConfirmedModalOpened(true),
                                    setSelectedProducts(products)
                            }}>
                                <DeleteIcon />  Delete
                            </Button>

                        </TableCell>
                    </TableRow>
                ))}
            </NewCustomTable>

            <CreateModal className="dark:bg-slate-950 bg-gray-200" modalTitle="Add new product" isOpen={createModalOpened} onOpenChange={handleCloseCreateModal} >
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="Name"
                            name="name"
                            placeholder=" "
                            type="text"
                            isClearable
                            isRequired
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                            }}
                        />
                        <div className="flex gap-10 mt-4">

                            <Input
                                label="Cost Price(GHC)"
                                name="costPrice"
                                placeholder=" "
                                type="number"
                                isClearable
                                isRequired
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                            <Input
                                label="Selling Price(GHC)"
                                name="price"
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

                        <div className="">
                            <Select
                                label="Category"
                                labelPlacement="outside"
                                placeholder=" "
                                isRequired
                                className="mt-4"
                                name="category"
                                classNames={{
                                    trigger: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] mt-4",
                                    popoverContent: "bg-white shadow-sm dark:bg-[#191919] border border-white/5 focus:bg-slate-900 "
                                }}

                            >
                                {categories.map((cat: CategoryInterface) => (
                                    <SelectItem textValue={cat.name} className="mt-4" key={cat._id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}

                            </Select>
                        </div>

                        <div className="flex gap-10 mt-4">
                            <Input
                                label="Quantity"
                                name="quantity"
                                placeholder=" "
                                type="number"
                                isClearable
                                isRequired
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                            <Input
                                label="Low Stock"
                                name="lowstock"
                                placeholder=" "
                                isClearable
                                isRequired
                                type="number"
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                        </div>

                        <div className="pt-2">
                            <label className="font-nunito text-sm block" htmlFor="">Image</label>
                            <input
                                name="image"
                                required
                                placeholder=" "
                                className="bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333]  w-full h-10 rounded-lg"
                                type="file"
                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                        </div>

                        <Textarea
                            autoFocus
                            label="Product description"
                            labelPlacement="outside"
                            placeholder=" "
                            isRequired
                            name="description"
                            className="mt-4 font-nunito text-sm"
                            classNames={{
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                            }}
                        />
                        <input name="intent" value="create" type="hidden" />
                        <input hidden name="userid" value={user._id} />
                        <input hidden name="userid" value={user._id} />
                        <input hidden name="base64Image" value={base64Image} />


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
            </CreateModal>

            <ViewModal modalTitle="Product Details" className="" isOpen={viewModalOpened} onOpenChange={handleViewModalClosed}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <img className="h-60 rounded-lg" src={selectedProducts?.image} alt="" />
                    </div>
                    <div>
                        <p className="font-nunito">{selectedProducts?.name}</p>
                        <p className="font-nunito mt-2">{selectedProducts?.category.name}</p>
                        <p className="font-nunito mt-2">GHC{selectedProducts?.price}</p>
                        <p className="font-nunito mt-2">{selectedProducts?.quantity} {selectedProducts?.name}</p>
                        <p className="font-nunito mt-2">{selectedProducts?.description} </p>
                    </div>
                </div>
            </ViewModal>

            <EditModal modalTitle="Edit Product detail" className="dark:bg-slate-950 bg-gray-200" onOpenChange={handleEditModalClose} isOpen={editModalOpened}>
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="Name"
                            name="name"
                            placeholder=" "
                            type="text"
                            isClearable
                            isRequired
                            defaultValue={selectedProducts?.name}
                            labelPlacement="outside"
                            classNames={{
                                label: "font-nunito text-sm text-default-100",
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                            }}
                        />
                        <div className="flex gap-10 mt-4">

                            <Input
                                label="Cost Price(GHC)"
                                name="costPrice"
                                placeholder=" "
                                type="number"
                                isClearable
                                isRequired
                                className="mt-4"
                                defaultValue={selectedProducts?.costPrice}
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                            <Input
                                label="Selling Price(GHC)"
                                name="price"
                                placeholder=" "
                                isClearable
                                defaultValue={selectedProducts?.price}
                                isRequired
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                        </div>

                        <div className="pt-4">
                            <Select
                                label="Category"
                                labelPlacement="outside"
                                placeholder=" "
                                isRequired
                                className="mt-4"
                                name="category"
                                classNames={{
                                    trigger: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] ",
                                    popoverContent: "bg-white shadow-sm dark:bg-[#191919] border border-white/5 focus:bg-[#333] "
                                }}

                            >
                                {categories.map((cat: CategoryInterface) => (
                                    <SelectItem textValue={selectedProducts?.category?.name} className="mt-4" key={cat._id}>
                                        {selectedProducts?.category?.name}
                                    </SelectItem>
                                ))}

                            </Select>
                        </div>

                        <div className="flex gap-10 mt-4">
                            {/* image */}
                            <Input
                                label="Quantity"
                                name="quantity"
                                placeholder=" "
                                type="number"
                                isClearable
                                isRequired
                                className="mt-4"
                                defaultValue={selectedProducts?.quantity}
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                            <Input
                                label="Low Stock"
                                name="lowstock"
                                placeholder=" "
                                isClearable
                                defaultValue={selectedProducts?.low_stock}
                                isRequired
                                type="number"
                                className="mt-4"
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito text-sm text-default-100",
                                    inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                                }}
                            />
                        </div>

                        <div className="pt-2 mt-4">
                            <label className="font-nunito " htmlFor="">Image</label>
                            <input
                                name="image"
                                required
                                placeholder=" "
                                className="bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] w-full h-12 rounded-lg"
                                type="file"

                                onChange={(event: any) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            setBase64Image(reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                        </div>

                        <Textarea
                            autoFocus
                            label="Product description"
                            labelPlacement="outside"
                            placeholder=" "
                            isRequired
                            name="description"
                            className="mt-4 font-nunito text-sm"
                            defaultValue={selectedProducts?.description}
                            classNames={{
                                inputWrapper: "bg-white shadow-sm dark:bg-[#333] border border-white/30 focus:bg-[#333] "
                            }}
                        />
                        <input name="intent" value="updateProduct" type="hidden" />
                        <input hidden name="userid" value={user._id} type="text" />
                        <input hidden name="base64Image" value={base64Image} />
                        <input name="id" value={selectedProducts?._id} type="hidden" />


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

            <ConfirmModal className="bg-gray-200 dark:bg-slate-950 border border-white/5" content="Are you sure to delete product" header="Comfirm Delete" isOpen={isConfirmedModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button size="sm" color="danger" className="font-nunito " onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button size="sm" color="primary" className="font-nunito" onClick={() => {
                        if (selectedProducts) {
                            submit({
                                intent: "delete",
                                id: selectedProducts?._id

                            }, {
                                method: "post"
                            })
                        }
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>
        </AdminLayout>
    )
}

export default Products
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const costPrice = formData.get("costPrice") as string;
    const quantity = formData.get("quantity") as string;
    const category = formData.get("category") as string;
    const base64Image = formData.get("base64Image") as string;
    const low_stock = formData.get("lowstock") as string;
    const description = formData.get("description") as string;
    const seller = formData.get("userid") as string;
    const id = formData.get("id") as string;
    const intent = formData.get("intent")




    switch (intent) {
        case "create":
            const products = await productsController.ProductAdd(request, name, price, quantity, category, base64Image, low_stock, description, seller, costPrice, intent);
            return products
        case "updateProduct":
            const upadate = await productsController.UpdateProduct({
                name,
                price,
                quantity,
                category,
                base64Image,
                low_stock,
                description,
                seller,
                costPrice,
                intent,
                id,
            })
            return upadate
        case "delete":
            const deleteProduct = await productsController.Delete({ intent, id })
            return deleteProduct
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
    const search_term = url.searchParams.get("search_term") as string

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/")
    };

    const { user, products, totalPages, total, totalAfterSales, totalProfitAfterSales } = await productsController.FetchProducts({ request, page, search_term });
    const {categories} = await category.getCategories({
        page,
        request,
        search_term
    })

    console.log(total);

    console.log(totalAfterSales);
    console.log(totalProfitAfterSales);



    return json({ user, products, totalPages, categories })

}

