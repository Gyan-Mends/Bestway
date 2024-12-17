import { Button, Input } from "@nextui-org/react";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import CartIcon from "~/components/icons/CartIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import MinusIcon from "~/components/icons/MinusIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { SearchIcon } from "~/components/icons/SearchIcon";
import ConfirmModal from "~/components/modal/confirmModal";
import EditModal from "~/components/modal/EditModal";
import { errorToast, successToast } from "~/components/toast";
import cartController from "~/controllers/cart";
import productsController from "~/controllers/productsController";
import salesController from "~/controllers/sales";
import { CartInterface, ProductInterface, RegistrationInterface } from "~/interfaces/interface";
import AttendantLayout from "~/layout/attendantLayout";
import emptyCart from "~/components/illustration/Empty-pana.png";
import usersController from "~/controllers/Users";
import { getSession } from "~/session";

const Sales = () => {
    const { products, user, carts, totalQuantity, totalPrice } = useLoaderData<{
        products: ProductInterface[],
        user: RegistrationInterface[],
        carts: CartInterface[],
        totalQuantity: number,
        totalPrice: number
    }>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuppliers, setFilteredSuppliers] = useState(products);
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
    const [isCheckOutModalOpened, setIsCheckOutModalOpened] = useState(false);
    const [dataValue, setDataValue] = useState<ProductInterface>();
    const [cartDataValue, setCartDataValue] = useState<CartInterface>();
    const [quantity, setQuantity] = useState(1);
    const [CartItemNewPrice, setCartItemNewPrice] = useState(0);
    const actionData = useActionData<any>();
    const submit = useSubmit();
    const [totalCost] = useState(totalPrice); // Total cost of cart items
    const [amountPaid, setAmountPaid] = useState(''); // Amount paid by the customer
    const [balance, setBalance] = useState(0); // Remaining balance
    const [isPartialPayment, setIsPartialPayment] = useState(false);
    const navigate = useNavigate()

    const mm = carts.reduce((acc, cart) => {
        return acc + Number(cart.price); // Ensure quantity is treated as a number
    }, 0);
    const handleAmountPaidChange = (event: any) => {
        const paid = parseFloat(event.target.value) || 0;
        setAmountPaid(event.target.value);
        setBalance(paid - totalCost);
    };

    const handleEditModalClose = () => {
        setIsEditModalOpened(false);
    };
    const handleConfirmModalClosed = () => {
        setIsConfirmModalOpened(false);
    };
    const handleCheckOutModalClosed = () => {
        setIsCheckOutModalOpened(false);
    };

    useEffect(() => {
        const filtered = products.filter(product => {
            const lowerCaseQuery = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(lowerCaseQuery)
            );
        });
        setFilteredSuppliers(filtered);
    }, [searchQuery, products]);
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    // Function to generate receipt content
    const generateReceiptContent = () => {
        let receipt = `
            <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .receipt-container { padding: 20px; }
                        .receipt-header, .receipt-footer { text-align: center; }
                        .receipt-items { margin-top: 20px; }
                        .item { display: flex; justify-content: space-between; }
                        .total { font-weight: bold; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="receipt-container">
                        <div class="receipt-header">
                            <h2>Receipt</h2>
                            <p>Thank you for your purchase!</p>
                        </div>
                        <div class="receipt-items">
        `;

        carts.forEach((cart) => {
            receipt += `
                <div class="item">
                    <span>${cart.product.name}</span>
                    <span>${cart.quantity} x ${cart.price} = Ghc ${cart.quantity * cart.price}</span>
                </div>
            `;
        });

        receipt += `
                </div>
                <div class="total">
                    <div class="item">
                        <span>Total Quantity</span>
                        <span>${totalQuantity}</span>
                    </div>
                    <div class="item">
                        <span>Total Amount</span>
                        <span>Ghc ${totalPrice}</span>
                    </div>
                    <div classname="text-primary" class="item">
                        <span>Amount Paid</span>
                        <span>Ghc ${amountPaid}</span>
                    </div>
                    <div class="item">
                        <span>Balance</span>
                        <span>Ghc ${balance}</span>
                    </div>
                </div>
                <div class="receipt-footer">
                    <p>Attendant: ${user?.firstName + " " + user.middleName + " " + user.lastName}</p>
                    <p>Date: ${new Date().toLocaleString()}</p>
                </div>
            </div>
            </body>
        </html>
        `;

        return receipt;
    };

    return (
        <AttendantLayout pageName="Sales Point">
            <Toaster position="top-center" />
            <div className="lg:grid lg:grid-cols-3 gap-10 mt-6">
                <div className="col-span-2 h-[85vh]">
                    {/* search */}
                    <div>
                        <Input
                            size="md"
                            placeholder="Search product..."
                            startContent={<SearchIcon className="" />}
                            onValueChange={(value) => {
                                const timeoutId = setTimeout(() => {
                                    navigate(`?search_term=${value}`);
                                }, 100);
                                return () => clearTimeout(timeoutId);
                            }}
                            classNames={{
                                inputWrapper: " lg:w-80 dark:bg-[#333] bg-white border border-white/5 hover:bg-slate-800",
                            }}
                        />
                    </div>

                    {/* product items */}
                    <div className="lg:grid lg:grid-cols-4 gap-10 overflow-y-scroll scrollbar-thin dark:scrollbar-thin pr-8
                 h-[76vh] rounded-lg overflow-x-hidden">
                        {products.map((products: ProductInterface, index: number) => (
                            <div
                                className="lg:w-[13vw] rounded-lg p-2 lg:h-[30vh] mt-4 dark:bg-[#333] bg-white border border-white/5"
                                key={index}
                                onClick={() => {
                                    setIsEditModalOpened(true);
                                    setDataValue(products);
                                }}
                            >
                                <div className="h-[19vh] w-full overflow-hidden">
                                    <img
                                        className="rounded-lg hover:rounded-lg h-[19vh] w-full transform transition-transform duration-500 hover:scale-110"
                                        src={products?.image}
                                        alt=""
                                    />
                                </div>
                                <p className="font-nunito mt-4 text-sm">{products?.name}</p>
                                <div className="flex justify-between">
                                    <p className="font-nunito mt-4 text-xl text-success">GHC {products?.price}</p>
                                    <p className="font-nunito mt-4 text-sm">{products?.quantity} items</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                {/* Items added to cart */}
                <Form method="post">
                    <div className="h-[85vh] border border-white/5 rounded-xl dark:bg-[#333] flex flex-col justify-between">
                        <div className="h-[53vh] overflow-y-scroll px-2 scrollbar-thin dark:darkscrollbar-thin">
                            {/* Render Cart Items */}
                            {carts.length === 0 ? (
                                <div className="w-full h-full flex justify-center items-center">
                                    <div>
                                        <img src={emptyCart} className="h-60 w-60" alt="No Cart Item" />
                                        <p className="font-nunito text-2xl">No Cart Item Found</p>
                                    </div>
                                </div>
                            ) : (
                                    carts.map((cart: CartInterface, index: number) => (
                                        <div key={index} className="px-4 h-20 w-full bg-white dark:bg-[#191919] border border-white/5 mt-4 rounded-lg p-2 flex gap-10">
                                            <div className="h-16 w-20">
                                                <img className="h-16 w-20 rounded-lg" src={cart?.product?.image} alt={cart.product.name} />
                                            </div>
                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex justify-between">
                                                    <p className="font-nunito text-lg">{cart?.product?.name}</p>
                                                    <button
                                                        className="text-danger"
                                                        type="button"
                                                        onClick={() => {
                                                            setIsConfirmModalOpened(true);
                                                            setCartDataValue(cart);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="font-nunito text-sm">
                                                        {cart?.quantity === 1 ? `${cart.quantity} item` : `${cart.quantity} items`}
                                                    </p>
                                                    <p className="font-nunito text-md">Ghc {cart?.price}</p>
                                                </div>
                                            </div>
                                            {/* Hidden Inputs for Form */}
                                            <input name="quantity" type="hidden" value={cart.quantity} />
                                            <input name="product" type="hidden" value={cart.product._id} />
                                        </div>
                                    ))
                            )}
                        </div>
                        <div className="dark:bg-[#191919] bg-white border border-white/5 h-60 flex flex-col justify-between rounded-bl-xl rounded-br-xl px-10 py-4 dark:text-white">
                            <div>
                                <div className="flex justify-between">
                                    <p className="text-md font-nunito">Quantity</p>
                                    <p className="text-md font-nunito">{totalQuantity}</p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <p className="text-md font-nunito">Total Amount</p>
                                    <p className="text-md font-nunito">Ghc {totalPrice}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {/* Amount Paid Input */}
                                <Input
                                    type="number"
                                    id="amountPaid"
                                    value={amountPaid}
                                    onChange={handleAmountPaidChange}
                                    name="amountPaid"
                                />
                                {/* Balance Display */}
                                <Input
                                    id="balance"
                                    value={balance}
                                    readOnly
                                    name="balance"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-2">
                                    <Input
                                        type="text"
                                        id="customerName"
                                        placeholder="Enter customer name"
                                        name="customerName"
                                        className="mt-4"
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        id="customerNumber"
                                        placeholder="Number"
                                        name="customerNumber"
                                        className="mt-4"
                                    />
                                </div>
                            </div>
                            <div className="flex mt-4 items-center justify-center gap-4">
                                {/* Checkout Button */}
                                {carts.length === 0 ? (
                                    <button
                                        className="w-80 h-10 bg-danger rounded-xl flex items-center justify-center gap-2 bg-opacity-20 text-danger font-nunito text-xl"
                                        color="primary"
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        No cart item found
                                    </button>
                                ) : (
                                    <>
                                            <button
                                                className="w-80 h-10 bg-primary rounded-xl flex items-center justify-center gap-2 bg-opacity-20 text-primary font-nunito text-xl"
                                                color="primary"
                                                type="button"
                                                onClick={() => setIsCheckOutModalOpened(true)}
                                            >
                                                {isPartialPayment ? 'Proceed with Part Payment' : 'Checkout'}
                                            </button>

                                            {/* Confirm Checkout Modal */}
                                            <ConfirmModal
                                                className=""
                                                header="Confirm Checkout"
                                                content="Are you sure you want to proceed with the checkout?"
                                                isOpen={isCheckOutModalOpened}
                                                onOpenChange={handleCheckOutModalClosed}
                                            >
                                                <div className="flex gap-4">
                                                    <Button
                                                        color="primary"
                                                        variant="flat"
                                                        className="font-nunito text-md"
                                                        onPress={handleCheckOutModalClosed}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        color="success"
                                                        variant="flat"
                                                        className="font-nunito text-md"
                                                        onPress={() => {
                                                            handleConfirmModalClosed();
                                                            document.querySelector("form")?.submit();
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </ConfirmModal>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Hidden Fields */}
                        <input type="hidden" name="attendant" value={user._id} />
                        <input type="hidden" name="intent" value="addCartToSales" />
                        <input type="hidden" name="totalAmount" value={totalPrice} />
                    </div>
                </Form>

            </div>
            <ConfirmModal className="" header="Confirm Remove" content="Are you sure to remove item from cart? " isOpen={isConfirmModalOpened} onOpenChange={handleConfirmModalClosed}>
                <div className="flex gap-4">
                    <Button color="primary" variant="flat" className="font-nunito text-md" onPress={handleConfirmModalClosed}>
                        No
                    </Button>
                    <Button color="danger" variant="flat" className="font-nunito text-md" onClick={() => {
                        setIsConfirmModalOpened(false);
                        if (cartDataValue) {
                            submit({
                                intent: "delete",
                                id: cartDataValue?._id
                            }, {
                                method: "post"
                            });
                        }
                    }}>
                        Yes
                    </Button>
                </div>
            </ConfirmModal>

            <EditModal modalTitle="" className="dark:bg-slate-800 bg-white" onOpenChange={handleEditModalClose} isOpen={isEditModalOpened}>
                {(onClose) => (
                    <Form method="post">
                        <div className="flex flex-col justify-center">
                            <input type="hidden" name="quantity" value={quantity} />
                            <input type="hidden" name="attendant" value={user?._id} />
                            <input type="hidden" name="product" value={dataValue?._id} />
                            <input type="" name="costprice" value={dataValue?.costPrice} />
                            <input type="hidden" name="price" value={dataValue?.price} />
                            <input type="hidden" name="intent" value="addToCart" />
                            <p className="text-2xl font-nunito">{dataValue?.name}</p>
                            <p className="text-xl font-nunito mt-4">GHC {dataValue?.price}</p>
                        </div>
                        <div className="flex justify-start gap-8 mt-10 font-nunito">
                            <Button color="danger" className="h-20" variant="flat" onClick={() => {
                                setQuantity(quantity - 1);
                            }}>
                                <MinusIcon className="h-60 w-60" />
                            </Button>
                            <div className="flex items-center justify-center">
                                <p>{quantity}</p>
                            </div>
                            <Button color="success" className="h-20" variant="flat" onClick={() => {
                                setQuantity(quantity + 1);
                            }}>
                                <PlusIcon className="h-60 w-60" />
                            </Button>
                        </div>
                        <button className="mt-10 bg-primary rounded-xl flex items-center justify-center gap-2 bg-opacity-20 text-primary h-16 w-60 font-nunito text-xl" onClick={() => {
                            setCartItemNewPrice(quantity * dataValue?.price);
                            setIsEditModalOpened(false);
                        }}>
                            <CartIcon className="h-6 w-6" /> Add To Cart
                        </button>
                    </Form>
                )}
            </EditModal>
        </AttendantLayout>
    );
};

export default Sales;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const quantity = formData.get("quantity") as string;
    const product = formData.get("product") as string;
    const costprice = formData.get("costprice") as string;
    const attendant = formData.get("attendant") as string;
    const price = formData.get("price") as string;
    const intent = formData.get("intent") as string;
    const id = formData.get("id") as string;
    const balance = formData.get("balance") as string;
    const amountPaid = formData.get("amountPaid") as string;
    const customerName = formData.get("customerName") as string;
    const customerNumber = formData.get("customerNumber") as string;
    const totalAmount = formData.get("totalAmount") as string;

    switch (intent) {
        case "addCartToSales":
            const addSales = await salesController.AddCartToSales({
                intent,
                request,
                product,
                attendant,
                quantity,
                totalAmount,
                amountPaid,
                balance,
                costprice,
                price,
                customerName,
                customerNumber
            });
            return addSales;

        case "addToCart":
            const cart = await cartController.AddToCart({
                request,
                intent,
                quantity,
                product,
                attendant,
                price,
            });
            return cart;
        case "logout":
            const logout = await usersController.logout(intent)
            return logout

        case "delete":
            const deleteItem = await cartController.DeleteItem({ id, intent, product, quantity });
            return deleteItem;
        default:
            break;
    }
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/")
    }

    const { products, user } = await productsController.FetchProducts({
        request,
        page,
        search_term
    });

    const { carts, totalQuantity, totalPrice } = await cartController.FetchCart(request);
    console.log(user);


    return { products, user, carts, totalQuantity, totalPrice };



    
};
