import { toTime } from "@internationalized/date";
import { json, redirect } from "@remix-run/node"
import Cart from "~/modal/cart"
import Product from "~/modal/products";
import Registration from "~/modal/registration";
import { getSession } from "~/session";

class CartController {
    async AddToCart({
        request,
        intent,
        quantity,
        product,
        attendant,
        price
    }: {
        intent: string,
        quantity: string,
        product: string,
        attendant: string,
        price: string,
        request: Request,
    }) {
        try {
            if (intent === "addToCart") {
                //Check if the product quantity is > the quantity added to cart
                const productInInventory = await Product.findById(product);
                if (Number(productInInventory?.quantity) > 0) {
                    if (Number(quantity) > Number(productInInventory?.quantity)) {
                        return json({
                            message: "Quantity adding to to cart if more than quantity in store",
                            success: false
                        });
                    } else {
                        // Check if product has been added to cart already
                        const productCheck = await Cart.findOne({ product: product, attendant: attendant });
                        const newQuantity = Number(productCheck?.quantity) + Number(quantity)
                        const newPrice = Number(productCheck?.price) + Number(price)

                        if (productCheck) {
                            const updatedeCart = await Cart.findByIdAndUpdate(productCheck._id, {
                                quantity: newQuantity,
                                price: newPrice
                            })
                            if (updatedeCart) {
                                // Update the product quantity in the inventory
                                // const productInInventory = await Product.findById(product);
                                // if (productInInventory) {
                                //     const newQuantity = productInInventory.quantity - Number(quantity);
                                //     await Product.findByIdAndUpdate(product, { quantity: newQuantity });
                                // }

                                return json({
                                    message: "Cart item updated",
                                    success: true
                                });
                            }

                        } else {
                            // Add a new product to the cart
                            const cart = new Cart({
                                quantity,
                                product,
                                attendant,
                                price
                            });

                            const addToCart = await cart.save();


                            if (addToCart) {
                                // Update the product quantity in the inventory
                                // const productInInventory = await Product.findById(product);
                                // if (productInInventory) {
                                //     const newQuantity = productInInventory.quantity - Number(quantity);
                                //     await Product.findByIdAndUpdate(product, { quantity: newQuantity });
                                // }

                                return json({
                                    message: "Item added to cart",
                                    success: true
                                });
                            }
                        }
                    }
                } else {
                    return json({
                        message: "This item is not available in store",
                        success: false
                    });
                }

            }
        } catch (error: any) {
            return json({
                error: error.message,
                success: false,
            });
        }
    }


    async DeleteItem(
        {
            intent,
            id,
        }: {
            intent: string,
            id: string,
        }
    ) {
        if (intent === "delete") {
            const cartItem = await Cart.findById(id);
            if (cartItem) {
                const productId = cartItem.product;
                const quantityToAddBack = Number(cartItem.quantity);

                // // Update the product quantity
                // const product = await Product.findById(productId);
                // if (product) {
                //     product.quantity += quantityToAddBack;
                //     await product.save();
                // }

                // Delete the cart item
                const deleteUser = await Cart.findByIdAndDelete(id);
                if (deleteUser) {
                    return json({
                        message: "Cart item deleted successfully",
                        success: true,
                        status: 200,
                    });
                } else {
                    return json({
                        message: "Unable to delete item from cart",
                        success: false,
                        status: 500
                    });
                }
            } else {
                return json({
                    message: "Cart item not found",
                    success: false,
                    status: 404
                });
            }
        }

    }

    async FetchCart(request: Request) {
        const session = await getSession(request.headers.get("Cookie"));
        const token = session.get("email");
        const user = await Registration.findOne({ email: token });
        const carts = await Cart.find({ attendant: user?._id }).populate("product");

        const totalQuantity = carts.reduce((acc, cart) => {
            return acc + Number(cart.quantity); // Ensure quantity is treated as a number
        }, 0);

        const totalPrice = carts.reduce((acc, cart) => {
            return acc + (Number(cart.product.price) * Number(cart.quantity)); // Multiply price by quantity
        }, 0);


        return { carts, totalQuantity, totalPrice };
    }

}
const cartController = new CartController
export default cartController