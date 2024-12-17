import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import PublicLayout from "~/layout/PublicLayout"
import { useMemo, useState } from "react";
import ArrowsIcon from "~/components/icons/ArrowsIcon";
import { ChevronDownIcon } from "~/components/icons/ArrowDown";
import headphone from "../components/illustration/headphone.png";
import handsfree from "../components/illustration/Mask-Group-5-1.png";
import watch from "../components/illustration/clay-apple-watch-mockup-07.png";
import laptop from "../components/illustration/Laptop.png";
import console from "../components/illustration/NicePng_ps4-png_193822.png";
import reality from "../components/illustration/man-wearing-virtual-reality-headset-at-home-D7AYCTV-2.png";
import speaker from "../components/illustration/P6YUXW1.png";
import headset from "../components/illustration/headset.png";
import ShippingIcon from "~/components/icons/ShippingIcon";
import P1 from "~/components/illustration/p1.jpg";
import watch1 from "~/components/illustration/watch.png";
import news from "~/components/illustration/news.jpg";


const Shop = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Products Categories"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]


    );

    const Products = [
        {
            name: "Beats",
            image: headset,
            price: "$9"

        },
        {
            name: "Beats",
            image: P1,
            price: "$9"

        },
        {
            name: "Beats",
            image: speaker,
            price: "$9"

        },
        {
            name: "Beats",
            image: P1,
            price: "$9"

        },
        {
            name: "Beats",
            image: laptop,
            price: "$9"

        },
        {
            name: "Beats",
            image: watch,
            price: "$9"

        },
        {
            name: "Beats",
            image: watch,
            price: "$9"

        },
        {
            name: "Beats",
            image: handsfree,
            price: "$9"

        }

    ]
    return (
        <PublicLayout>
            <section>
                <div className="lg:h-[80vh] bg-gradient-to-l from-gray-100 via-[#cfcfcf] to-[#cfcfcf] rounded-2xl w-full flex flex-col lg:pl-40 lg:pr-10 justify-center gap-2 mt-4 shadow-sm relative overflow-hidden">
                    <p className="font-nunito text-4xl font-bold">Shop from</p>
                    <p className="font-montserrat text-8xl font-bold">Phlox</p>
                    <p className="font-montserrat text-[170px] font-bold text-white/80">PRODUCTS</p>
                    <Button className="lg:w-60 lg:h-14 bg-[#f42c37] rounded-full text-white font-nunito text-lg">
                        Browse Products
                    </Button>

                    <div className="absolute flex items-center justify-center overflow-hidden">
                        <img src={headphone} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                </div>
            </section>

            <section className="flex justify-between mt-20">
                <p className="font-nunito font-bold text-[35px]">Category Name</p>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize"
                        >
                            {selectedValue} <ChevronDownIcon />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="Gadgets">Gadgets</DropdownItem>
                        <DropdownItem key="Speakers">Speakers</DropdownItem>
                        <DropdownItem key="Headephone">Headephone</DropdownItem>
                        <DropdownItem key="Laptops">Laptops</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </section>

            <section>
                <div className="lg:grid lg:grid-cols-4 gap-12 mt-20">
                    {Products.map((product, index) => (
                        <div className="">
                            <div key={index} className=" w-full h-60 rounded-xl flex items-center jUstIfy-center  bg-gradient-to-l from-[#cfcfcf] via-[#cfcfcf] to-[#cfcfcf] overflow-y-hidden" >
                                <img src={product.image} alt="" />
                            </div>
                            <p className="mt-2 font-nunito">{product.name}</p>
                            <p className="mt-2 font-nunito">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    )
}

export default Shop