import { json } from "@remix-run/node"
import Registration from "~/modal/registration"
import { getSession } from "~/session"
import bcrypt from 'bcryptjs'; // Import bcrypt
import Suppliers from "~/modal/suppliers";
import { RegistrationInterface, SuppliersInterface } from "~/interfaces/interface";


class SuppliersController {
    async CreateSupplier(
        {
            firstName,
            middleName,
            lastName,
            email,
            admin,
            phone,
            intent,
        }: {
            firstName: string,
            middleName: string,
            lastName: string,
            email: string,
            admin: string,
            phone: string,
            intent: string,
        }) {

        try {
            if (intent === "create") {
                // checking if user exist
                const UserCheck = await Suppliers.findOne({ email: email })
                const phoneNumberCheck = await Suppliers.findOne({ phone: phone })

                if (UserCheck) {
                    return json({
                        message: "Supplier with this email already exist",
                        success: false,
                        status: 500
                    })
                }else if(phoneNumberCheck) {
                    return  json({
                        message: "Phone Number already exist",
                        success: false
                    })
                } else {

                    const user = new Suppliers({
                        firstName,
                        middleName,
                        lastName,
                        email,
                        admin,
                        phone,
                    })

                    // saving user details
                    const saveUserDetails = await user.save()

                    if (saveUserDetails) {
                        return json({
                            message: "Supplier created successfully",
                            success: true,
                            status: 500
                        })
                    } else {
                        return json({
                            message: "Unable to create Supplier",
                            success: false,
                            status: 500
                        })
                    }
                }

            } else {
                return json({
                    message: "wrong intent",
                    success: false,
                    status: 400
                })
            }
        } catch (error: any) {
            return json({
                message: error.message,
                success: false,
                status: 500
            })
        }
    }

    async DeleteSupplier(
        {
            intent,
            id,
        }: {
            intent: string,
            id: string,
        }
    ) {
        if (intent === "delete") {
            const deleteUser = await Suppliers.findByIdAndDelete(id);
            if (deleteUser) {
                return json({
                    message: "Supplier delete successfully",
                    success: true,
                    status: 500,
                })
            } else {
                return json({
                    message: "Unable to delete Supplier",
                    success: false,
                    status: 500
                })
            }
        }
    }

    async UpdateSupplier(
        {
            firstName,
            middleName,
            lastName,
            email,
            admin,
            phone,
            id,
            intent,
        }: {
            firstName: string,
            middleName: string,
            lastName: string,
            email: string,
            admin: string,
            phone: string,
            id: string,
            intent: string,
        }) {
        try {
            if (intent === "update") {
                const updateUser = await Suppliers.findByIdAndUpdate(id, {
                    firstName,
                    middleName,
                    lastName,
                    email,
                    phone,

                })

                if (updateUser) {
                    return json({
                        message: "Supplier updated successfully",
                        success: true,
                        status: 500
                    })
                } else {
                    return json({
                        message: "Unable to update this record",
                        success: false,
                        status: 500
                    })
                }
            } else {
                return json({
                    message: "wrong intent",
                    success: false,
                    status: 500
                })
            }


        } catch (error: any) {
            return json({
                message: error.message,
                success: false,
                status: 500
            })
        }
    }

    async FetchSuppliers({
        request,
        page,
        search_term,
        limit = 9
    }: {
        request: Request,
        page: number;
        search_term: string;
        limit?: number;
    }):Promise<{user:RegistrationInterface[]; totalPages:number;suppliers:SuppliersInterface[],supplierCount:number} | any> {
        const skipCount = (page - 1) * limit; // Calculate the number of documents to skip

        // Define the search filter only once
        const searchFilter = search_term
            ? {
                $or: [
                    {
                        firstName: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        middleName: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        lastName: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        email: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                    {
                        phone: {
                            $regex: new RegExp(
                                search_term
                                    .split(" ")
                                    .map((term) => `(?=.*${term})`)
                                    .join(""),
                                "i"
                            ),
                        },
                    },
                ],
            }
            : {};
        try {
            const session = await getSession(request.headers.get("Cookie"));
            const token = session.get("email");
            const user = await Registration.findOne({ email: token });

            const totalSuppliers = await Suppliers.countDocuments(searchFilter).exec();
            const totalPages = Math.ceil(totalSuppliers/limit);

            const suppliers = await   Suppliers.find(searchFilter)
            .skip(skipCount)
            .limit(limit)
            .exec()


            return { user,suppliers,totalPages }
            
        } catch (error: any) {
            return json({
                message: error.message,
                success: true,
                status: 500
            })
        }
    }
}

const suppliersController = new SuppliersController
export default suppliersController