import { Button, image } from "@nextui-org/react";
import PublicLayout from "~/layout/PublicLayout";
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
import chanfa from "~/components/images/changfa-removebg-preview.png";
import blanket from "~/components/images/blanket-removed.png";
import pump from "~/components/images/pumping-removed.png";
import holes from "~/components/images/holes.png";
import oil from "~/components/images/GTT_iol_1_litter-removebg-preview.png";
import parts from "~/components/images/parts3-removebg-preview.png";
import cements from "~/components/images/cement1-removebg-preview.png";
import bulk from "~/components/images/Wholesale.png";
import news from "~/components/illustration/news.jpg";
import InstagramIcon from "~/components/icons/InstgramIcon";
import TwiterIcon from "~/components/icons/TwiterIcon";
import WhatsappIcon from "~/components/icons/WhatsappIcon";
import { Link } from "@remix-run/react";


const Home = () => {
    const sections = [
        {
            bgColor: 'bg-gradient-to-l from-[#191919] via-[#191919] to-[#191919]',
            title: 'Buy',
            subtitle: 'All Machine',
            textColor: "text-white",
            mainText: 'Parts',
            mainTextColor: 'text-[#4c4c4c]',
            buttonColor: 'bg-[#f42c37]',
            buttonTextColor: 'text-white',
            image: parts,
            colSpan: 'col-span-1',
            className: "w-80"
        },
        {
            bgColor: 'bg-[#fcb900]',
            title: 'Explore more',
            subtitle: 'of our quality',
            textColor: "text-white",
            mainText: 'Oil and grease',
            mainTextColor: 'text-yellow-300',
            buttonColor: 'bg-white',
            buttonTextColor: 'text-[#fcb900]',
            image: oil,
            colSpan: 'col-span-1',
            className: "h-80 w-60"
        },
        {
            bgColor: 'bg-[#f42c37]',
            title: 'Get best',
            subtitle: 'Performaning',
            textColor: "text-white",
            mainText: 'Engine',
            mainTextColor: 'text-red-300',
            buttonColor: 'bg-white',
            buttonTextColor: 'text-[#f42c37]',
            image: chanfa,
            colSpan: 'col-span-2',
            className: "h-[50vh] w-[35vw]"
        },
        {
            bgColor: 'bg-gradient-to-l from-[#cfcfcf] via-[#cfcfcf] to-[#cfcfcf]',
            title: 'Avoid',
            subtitle: 'Faulty',
            textColor: "text-black",
            mainText: 'Holes',
            mainTextColor: 'text-white',
            buttonColor: 'bg-[#f42c37]',
            buttonTextColor: 'text-white',
            image: holes,
            colSpan: 'col-span-2',
            className: ""
        },
        {
            bgColor: 'bg-[#00d084]',
            title: 'Skip',
            subtitle: 'Loosing',
            mainText: 'Gold',
            textColor: "text-white",
            mainTextColor: 'text-green-300',
            buttonColor: 'bg-white',
            buttonTextColor: 'text-[#00d084]',
            image: blanket,
            colSpan: 'col-span-1',
            className: "h-60 w-60"
        },
        {
            bgColor: 'bg-primary',
            title: 'Get',
            subtitle: 'Bulding',
            mainText: 'Materials',
            textColor: "text-white",
            mainTextColor: 'text-primary-300',
            buttonColor: 'bg-white',
            buttonTextColor: 'text-primary',
            image: cements,
            colSpan: 'col-span-1',
            className: "w-60"
        },

    ];

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
                <div className="lg:h-[100vh] bg-gradient-to-l from-gray-100 via-[#cfcfcf] to-[#cfcfcf] rounded-2xl w-full flex flex-col lg:pl-40 lg:pr-10 justify-center gap-2 mt-4 shadow-sm relative overflow-hidden">
                    <p className="font-montserrat text-8xl font-bold">Water</p>
                    <p className="font-montserrat text-[130px] font-bold text-white/80">Pump</p>
                    <Link to="/shop">
                        <button className="lg:w-60 lg:h-14 bg-[#f42c37] rounded-full text-white font-nunito text-lg inset-0">
                            Shop By Category
                        </button>
                    </Link>

                    <div className="absolute flex items-center justify-center overflow-hidden w-full">
                        <img src={pump} alt="" className="w-[80vw] h-[80vh] object-contain" />
                    </div>
                </div>
            </section>

            <section className="lg:grid lg:grid-cols-4 gap-10 mt-10">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`${section.bgColor} h-[50vh] rounded-2xl flex flex-col shadow-sm justify-center px-4 relative ${section.colSpan} overflow-hidden`}
                    >
                        <p className={`font-nunito ${section.textColor}`}>{section.title}</p>
                        <p className={`font-nunito ${section.textColor}`}>{section.subtitle}</p>
                        <p className={`font-montserrat font-bold text-[40px] ${section.mainTextColor}`}>{section.mainText}</p>
                        <Button
                            className={`lg:w-24 ${section.buttonColor} rounded-full ${section.buttonTextColor} font-nunito text-lg`}
                        >
                            Browse
                        </Button>
                        <div className="absolute bottom-0 right-0 overflow-hidden">
                            <img src={section.image} alt={section.mainText} className={section.className} />
                        </div>
                    </div>
                ))}
            </section>

            <section className="lg:grid lg:grid-cols-4 mt-10">
                <div className="flex items-center justify-center gap-4">
                    <ShippingIcon className="text-danger" />
                    <span>
                        <p className="font-nunito text-lg font-bold">Free Shipping</p>
                        <p className="font-nunito text-lg text-gray-500">Free Shipping on all others</p>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <ShippingIcon className="text-danger" />
                    <span>
                        <p className="font-nunito text-lg font-bold">Money Guarantee</p>
                        <p className="font-nunito text-lg text-gray-500">30 Day Money Back</p>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <ShippingIcon className="text-danger" />
                    <span>
                        <p className="font-nunito text-lg font-bold">Online Support 24/7
                        </p>
                        <p className="font-nunito text-lg text-gray-500">Technical Support 24/7
                        </p>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <ShippingIcon className="text-danger" />
                    <span>
                        <p className="font-nunito text-lg font-bold">Secure Payment
                        </p>
                        <p className="font-nunito text-lg text-gray-500">All Cards Accepted
                        </p>
                    </span>
                </div>
            </section>

            <section className="py-60">
                <div className="w-full h-[70vh] rounded-2xl bg-[#f42c37] px-60 flex justify-between py-20 text-white relative overflow-hidden">
                    <div>
                        <p className="font-nunito">20% OFF</p>
                        <p className="font-montserrat font-bold text-[70px]">FINE</p>
                        <p className="font-montserrat font-bold text-[70px] -mt-6">SMILE</p>
                        <p className="font-nunito animate-bounce">Bulk Purchases</p>
                    </div>


                    <div className="absolute lg:-mt-40 lg:-ml-40 flex justify-center items-center w-full h-full">
                        <img src={bulk} className="" />
                    </div>
                </div>
            </section>


            <section className=" ">
                <p className="font-nunito font-bold text-center text-[40px]"> Best Seller Products</p>

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

            <section className="py-60">
                <div className="w-full h-[70vh] rounded-2xl bg-[#00d084] px-60 flex justify-between py-20 text-white relative overflow-hidden">
                    <div>
                        <p className="font-nunito">20% OFF</p>
                        <p className="font-montserrat font-bold text-[70px]">FINE</p>
                        <p className="font-montserrat font-bold text-[70px] -mt-6">SMILE</p>
                        <p className="font-nunito">Bulk Purchases</p>
                    </div>
                    <div>
                        <p className="font-nunito">Best Solo Air</p>
                        <p className="font-nunito font-bold text-[70px]">Summer Sales</p>
                        <p className="font-nunito">Company that grew from 300 to 450 employees last month</p>
                        <Button className="mt-4 text-lg font-nunito bg-white">
                            Shop
                        </Button>
                    </div>

                    <div className="absolute lg:-mt-40 lg:-ml-10">
                        <img src={watch1} className="" />
                    </div>
                </div>
            </section>

            <section className="">
                <p className="font-montserrat font-bold text-center text-[40px]">Recent News</p>
                <div className="lg:grid lg:grid-cols-3 gap-10 mt-10">
                    <div className="mt-4">
                        <img className="h-60  rounded-xl" src={news} alt="" />
                        <span className="flex gap-8 mt-4">
                            <p className="font-nunito text-gray-600">October 5, 2019</p>
                            <p className="font-nunito text-gray-600">By Mends</p>
                        </span>
                        <p className="mt-4 font-nunito font-bold text-xl">How to choose perfect gadget</p>
                        <p className="mt-4 font-nunito">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi placeat accusamus vitae. Tempora debitis iusto mollitia cupiditate reiciendis quae, tenetur accusamus quasi aspernatur dolore, expedita aut corporis nemo maxime?
                        </p>
                    </div>

                    <div className="mt-4">
                        <img className="h-60  rounded-xl" src={news} alt="" />
                        <span className="flex gap-8 mt-4">
                            <p className="font-nunito text-gray-600">October 5, 2019</p>
                            <p className="font-nunito text-gray-600">By Mends</p>
                        </span>
                        <p className="mt-4 font-nunito font-bold text-xl">How to choose perfect gadget</p>
                        <p className="mt-4 font-nunito">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi placeat accusamus vitae. Tempora debitis iusto mollitia cupiditate reiciendis quae, tenetur accusamus quasi aspernatur dolore, expedita aut corporis nemo maxime?
                        </p>
                    </div>
                    <div className="mt-4">
                        <img className="h-60  rounded-xl" src={news} alt="" />
                        <span className="flex gap-8 mt-4">
                            <p className="font-nunito text-gray-600">October 5, 2019</p>
                            <p className="font-nunito text-gray-600">By Mends</p>
                        </span>
                        <p className="mt-4 font-nunito font-bold text-xl">How to choose perfect gadget</p>
                        <p className="mt-4 font-nunito">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi placeat accusamus vitae. Tempora debitis iusto mollitia cupiditate reiciendis quae, tenetur accusamus quasi aspernatur dolore, expedita aut corporis nemo maxime?
                        </p>
                    </div>
                </div>
            </section>


        </PublicLayout>
    );
};

export default Home;
