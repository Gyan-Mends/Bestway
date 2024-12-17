import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import CloseIcon from "~/components/icons/CloseIcon";
import DashboardIcon from "~/components/icons/DashboardIcon";
import LogoutIcon from "~/components/icons/LogoutIcon";
import MoonIcon from "~/components/icons/MoonIcon";
import NavTogglerIcon from "~/components/icons/NavTogglerIcon";
import SaleIcon from "~/components/icons/Sales";
import SunIcon from "~/components/icons/SunIcon";
import logo from "~/components/illustration/logo.png"
import ConfirmModal from "~/components/modal/confirmModal";
import adminDashboardController from "~/controllers/AdminDashBoardController";
import attendanceDashboardController from "~/controllers/AttendanceDashBoardController";
import productsController from "~/controllers/productsController";
import { RegistrationInterface } from "~/interfaces/interface";

interface UserLayoutProps {
    children: ReactNode;
    pageName: string;
}

const AttendantLayout = ({ children, pageName }: UserLayoutProps) => {
    const { theme, setTheme } = useTheme();
    const [desktopNav, setDesktopNav] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { user } = useLoaderData<{ user: RegistrationInterface[] }>();
    const [isLogoutConfirmModalOpened, setIsLogoutConfirmModalOpened] = useState(false)
    const submit = useSubmit()

    const handleConfirmModalClosed = () => {
        setIsLogoutConfirmModalOpened(false);
    };



    const desktopNavToggle = () => {
        setDesktopNav(!desktopNav);
    };

    const mobileNavToggle = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    return (
        <div className={`!h-full  transition duration-500 ${theme === "light" ? "bg-white " : "dark:bg-[#191919]"}`}>
            {/* Desktop Side Navigation Bar */}
            <div className={`h-full hidden lg:block md:block w-64 dark:bg-[#333] text-white fixed transition-transform duration-500 p-6 ${desktopNav ? "transform-none" : "-translate-x-full"}`}>
                {/* logo */}
                <div className="flex items-center gap-2">
                    <div>
                    </div>
                    <div className="font-nunito text-2xl font-semibold">Best <span className="text-success">Way</span></div>
                </div>
                {/* profile */}
                <div className="font-nunito mt-10">
                    {/* <User
                        name={`${user.firstName} ${user.middleName} ${user.lastName}`}
                        description={user.role === "attendant" ? "Attendant" : " "}
                        avatarProps={{
                            src: user.image || "https://i.pravatar.cc/150?u=default"
                        }}
                    ></User> */}

                </div>
                {/* Side Nav Content */}
                <ul className="mt-10">
                    <Link className="" to="/attendant">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito text-md p-2 rounded-lg flex items-center gap-2">
                            <DashboardIcon className="text-success h-5 w-5 hover:text-white" />
                            Dashboard
                        </li>
                    </Link>
                    <Link className="" to="/attendant/sales">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito text-md p-2 rounded-lg flex items-center gap-2">
                            <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                            Sales Point
                        </li>
                    </Link> 
                    <Link className="" to="/attendant/debt">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito text-md p-2 rounded-lg flex items-center gap-2">
                            <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                            Debt
                        </li>
                    </Link> 
                    <Link className="" to="/attendant/report">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito text-md p-2 rounded-lg flex items-center gap-2">
                            <SaleIcon className="text-success h-5 w-5 hover:text-white" />
                            Report
                        </li>
                    </Link> 
                </ul>
            </div>

            {/* Mobile Side Navigation Bar */}
            <div className={`h-[full] lg:hidden z-10  absolute md:hidden w-64 bg-primary bg-opacity-40  text-white backdrop-blur transition-transform duration-500 p-6 ${mobileNavOpen ? "transform-none" : "-translate-x-full"}`}>
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
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito p-2 rounded-lg flex items-center gap-2">
                            <DashboardIcon className="h-4 w-4" />
                            Dashboard
                        </li>
                    </Link>
                    <Link className="" to="/user/ticket">
                        <li className="hover:bg-primary-400 text-md hover:bg-white hover:text-success font-nunito p-2 rounded-lg flex items-center gap-2">
                            {/* <TicketIcon className="h-4 w-4" /> */}
                            Tickets
                        </li>
                    </Link>

                </ul>
            </div>

            {/* Page Content */}
            <div className={`p-4 transition-all duration-500 overflow-x-hidden z-1 ${desktopNav ? "lg:ml-64 md:ml-64" : ""}`}>
                {/* Top Nav */}
                <div className="h-14 rounded-2xl w-full bg-[#333] px-6 flex items-center justify-between">
                    {/* Overview */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Mobile Nav Toggle */}
                        <button onClick={mobileNavToggle} className="block md:hidden lg:hidden">
                            <NavTogglerIcon className="text-success" />
                        </button>
                        {/* Desktop Nav Toggle */}
                        <button onClick={desktopNavToggle} className="hidden md:block lg:block">
                            <NavTogglerIcon className="text-success" />
                        </button>
                        <p className="font-nunito text-2xl text-white">{pageName}</p>
                    </div>

                    {/* Mode Switch and Logout */}
                    <div className="flex gap-4">
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

                {/* Main Content */}
                <div className="mt-4">
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

export default AttendantLayout;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string

    const { user } = await productsController.FetchProducts({
        request,
        page,
        search_term
    });

    return json({ user })

}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    switch (intent) {
        case "logout":
            const logout = await attendanceDashboardController.logout(intent)
            return logout
        default:
            return json({
                message: "Bad request",
                success: false,
                status: 500
            })
    }
}
