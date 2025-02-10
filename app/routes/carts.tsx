import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import PublicLayout from "~/layout/PublicLayout";
import headphone from "../components/illustration/headphone.png";
import MinusIcon from "~/components/icons/MinusIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { Link } from "@remix-run/react";

const Carts = () => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        // Check if data exists in localStorage
        const storedCarts = localStorage.getItem("cart");

        // Parse and set data if available
        if (storedCarts) {
            try {
                const parsedCarts = JSON.parse(storedCarts);
                console.log("Loaded Carts:", parsedCarts); // Debug log
                setCarts(parsedCarts); // Update state
            } catch (error) {
                console.error("Failed to parse cart items:", error);
            }
        } else {
            console.log("No cart items found in localStorage.");
        }
    }, []);


    const updateCartQuantity = (index, delta) => {
        const updatedCarts = [...carts];
        updatedCarts[index].quantity = Math.max(1, updatedCarts[index].quantity + delta);
        setCarts(updatedCarts);
        localStorage.setItem("cartItems", JSON.stringify(updatedCarts));
    };

    const deleteCartItem = (index) => {
        const updatedCarts = carts.filter((_, i) => i !== index);
        setCarts(updatedCarts);
        localStorage.setItem("cartItems", JSON.stringify(updatedCarts));
    };

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

            <section className="mt-20 lg:grid lg:grid-cols-3 gap-10">
                <div className="col-span-2">
                    <div className="lg:grid lg:grid-cols-2 gap-6">
                        {carts.length > 0 ? (
                            carts.map((cart, index) => (
                                <div key={index} className="px-2 py-2 border border-2 rounded-lg flex gap-4 justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-20 w-20 bg-[#cfcfcf] rounded-lg flex items-center justify-center">
                                            <img src={cart.image || headphone} className="h-20 w-20" alt={cart.name || "Product"} />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <p className="font-nunito">{cart.name}</p>
                                            <p className="font-nunito font-bold">${cart.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <button
                                            onClick={() => deleteCartItem(index)}
                                            className="font-nunito text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateCartQuantity(index, -1)}
                                                className="w-8 bg-[#f42c37] h-8 rounded-md flex items-center justify-center"
                                            >
                                                <MinusIcon className="h-4 w-4 text-white" />
                                            </button>
                                            <input
                                                className="border border-2 h-8 rounded-lg outline-none w-10 pl-2 font-nunito text-xl text-center"
                                                type="number"
                                                value={cart.quantity}
                                                readOnly
                                            />
                                            <button
                                                onClick={() => updateCartQuantity(index, 1)}
                                                className="w-8 bg-primary h-8 rounded-md flex items-center justify-center"
                                            >
                                                <PlusIcon className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="font-nunito text-center col-span-2">Your cart is empty.</p>
                        )}
                    </div>
                </div>
                <div className="border rounded-2xl border-2 w-full px-8 py-10">
                    <div className="flex justify-between">
                        <p className="font-nunito text-xl font-bold">Total</p>
                        <p className="font-nunito text-xl font-bold">
                            $
                            {carts
                                .reduce((total, cart) => total + parseFloat(cart.price.replace("$", "")) * cart.quantity, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                    <hr className="mt-10" />
                    <Link to="/checkout">
                        <Button color="primary" className="mt-10 w-full h-14 font-nunito text-lg">
                            Proceed To Checkout
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Carts;
