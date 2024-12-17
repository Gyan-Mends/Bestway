import PublicLayout from "~/layout/PublicLayout"
import headphone from "../components/illustration/headphone.png";
import { Button } from "@nextui-org/react";
import MinusIcon from "~/components/icons/MinusIcon";
import PlusIcon from "~/components/icons/PlusIcon";
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



const ProductDetails = () => {

    const Products = [
        {
            name: "Beats",
            image: headset,
            price: "$9"

        },

        {
            name: "Beats",
            image: speaker,
            price: "$9"

        },

        {
            name: "Beats",
            image: laptop,
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
            <section className="lg:grid lg:grid-cols-2 mt-20 gap-10">
                <div className="h-[85vh] w-full rounded-2xl bg-[#cfcfcf] flex items-center justify-center">
                    <img className="h-[70vh] w-[70vw]" src={headphone} alt="" />
                </div>
                <div className="px-20 py-10 flex flex-col gap-6">
                    <p className="font-nunito font-bold text-[42px]">Beats</p>
                    <p className="font-nunito ">Customer review</p>
                    <p className="font-nunito font-bold text-[42px]">$198</p>
                    <p className="font-nunito ">Customer Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nesciunt deserunt vel nemo dolorem quidem explicabo veniam, porro ipsa nostrum id esse tempore nobis. Laboriosam natus eos nesciunt hic voluptate! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eius, id commodi officia porro assumenda temporibus animi itaque minus nobis. Harum sit ipsam veniam, odit culpa sequi blanditiis maiores ullam?</p>

                    <form action="">
                        <div className="flex gap-6">
                            <button className="w-20 bg-[#f42c37] h-14 rounded-xl flex items-center justify-center">
                                <MinusIcon className="h-8 w-8 text-white" />
                            </button>
                            <input className="border border-2 h-14 rounded-lg outline-none w-20  pl-2 font-nunito text-xl" type="email" />
                            <button className="w-20 bg-primary h-14 rounded-xl flex items-center justify-center">
                                <PlusIcon className="h-8 w-8 text-white" />
                            </button>
                        </div>
                        <Button className="rounded-xl mt-10 h-14 w-40 fomt-nunito text-xl" color="primary">Add To Cart</Button>
                    </form>
                </div>
            </section>

            <section className="mt-40">
                <p className="font-nunito font-bold text-[42px]">Related Products</p>
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

export default ProductDetails