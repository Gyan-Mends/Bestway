import { Button, Input, Textarea } from "@nextui-org/react"
import PublicLayout from "~/layout/PublicLayout"
import headphone from "../components/illustration/headphone.png";
import MinusIcon from "~/components/icons/MinusIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { Form } from "@remix-run/react";


const Carts = () => {
    const carts = [
        {
            image: headphone,
            name: "Product name",
            price: "$6990"
        },
        {
            image: headphone,
            name: "Product name",
            price: "$6990"
        },
        {
            image: headphone,
            name: "Product name",
            price: "$6990"
        },

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

            <section className="mt-20 lg:grid lg:grid-cols-3 gap-20">
                <div className="col-span-2">
                    <p className="font-nunito text-[40px] font-bold">Billing Details</p>

                    <Form className="mt-10 flex flex-col gap-4">
                        <div className="flex gap-10">
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="First Name"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="First Name"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />

                        </div>
                        <div className="flex gap-10">
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="Country"
                                defaultValue="Ghana"
                                readOnly
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="City"
                                defaultValue="Akropong"
                                readOnly
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />

                        </div>
                        <div className="flex gap-10">
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="Street"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="House"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />

                        </div>
                        <div className="flex gap-10">
                            <Textarea
                                variant="bordered"
                                className="max-w-lg "
                                label="Order Note"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    input: "resize-y min-h-[100px]",

                                }}
                            />

                        </div>

                        <div className="flex gap-10">
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="Phone"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />
                            <Input
                                variant="bordered"
                                className="h-14"
                                label="Email"
                                placeholder=" "
                                labelPlacement="outside"
                                classNames={{
                                    label: "font-nunito",
                                    inputWrapper: "h-12"
                                }}
                            />

                        </div>
                    </Form>
                </div>
                <div className="border rounded-2xl border-2 w-full px-8 py-10 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between">
                            <p className="font-nunito text-xl font-bold">Total</p>
                            <p className="font-nunito text-xl font-bold">$299</p>
                        </div><hr className="mt-10" /></div>
                    <Button color="primary" className="mt-10 w-full h-14 font-nunito text-lg">Proceed To CheckOut</Button>
                </div>
            </section>
        </PublicLayout>
    )
}

export default Carts