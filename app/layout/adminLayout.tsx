// import { Button, Skeleton, User } from "@nextui-org/react";
// import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
// import { Link, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
// import { useTheme } from "next-themes";
// import { ReactNode, useEffect, useState } from "react";
// import CloseIcon from "~/components/icons/CloseIcon";
// import DashboardIcon from "~/components/icons/DashboardIcon";
// import LogoutIcon from "~/components/icons/LogoutIcon";
// import MoonIcon from "~/components/icons/MoonIcon";
// import NavTogglerIcon from "~/components/icons/NavTogglerIcon";
// import NotificationIcon from "~/components/icons/NotificationIcon";
// import ProductIcon from "~/components/icons/ProductsIcon";
// import RefreshIcon from "~/components/icons/RefreshIcon";
// import SettingsIcon from "~/components/icons/SettingsIcon";
// import SunIcon from "~/components/icons/SunIcon";
// import SupplierIcon from "~/components/icons/SupplierIcon";
// import UsersGroup from "~/components/icons/UsersGroup";
// import logo from "~/components/illustration/logo.png"
// import ConfirmModal from "~/components/modal/confirmModal";
// import usersController from "~/controllers/Users";

// interface UserLayoutProps {
//     children: ReactNode;
//     pageName: string;
// }

// const AdminLayout = ({ children, pageName }: UserLayoutProps) => {
//     const { theme, setTheme } = useTheme();
//     const [desktopNav, setDesktopNav] = useState(true);
//     const [mobileNavOpen, setMobileNavOpen] = useState(false); // Hide mobile nav by default
//     const [isLogoutConfirmModalOpened, setIsLogoutConfirmModalOpened] = useState(false)
//     const submit = useSubmit()
//     const [isLoading, setIsLoading] = useState(false)

//     const { user } = useLoaderData<{ user: { user: string } }>()
//     useEffect(() => {
//         const timeOut = setTimeout(() => {
//             setIsLoading(true)
//         }, 1000)

//         return () => clearTimeout(timeOut)
//     }, [])


//     const desktopNavToggle = () => {
//         setDesktopNav(!desktopNav);
//     };
//     const mobileNavToggle = () => {
//         setMobileNavOpen(!mobileNavOpen);
//     };
//     const handleConfirmModalClosed = () => {
//         setIsLogoutConfirmModalOpened(false);
//     };

//     return (
//         <div className={`h-screen overflow-hidden transition-all duration-300 ease-in-out ${theme === "light" ? "bg-slate-100" : "bg-slate-950"}`}>
//             {/* Desktop Side Navigation Bar */}
//             <div className={`h-full hidden lg:block md:block w-64 dark:bg-primary shadow-sm dark:text-white fixed transition-transform duration-500 p-6 ${desktopNav ? "transform-none" : "-translate-x-full"}`}>
//                 {/* logo */}
//                 <div className="flex items-center gap-2">
//                     <Skeleton isLoaded={isLoading} className="rounded-full">
//                         <div>
//                             <img className="bg-black rounded-full h-10 w-10 " src={logo} alt="logo" />
//                         </div>
//                     </Skeleton>
//                     <Skeleton isLoaded={isLoading} className="rounded-lg">
//                         <div className="font-montserrat text-lg">Ponit of sales</div>
//                     </Skeleton>
//                 </div>
//                 {/* profile */}
//                 <div className=" mt-10">
//                     <Skeleton isLoaded={isLoading} className="rounded-lg w-2/5">
//                         <p className="font-nunito text-md">Dashboard</p>
//                     </Skeleton>
//                 </div>
//                 {/* Side Nav Content */}
//                 <ul className="mt-6 pl-2 flex flex-col gap-2">
//                     <Link className="" to="/admin">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg">
//                             <li className="text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <DashboardIcon className="text-primary" />
//                                 </span>
//                                 Dashboard
//                             </li>
//                         </Skeleton>

//                     </Link>
//                     <Link className="" to="/admin/users">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-200 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <UsersGroup className="text-primary text-lg" />
//                                 </span>
//                                 Users
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/api">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-200 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <UsersGroup className="text-primary text-lg" />
//                                 </span>
//                                 api
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/suppliers">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <SupplierIcon className="text-success text-lg" />
//                                 </span>
//                                 Suppliers
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/products">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <ProductIcon className="text-primary text-lg" />
//                                 </span>
//                                 Products
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/category">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <DashboardIcon className="text-primary text-lg" />
//                                 </span>
//                                 Categories
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/sales">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <DashboardIcon className="text-primary text-lg" />
//                                 </span>
//                                 Sales
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/sales">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-[#F1F5F6] shadow-sm rounded-xl flex items-center justify-center">
//                                     <DashboardIcon className="text-primary text-lg" />
//                                 </span>
//                                 Report
//                             </li>
//                         </Skeleton>
//                     </Link>
//                     <Link className="" to="/admin/sales">
//                         <Skeleton isLoaded={isLoading} className="rounded-lg ">
//                             <li className="hover:bg-primary-400 text-sm hover:bg-primary hover:text-primary hover:border-r-4 hover:border-r-white hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-2xl flex items-center gap-2 transition-all duration-300 ease-in-out">
//                                 <span className="w-10 h-10 bg-gray-50 shadow-sm rounded-xl flex items-center justify-center">
//                                     <SettingsIcon className="text-primary text-lg" />
//                                 </span>
//                                 Settings
//                             </li>
//                         </Skeleton>
//                     </Link>


//                 </ul>
//             </div>


//             {/* Page Content */}
//             <div className={`p-4 transition-all duration-500 overflow-x-hidden z-1 ${desktopNav ? "lg:ml-64 md:ml-64" : ""}`}>
//                 {/* Top Nav */}
//                 <div className=" flex items-center justify-between">
//                     {/* Overview */}
//                     <div className="flex items-center gap-2 lg:gap-4 px-2">
//                         <User
//                             name={
//                                 <Skeleton isLoaded={isLoading} className="rounded-lg">
//                                     <p className="font-nunito text-lg">
//                                         John Doe
//                                     </p>
//                                 </Skeleton>
//                             }
//                             description={
//                                 <Skeleton isLoaded={isLoading} className="rounded-lg mt-1">
//                                     <p className="font-nunito text-sm">
//                                         John Doe
//                                     </p>
//                                 </Skeleton>
//                             }
//                             avatarProps={{
//                                 src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
//                             }}

//                         />
//                     </div>

//                     {/* Mode Switch and Logout */}
//                     <div className="flex gap-2">
//                         <Skeleton isLoaded={isLoading} className="rounded-xl">
//                         <button onClick={() => {
//                             window.location.reload()
//                         }}
//                             className="border border-primary text-primary h-10 w-10 px-2 rounded-xl font-nunito flex items-center justify-center">
//                             <RefreshIcon className="h-[20px] w-[20px]" />
//                         </button>
//                         </Skeleton>
//                         <div className=" ">
//                             <Skeleton isLoaded={isLoading} className="rounded-xl">
//                                 <Button
//                                     className="border-b-2 border-b-white hover:"
//                                     color="primary"
//                                     onClick={() => {
//                                         setIsLogoutConfirmModalOpened(true)
//                                     }}>
//                                     <LogoutIcon className=" h-[20px] w-[20px]" /> Logout
//                                 </Button>
//                             </Skeleton>
//                         </div>
//                         <div className=" ">
//                             <Skeleton isLoaded={isLoading} className="rounded-xl">
//                                 <Button
//                                     className="border-b-2 border-b-white hover:"
//                                     color="primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//                                     {theme === "light" ? (
//                                         <>
//                                             <SunIcon className="h-[20px] w-[20px] dark:text-white" />
//                                             <p>Light Mode</p>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <MoonIcon className="h-[20px] w-[20px] dark:text-white" />
//                                             <p>Dark Mode</p>
//                                         </>
//                                     )}
//                                 </Button>
//                             </Skeleton>
//                         </div>
//                     </div>

//                 </div>

//                 {/* Main Content */}
//                 <div className="mt-4">
//                     {children}
//                 </div>
//             </div>

//             <ConfirmModal className="dark:bg-slate-950 border border-white/5" header="Confirm Logout" content="Are you sure to logout?" isOpen={isLogoutConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
//                 <div className="flex gap-4">
//                     <Button color="primary" variant="flat" className="font-montserrat font-semibold" size="sm" onPress={handleConfirmModalClosed}>
//                         No
//                     </Button>
//                     <Button color="danger" variant="flat" className="font-montserrat font-semibold " size="sm" onClick={() => {
//                         setIsLogoutConfirmModalOpened(false)
//                         submit({
//                             intent: "logout",
//                         }, {
//                             method: "post"
//                         })
//                     }} >
//                         Yes
//                     </Button>
//                 </div>
//             </ConfirmModal>
//         </div>
//     );
// };

// export default AdminLayout;

// export const action: ActionFunction = async ({ request }) => {
//     const formData = await request.formData();
//     const intent = formData.get("intent") as string;

//     switch (intent) {
//         case "logout":
//             const logout = await usersController.logout(intent)
//             return logout

//         default:
//             return json({
//                 message: "Bad request",
//                 success: false,
//                 status: 500
//             })
//     }
// }

// export const loader: LoaderFunction = async () => {
//     const { user } = await usersController.FetchUsers()

//     return { user }
// }


import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, User } from "@nextui-org/react";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { useTheme } from "next-themes";
// import useTheme from "next-theme/dist/useTheme";
import { ReactNode, useEffect, useState } from "react";
import CloseIcon from "~/components/icons/CloseIcon";
import DashboardIcon from "~/components/icons/DashboardIcon";
import LogoutIcon from "~/components/icons/LogoutIcon";
import MoonIcon from "~/components/icons/MoonIcon";
import NotificationIcon from "~/components/icons/NotificationIcon";
import ProductIcon from "~/components/icons/ProductsIcon";
import RefreshIcon from "~/components/icons/RefreshIcon";
import { SearchIcon } from "~/components/icons/SearchIcon";
import SettingsIcon from "~/components/icons/SettingsIcon";
import SunIcon from "~/components/icons/SunIcon";
import SupplierIcon from "~/components/icons/SupplierIcon";
import UsersGroup from "~/components/icons/UsersGroup";
import logo from "~/components/illustration/logo.png"
import cat from "~/components/illustration/categorization.png"
import ConfirmModal from "~/components/modal/confirmModal";
import adminDashboardController from "~/controllers/AdminDashBoardController";
import productsController from "~/controllers/productsController";
import restocking from "~/controllers/restocking";
import { RegistrationInterface } from "~/interfaces/interface";
import { getSession } from "~/session";
import CatIcon from "~/components/icons/CatIcon";
import CategoryIcon from "~/components/icons/CatIcon";
import RestockIcon from "~/components/icons/restock";
import SaleIcon from "~/components/icons/Sales";

interface UserLayoutProps {
    children?: ReactNode;
    pageName?: string;
}

const AdminLayout = ({ children, pageName }: UserLayoutProps) => {
    const { theme, setTheme } = useTheme();
    const [desktopNav, setDesktopNav] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false); // Hide mobile nav by default
    const [isLogoutConfirmModalOpened, setIsLogoutConfirmModalOpened] = useState(false)
    const submit = useSubmit()
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useLoaderData<{
        user: RegistrationInterface[];
    }>();

    // const { theme, setTheme } = useTheme()

    // const { user } = useLoaderData<{ user: { user: string } }>()
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsLoading(true)
        }, 1000)

        return () => clearTimeout(timeOut)
    }, [])


    const desktopNavToggle = () => {
        setDesktopNav(!desktopNav);
    };
    const mobileNavToggle = () => {
        setMobileNavOpen(!mobileNavOpen);
    };
    const handleConfirmModalClosed = () => {
        setIsLogoutConfirmModalOpened(false);
    };

    return (
        <div className=" bg-[#191919] h-[100vh] w-full p-8 overflow-y-hidden">
            <div className="flex justify-between ">
                <div>
                    <p className="font-nunito text-2xl font-bold text-white">
                        Best <span className="text-success">Way</span>
                    </p>
                </div>
            </div>

            {/* Desktop navigation bar */}
            {/* Desktop navigation bar */}
            <div className={`rounded-xl hidden lg:block md:block w-64 bg-[#333] h-[88vh] shadow-md dark:text-white fixed transition-transform duration-500 p-6 ${desktopNav ? "transform-none" : "-translate-x-full"}`}>
                {/* logo */}
                <div className="font-montserrat text-lg text-white">Main Menu</div>

                {/* Side Nav Content */}
                <div className="flex flex-col gap-4">
                    <ul className="mt-6 pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <DashboardIcon className="text-success h-5 w-5 hover:text-white" />
                                Dashboard
                            </li>
                    </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/users">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <UsersGroup className="text-success h-5 w-5 hover:text-white" />
                                Users
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/suppliers">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <SupplierIcon className="text-success h-5 w-5 hover:text-white" />
                                Suppliers
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/category">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <CategoryIcon className="text-green-600 h-5 w-5 hover:text-white" />
                                Category
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/products">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <ProductIcon className="text-success h-5 w-5 hover:text-white" />
                                Products
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/restocking">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <RestockIcon className="text-success h-5 w-5 hover:text-white" />
                                Restocking
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/sales">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                                Sales
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/debt">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                                Debt
                            </li>
                        </Link>
                    </ul>
                    <ul className=" pl-2 flex flex-col gap-2">
                        <Link className="" to="/admin/report">
                            <li className="text-md hover:bg-success  hover:border-r-4 hover:border-r-white hover:bg-opacity-50 hover:text-white font-nunito p-1 rounded-lg hover:rounded-r-lg flex items-center gap-2 transition-all duration-300 ease-in-out text-gray-200">
                                <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                                Report
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

            {/* Mobile Side Navigation Bar */}
            <div className={`h-full lg:hidden z-10  absolute md:hidden w-64 bg-primary bg-opacity-40  text-white backdrop-blur transition-transform duration-500 p-6 ${mobileNavOpen ? "transform-none" : "-translate-x-full"}`}>
                {/* Side Nav Content */}
                <button onClick={mobileNavToggle} className="block md:hidden ml-auto lg:hidden">
                    <CloseIcon className="text-danger-300" />
                </button>

                {/* logo */}
                <div className="flex items-center gap-2">
                    <div>
                        <img className="bg-white rounded-full h-10 w-10 " src={logo} alt="logo" />
                    </div>
                    <div className="font-nunito text-3xl">VoteEase</div>
                </div>
                {/* profile */}
                <div className=" mt-10">
                    <User
                        name="Jane Doe"
                        description="Product Designer"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    ></User>
                </div>
                {/* Side Nav Content */}
                <ul className="mt-10">
                    <Link className="" to="/user">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-primary font-nunito p-2 rounded-lg flex items-center gap-2">
                            <DashboardIcon className="h-4 w-4" />
                            Dashboard
                        </li>
                    </Link>
                    <Link className="" to="/user/ticket">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-primary font-nunito p-2 rounded-lg flex items-center gap-2">
                            <DashboardIcon className="h-4 w-4" />
                            Tickets
                        </li>
                    </Link>

                </ul>
            </div>

            <div className={`h-full p-4 transition-all duration-500 overflow-x-hidden  z-1 ${desktopNav ? "lg:ml-64 md:ml-64" : ""}`}>
                {/* Main Content */}
                <div className="">
                    <div className="flex gap-3 items-center justify-center bg-[#333] h-16 rounded-xl  px-10 ">

                        <div className="flex justify-between items-center w-full">
                            <div>
                                <p className="text-white text-xl">{pageName}</p>
                            </div>
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        name={`${user.firstName} ${user.middleName} ${user.lastName}`}
                                        description={user.role === "attendant" ? "Attendant" : " Admin"}
                                        avatarProps={{
                                            src: user.image || "https://i.pravatar.cc/150?u=default"
                                        }}
                                    ></User>

                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-bold">{user.firstName}</p>
                                        <p className="font-bold">{user.email}</p>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        color="danger"
                                        className="flex"
                                        onClick={() => {
                                            setIsLogoutConfirmModalOpened(true)
                                        }}
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>


                    </div>
                    {children}
                </div>
            </div>

            <ConfirmModal className="dark:bg-slate-950 border border-white/5" header="Confirm Logout" content="Are you sure to logout?" isOpen={isLogoutConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button color="primary" variant="flat" className="font-montserrat font-semibold" size="sm" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button color="danger" variant="flat" className="font-montserrat font-semibold " size="sm" onClick={() => {
                        setIsLogoutConfirmModalOpened(false)
                        submit({
                            intent: "logout",
                        }, {
                            method: "post"
                        })
                    }} >
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

        </div>
    );
};

export default AdminLayout;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    switch (intent) {
        case "logout":
            const logout = await adminDashboardController.logout(intent)
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
    const { user } = await productsController.FetchProducts({
        request,
        page,
        search_term
    });


    const { totalProductsCount } = await restocking.FetchProducts({
        request,
        page,
        search_term,
        limit: 10, // Adjust limit as needed
        low_stock, // Pass the low_stock flag
    });

    return json({ totalProductsCount, user });
};


