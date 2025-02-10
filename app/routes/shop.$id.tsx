import React, { useState } from "react";
import PublicLayout from "~/layout/PublicLayout";
import { Button } from "@nextui-org/react";
import MinusIcon from "~/components/icons/MinusIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { useLoaderData } from "react-router";
import { json, LoaderFunction } from "@remix-run/node";
import Product from "~/modal/products";
import { ProductInterface } from "~/interfaces/interface";
import { Link } from "@remix-run/react";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);

    const { ProductDetail, relatedProducts } = useLoaderData<{
        ProductDetail: ProductInterface;
        relatedProducts: ProductInterface[];
    }>();

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        try {
            // Retrieve cart from localStorage, default to an empty array
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");

            // Find existing product in the cart
            const productIndex = cart.findIndex((item) => item.id === ProductDetail._id);

            if (productIndex !== -1) {
                // Update quantity of the existing product
                cart[productIndex] = {
                    ...cart[productIndex],
                    quantity: cart[productIndex].quantity + quantity,
                };
            } else {
                // Add new product to the cart
                cart.push({
                    id: ProductDetail._id,
                    name: ProductDetail.name,
                    price: ProductDetail.price,
                    image: ProductDetail.image,
                    quantity,
                });
            }

            // Save updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Notify user
            alert("Product added to cart successfully!");
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            alert("An error occurred while adding the product to your cart.");
        }
    };


    return (
        <PublicLayout>
            <section className="lg:grid lg:grid-cols-2 mt-20 gap-10">
                <div className="h-[85vh] w-full rounded-2xl bg-[#cfcfcf] flex items-center justify-center">
                    <img className="h-[50vh] w-[40vw]" src={ProductDetail.image} alt="" />
                </div>
                <div className="px-20 py-10 flex flex-col gap-6">
                    <p className="font-nunito font-bold text-[42px]">{ProductDetail?.name}</p>
                    <p className="font-nunito font-bold text-[42px]">Ghc {ProductDetail?.price}</p>
                    <p className="font-nunito ">{ProductDetail?.description}</p>

                    <div className="flex gap-6 items-center">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            className="w-20 bg-[#f42c37] h-14 rounded-xl flex items-center justify-center"
                        >
                            <MinusIcon className="h-8 w-8 text-white" />
                        </button>
                        <input
                            className="border border-2 h-14 rounded-lg outline-none w-20 text-center font-nunito text-xl"
                            type="text"
                            value={quantity}
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="w-20 bg-primary h-14 rounded-xl flex items-center justify-center"
                        >
                            <PlusIcon className="h-8 w-8 text-white" />
                        </button>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        className="rounded-xl mt-10 h-14 w-40 font-nunito text-xl"
                        color="primary"
                    >
                        Add To Cart
                    </Button>
                    <Link to="/carts">
                        <Button

                            className="rounded-xl mt-10 h-14 w-40 font-nunito text-xl"
                            color="primary"
                        >
                            Cart
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-40">
                <p className="font-nunito font-bold text-[42px]">Related Products</p>
                <div className="lg:grid lg:grid-cols-4 gap-12 mt-20">
                    {relatedProducts.map((product) => (
                        <Link key={product._id} to={`/shop/${product._id}`} className="block">
                            <div className="w-full h-60 rounded-xl flex items-center justify-center bg-gradient-to-l from-[#cfcfcf] via-[#cfcfcf] to-[#cfcfcf] overflow-hidden">
                                <img className="h-60 w-60" src={product.image} alt={product.name} />
                            </div>
                            <p className="mt-2 font-nunito">{product.name}</p>
                            <p className="mt-2 font-nunito">Ghc {product.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
};

export default ProductDetails;

export const loader: LoaderFunction = async ({ params }) => {
    const { id } = params;

    try {
        const ProductDetail = await Product.findById(id).populate("category");
        if (!ProductDetail) throw new Response("Product not found", { status: 404 });

        const relatedProducts = await Product.find({
            category: ProductDetail.category._id,
            _id: { $ne: id },
        })
            .limit(4)
            .exec();

        return json({ ProductDetail, relatedProducts });
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw new Response("Internal Server Error", { status: 500 });
    }
};
