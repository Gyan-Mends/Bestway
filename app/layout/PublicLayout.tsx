import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, useDisclosure } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import logo from "../components/illustration/logotype.png"
import { Link } from "@remix-run/react";
import { SearchIcon } from "~/components/icons/SearchIcon";
import CartIcon from "~/components/icons/CartIcon";
import { useTheme } from "next-themes";
import SunIcon from "~/components/icons/SunIcon";
import MoonIcon from "~/components/icons/MoonIcon";
import InstagramIcon from "~/components/icons/InstgramIcon";
import TwiterIcon from "~/components/icons/TwiterIcon";
import WhatsappIcon from "~/components/icons/WhatsappIcon";
import SearchModal from "~/components/modal/CustomeSearchModal";



const PublicLayout = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchModalOpened, setSearchModalOpened] = useState(false)

    const handleInputChange = () => {
        setSearchModalOpened(false)
    }
    // const { theme, setTheme } = useTheme()
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    return (
        <div className={`  overflow-x-hidden `}>
            {/* navigation bar */}
            <Navbar
                isBordered={false}
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                isBlurred
                position="sticky"
                className="top-0 z-50 py-2 sticky"  // Add 'sticky' class
            >
                <NavbarContent className="lg:hidden">
                    <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
                </NavbarContent>

                <NavbarContent className="lg:-ml-64 hidden lg:flex" justify="start">
                    <NavbarItem>
                        <img src={logo} alt="" />
                    </NavbarItem>
                    <NavbarItem className="flex gap-10 ml-10">
                        <Link className="font-poppins" to="/">
                            Home
                        </Link>
                        <Link className="font-poppins" to="/shop">
                            Shop
                        </Link>
                        <Link className="font-poppins" to="/about">
                            About
                        </Link>
                        <Link className="font-poppins" to="/contact">
                            Contact
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent className="lg:-mr-60 flex gap-2 lg:gap-8" justify="end">
                    <NavbarItem>
                        <Link className="font-nunito" to="/">
                            Login
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <button
                            className="flex gap-4 dark:bg-slate-900 dark:border-white/5 bg-gray-100 rounded-xl h-10 items-center px-4 shadow-sm border border-black/5 hover:bg-gray-200 transition-all duration-600"
                            onClick={() => setSearchModalOpened(true)}
                        >
                            <SearchIcon className="text-gray-600" />
                            <p className="font-nunito text-sm text-gray-600">Search product...</p>
                        </button>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="">
                            <CartIcon className="h-8 w-8 text-gray-600" />
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === 2
                                        ? "warning"
                                        : index === menuItems.length - 1
                                            ? "danger"
                                            : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>



            {/* page contents */}
            <main className=" lg:px-8 px-4">
                {children}

                <hr className="mt-20 border border-1" />

                <footer className="mt-20">
                    <p className="font-nunito">Lo<span className="text-4xl text-primary">go</span></p>
                    <p className="font-nunito mt-10">Follow us on social media</p>
                    <div className="mt-4 flex gap-4">
                        <InstagramIcon className="h-6 w-6" />
                        <TwiterIcon className="h-6 w-6" />
                        <WhatsappIcon className="h-6 w-6" />
                    </div>
                    <div className="lg:grid lg:grid-cols-5 mt-20 gap-20">
                        <div>
                            <img src={logo} alt="" />
                            <p className="font-nunito mt-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repudiandae ipsam perspiciatis, modi molestias natus debitis deleniti quod, ut, officia sed et! Recusandae at architecto ad animi cum dolorum commodi.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-nunito font-bold">Quick Links</p>
                            <Link className="font-nunito mt-6" to="">Home</Link>
                            <Link className="font-nunito" to="">About Us</Link>
                            <Link className="font-nunito" to="">Shop</Link>
                            <Link className="font-nunito" to="">Contact Us</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-nunito font-bold ">Contact</p>
                            <p className="font-nunito mt-6">+99 (0) 101 0000 888 Patricia </p>
                            <p className="font-nunito">C. Amedee 4401 Waldeck </p>
                            <p className="font-nunito">Street Grapevine Nashville, Tx</p>
                            <p className="font-nunito">76051</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-nunito font-bold">Subscribe to your Email</p>
                            <p className="font-nunito font-bold text-4xl mt-6">For Latest News & Update</p>
                            <div className="flex gap-4 mt-6">
                                <input className="border border-2 h-14 rounded-full outline-none w-80 bg-gradient-to-l from-gray-100 via-[#cfcfcf] to-[#cfcfcf] pl-2 font-nunito text-lg" type="email" />
                                <Button className="rounded-full h-14 w-40 fomt-nunito text-xl" color="primary">Subscribe</Button>
                            </div>
                        </div>
                    </div>


                </footer>
            </main>

            <div className="mt-10 h-20 bg-[#cfcfcf] flex items-center px-6">
                <p className="font-nunito text-lg">© 2024 Acme Inc. All rights reserved.</p>
            </div>

            <SearchModal
                className="h-full pb-12 relative"
                isOpen={searchModalOpened}
                onOpenChange={() => {
                    setSearchModalOpened(false);
                }}
            >
                <form className="h-full">
                    <div className="relative w-full bg-transparent">
                        <SearchIcon className="absolute z-[100] text-slate-600 dark:text-slate-500 left-4 top-1/2 transform -translate-y-1/2" />
                        <input
                            className="w-full h-16 text-black pl-12 pr-4 outline-none dark:backdrop-blur dark:bg-slate-900 dark:text-white dark:border-slate-100 backdrop-blur opacity-80 border-b-1"
                            placeholder="Search..."
                            autoFocus
                            onChange={handleInputChange}
                        />
                    </div>


                </form>
            </SearchModal>

        </div>
    )
}

export default PublicLayout