import { Button, Input } from "@nextui-org/react";
import PublicLayout from "~/layout/PublicLayout";
import { useMemo, useState } from "react";
import { ChevronDownIcon } from "~/components/icons/ArrowDown";
import headphone from "../components/illustration/headphone.png";
import { json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/session";
import category from "~/controllers/categoryController";
import productsController from "~/controllers/productsController";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { CategoryInterface, ProductInterface } from "~/interfaces/interface";
import { SearchIcon } from "~/components/icons/SearchIcon";

const Shop = () => {
    const { categories = [], user, products = [], totalPages } = useLoaderData<{
        categories: CategoryInterface[];
        user: { _id: string };
        products: ProductInterface[];
        totalPages: number;
    }>();
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Products Categories"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <PublicLayout>
            <section>
                <div className="lg:h-[70vh] bg-gradient-to-l from-gray-100 via-[#cfcfcf] to-[#cfcfcf] rounded-2xl w-full flex flex-col lg:pl-40 lg:pr-10 justify-center gap-2 mt-4 shadow-sm relative overflow-hidden">
                    <p className="font-nunito text-4xl font-bold">Shop from</p>
                    <p className="font-montserrat text-8xl font-bold">Phlox</p>
                    <p className="font-montserrat text-[120px] font-bold text-white/80">PRODUCTS</p>
                    <Button className="lg:w-60 lg:h-14 bg-[#f42c37] rounded-full text-white font-nunito text-lg">
                        Browse Products
                    </Button>

                    <div className="absolute flex items-center justify-center overflow-hidden">
                        <img src={headphone} alt="Headphones illustration" className="max-w-full max-h-full object-contain" />
                    </div>
                </div>
            </section>

            <section className="lg:grid lg:grid-cols-12 gap-4">
                {/* Sidebar or additional content */}
                <div className="lg:col-span-3 p-4 rounded-xl mt-20">
                    <Input
                        endContent={
                            <div className="h-10 w-12 bg-[#f42c37] flex items-center shadow-lg justify-center rounded-full">
                                <SearchIcon className="text-white" />
                            </div>
                        }
                        onValueChange={(value) => {
                            const timeoutId = setTimeout(() => {
                                navigate(`?search_term=${value}`, { replace: true, preventScrollReset: true });
                            }, 100);
                            return () => clearTimeout(timeoutId);
                        }}
                        classNames={{
                            inputWrapper:
                                "border border-2 h-14 rounded-full outline-none w-80 bg-gradient-to-l from-gray-100 via-[#cfcfcf] to-[#cfcfcf] pl-2 font-nunito text-lg",
                        }}
                        type="text"
                    />

                    <p className="font-nunito text-xl mt-10">Products Categories</p>
                    <ul className="mt-4 space-y-2">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className="font-nunito text-lg cursor-pointer hover:text-[#f42c37] transition-colors duration-300"
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Products */}
                <div className="lg:col-span-9 lg:grid lg:grid-cols-4 gap-12 mt-20">
                    {products.map((product, index) => (
                        <Link to={`/shop/${product._id}`}>
                            <div key={index} className="group">
                                {product.image && (
                                    <div className="w-full h-60 rounded-xl flex items-center justify-center bg-gradient-to-l from-[#cfcfcf] via-[#cfcfcf] to-[#cfcfcf] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                        <img
                                            className="h-40 w-40 object-contain"
                                            src={product.image}
                                            alt={product.name || "Product"}
                                        />
                                    </div>
                                )}
                                <p className="mt-2 font-nunito">{product.name || "Unnamed Product"}</p>
                                <p className="mt-2 font-nunito">GHC {product.price || "N/A"}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
};

export default Shop;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") || "";

    const { user, products, totalPages } = await productsController.FetchProducts({ request, page, search_term });
    const { categories } = await category.getCategories({ page, request });

    return json({ user, products, totalPages, categories });
};
