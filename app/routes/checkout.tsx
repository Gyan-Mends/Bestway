import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import PublicLayout from "~/layout/PublicLayout";
import { Form } from "@remix-run/react";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartItems = () => {
            const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(storedCarts);

            const totalAmount = storedCarts.reduce(
                (sum, item) => sum + parseFloat(item.price) * item.quantity,
                0
            );
            setTotal(totalAmount.toFixed(2));
        };

        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            const response = await fetch("/check-session");
            if (!response.ok) {
                alert("Please log in to proceed.");
                window.location.href = "/innnnn"; // Redirect to login page
                return;
            }

            const data = await response.json();


            // Proceed with checkout
            localStorage.removeItem("cart");
            setCartItems([]);
            alert(`Checkout successful for ${data.email}!`);
        } catch (error) {
            console.error("Error checking session:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <PublicLayout>
            <div className="container mx-auto mt-10">
                <h2 className="text-3xl font-bold mb-6">Checkout</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Cart Summary */}
                    <CartSummary cartItems={cartItems} total={total} />

                    {/* User Details */}
                    <UserDetailsForm
                        onCheckout={handleCheckout}
                        isCheckoutDisabled={cartItems.length === 0}
                    />
                </div>
            </div>
        </PublicLayout>
    );
};

const CartSummary = ({ cartItems, total }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
            {cartItems.length > 0 ? (
                <div className="space-y-4">
                    {cartItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <h3 className="text-xl font-bold mt-6">Total: ${total}</h3>
        </div>
    );
};

const CartItem = ({ item }) => {
    return (
        <div className="flex items-center justify-between border p-4 rounded-md">
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                />
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    );
};

const UserDetailsForm = ({ onCheckout, isCheckoutDisabled, cartItems }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
            <Form method="post">
                <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        name="fullName"
                        placeholder="Enter your full name"
                        fullWidth
                        required
                    />
                    <Input
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        type="text"
                        fullWidth
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        fullWidth
                        required
                    />
                    <Input
                        label="Address"
                        name="address"
                        placeholder="Enter your address"
                        fullWidth
                        required
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        type="tel"
                        fullWidth
                        required
                    />

                    {/* Hidden input to include cart details */}
                    <input
                        type="hidden"
                        name="cartDetails"
                        value={JSON.stringify(cartItems)}
                    />

                    <input name="intent" value="order" type="text" />


                    <Button
                        color="primary"
                        className="mt-6 w-full"
                        type="submit"
                        disabled={isCheckoutDisabled}
                    >
                        Proceed to Pay
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Checkout;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;

    const cartDetails = JSON.parse(formData.get("cartDetails") as string);

    try {
        // Save user details to the database
        const userDetails = {
            fullName,
            name,
            email,
            address,
            phone,
        };


        return redirect("/success");
    } catch (error) {
        console.error("Error saving checkout data:", error);
        return new Response("Error saving data", { status: 500 });
    }
};



