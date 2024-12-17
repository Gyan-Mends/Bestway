import { Button, Input, Select, SelectItem, Skeleton, TableCell, TableRow, User } from "@nextui-org/react"
import { ActionFunction, json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Form, useActionData, useLoaderData, useNavigate, useNavigation, useSubmit } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import BackIcon from "~/components/icons/BackIcon"
import { DeleteIcon } from "~/components/icons/DeleteIcon"
import { EditIcon } from "~/components/icons/EditIcon"
import PlusIcon from "~/components/icons/PlusIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import ConfirmModal from "~/components/modal/confirmModal"
import CreateModal from "~/components/modal/createModal"
import EditModal from "~/components/modal/EditModal"
import { SuppliersColumns, UserColumns } from "~/components/table/columns"
import NewCustomTable from "~/components/table/newTable"
import CustomTable from "~/components/table/table"
import { errorToast, successToast } from "~/components/toast"
import CustomInput from "~/components/ui/CustomInput"
import suppliersController from "~/controllers/Suppliers"
import usersController from "~/controllers/Users"
import { RegistrationInterface, SuppliersInterface } from "~/interfaces/interface"
import AdminLayout from "~/layout/adminLayout"
import { getSession } from "~/session"

const Suppliers = () => {
    const [isCreateModalOpened, setIsCreateModalOpened] = useState(false)
    const [base64Image, setBase64Image] = useState()
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false)
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<SuppliersInterface>()
    const [isLoading, setIsLoading] = useState(false)
    const submit = useSubmit()
    const actionData = useActionData<any>()
    const { user, suppliers, totalPages } = useLoaderData<{ user: { _id: string }, suppliers: SuppliersInterface[], totalPages: number }>()
    const navigate = useNavigate()
    const navigation = useNavigation()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsLoading(true)
        },1000)
        return () => clearTimeout(timeOut)
    }, [])

    const handleCreateModalClosed = () => {
        setIsCreateModalOpened(false)
    }
    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false)
    }
    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }


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
        <AdminLayout pageName="Supliers Management">
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
                            setIsCreateModalOpened(true)
                        }}
                        className="font-nunito dark:bg-[#333]  text-sm px-8">
                        <PlusIcon className="" /> Create Supplier
                    </Button>
                </div>
            </div>


            <NewCustomTable
                columns={SuppliersColumns}
                loadingState={navigation.state === "loading" ? "loading" : "idle"}
                totalPages={totalPages}
                page={1}
                setPage={(page) => {
                    navigate(`?pages= ${page}`)
                }}
            >
                {suppliers.map((supplier: SuppliersInterface, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="text-xs">
                            <User
                                avatarProps={{ radius: "sm", src: supplier.firstName }}
                                name={
                                    <p className="font-nunito text-xs">
                                        {supplier.firstName + ' ' + supplier.middleName + ' ' + supplier.lastName}
                                    </p>
                                }
                            />
                        </TableCell>
                        <TableCell className="">{supplier.email}</TableCell>
                        <TableCell>{supplier.phone}</TableCell>
                        <TableCell className="relative flex items-center gap-4">
                            <Button size="sm" color="success" variant="flat" onClick={() => {
                                setIsEditModalOpened(true)
                                setDataValue(supplier)
                            }}>
                                <EditIcon />Edit
                            </Button>
                            <Button size="sm" color="danger" variant="flat" onClick={() => {
                                setIsConfirmModalOpened(true)
                                setDataValue(supplier)
                            }}>
                                <DeleteIcon /> Delete
                            </Button>

                        </TableCell>
                    </TableRow>
                ))}
            </NewCustomTable>

            <ConfirmModal content="Are you sure to delete supplier?" header="Cnfirm Delete" className="border border-white/5" isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button size="sm" color="primary" variant="flat" className="font-montserrat font-semibold" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button size="sm" color="danger" variant="flat" className="font-montserrat font-semibold" onClick={() => {
                        setIsConfirmModalOpened(false)
                        if (dataValue) {
                            submit({
                                intent: "delete",
                                id: dataValue?._id
                            }, {
                                method: "post"
                            })
                        }
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

            {/* Create Modal */}
            <EditModal
                className="border border-white/5 bg-gray-200"
                modalTitle="Update user details"
                isOpen={isEditModalOpened}
                onOpenChange={handleEditModalClosed}
            >
                {(onClose) => (
                    <Form method="post">
                        <Input
                            label="First name"
                            isRequired
                            isClearable
                            name="firstname"
                            placeholder=" "
                            defaultValue={dataValue?.firstName}
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                inputWrapper: "bg-white shadow-sm text-xs font-nunito dark:bg-[#333] border border border-white/30 mt-4",
                            }}
                        />
                        <div className="flex gap-4">
                            <Input
                                label="Middle Name"
                                name="middlename"
                                placeholder=" "
                                isClearable
                                defaultValue={dataValue?.middleName}
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    inputWrapper: "bg-white shadow-sm text-xs font-nunito dark:bg-[#333] border border border-white/30 mt-4",
                                }}
                            />
                            <Input
                                label="Last Name"
                                isRequired
                                name="lastname"
                                defaultValue={dataValue?.lastName}
                                isClearable
                                placeholder=" "
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    inputWrapper: "bg-white shadow-sm text-xs font-nunito dark:bg-[#333] border border border-white/30 mt-4",
                                }}
                            />
                        </div>
                        <Input
                            label="Email"
                            isRequired
                            name="email"
                            defaultValue={dataValue?.email}
                            isClearable
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                            classNames={{
                                inputWrapper: "bg-white shadow-sm text-xs font-nunito dark:bg-[#333] border border border-white/30 mt-4",
                            }}
                        />
                        <div className="flex gap-4">
                            <Input
                                label=" Phone"
                                isRequired
                                name="phone"
                                defaultValue={dataValue?.phone}
                                isClearable
                                placeholder=" "
                                type="text"
                                labelPlacement="outside"
                                classNames={{
                                    inputWrapper: "bg-white shadow-sm text-xs font-nunito dark:bg-[#333] border border border-white/30 mt-4",
                                }}
                            />

                        </div>


                        <input name="admin" value={user._id} type="hidden" />
                        <input name="intent" value="update" type="hidden" />
                        <input name="id" value={dataValue?._id} type="hidden" />

                        <div className="flex justify-end gap-2 mt-10 font-nunito">
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <button type="submit" className="bg-primary-400 rounded-xl bg-opacity-20 text-primary text-sm font-nunito px-4">
                                Update
                            </button>
                        </div>
                    </Form>
                )}
            </EditModal>

            {/* Create Modal */}
            <CreateModal
                className="bg-gray-200 dark:bg-[#333]"
                modalTitle="Create New User"
                isOpen={isCreateModalOpened}
                onOpenChange={handleCreateModalClosed}
            >
                {(onClose) => (
                    <Form method="post" className="flex flex-col gap-4">
                        <CustomInput
                            label="First name"
                            isRequired
                            isClearable
                            name="firstname"
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                        />
                        <div className="flex gap-4">
                            <CustomInput
                                label="Middle Name"
                                name="middlename"
                                placeholder=" "
                                isClearable
                                type="text"
                                labelPlacement="outside"
                            />
                            <CustomInput
                                label="Last Name"
                                isRequired
                                name="lastname"
                                isClearable
                                placeholder=" "
                                type="text"
                                labelPlacement="outside"
                                
                            />
                        </div>
                        <CustomInput
                            label="Email"
                            isRequired
                            name="email"
                            isClearable
                            placeholder=" "
                            type="text"
                            labelPlacement="outside"
                        />
                     
                            <CustomInput
                                label=" Phone"
                                isRequired
                                name="phone"
                                isClearable
                                placeholder=" "
                                type="text"
                                labelPlacement="outside"
                            />



                        <input name="admin" value={user._id} type="hidden" />
                        <input name="intent" value="create" type="hidden" />

                        <div className="flex justify-end gap-2 mt-10 font-nunito">
                            <Button size="sm" color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="success" size="sm" type="submit" className="rounded-xl bg-opacity-20 text-success text-sm font-nunito px-4">
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </CreateModal>
        </AdminLayout>
    )
}

export default Suppliers

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;
    const middleName = formData.get("middlename") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const admin = formData.get("admin") as string;
    const intent = formData.get("intent") as string;
    const id = formData.get("id") as string;

    switch (intent) {
        case "create":
            const supplier = await suppliersController.CreateSupplier({
                firstName,
                middleName,
                lastName,
                email,
                admin,
                phone,
                intent,
            })
            return supplier

        case "delete":
            const deleteSuppler = await suppliersController.DeleteSupplier({
                intent,
                id
            })
            return deleteSuppler

        case "update":
            const updateSupplier = await suppliersController.UpdateSupplier({
                firstName,
                middleName,
                lastName,
                email,
                admin,
                phone,
                id,
                intent,
            })
            return updateSupplier
        case "logout":
            const logout = await usersController.logout(intent)
            return logout
        default:
            return json({
                message: "Bad request",
                success: false,
                status: 400
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
    }

    const { user, suppliers, totalPages, supplierCount } = await suppliersController.FetchSuppliers({ request, page, search_term });

    return { user, suppliers, totalPages, supplierCount }

}

export const meta: MetaFunction = () => {
    return [
        { title: "Sales | Point of Sale" },
        {
            name: "description",
            content: ".",
        },
        {
            name: "author",
            content: "MendsGyan",
        },
        { name: "og:title", content: "Point of Sale" },
        {
            name: "og:description",
            content: "",
        },
        {
            name: "og:image",
            content:
                "https://res.cloudinary.com/app-deity/image/upload/v1701282976/qfdbysyu0wqeugtcq9wq.jpg",
        },
        { name: "og:url", content: "https://marry-right.vercel.app" },
        {
            name: "keywords",
            content:
                "point of sales in Ghana, online shops, sales, e-commerce",
        },
    ];
};