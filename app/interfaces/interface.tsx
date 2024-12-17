import { Schema } from "mongoose";

export interface RegistrationInterface {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    role: string,
    admin: string,
    image: string,
}
export interface SuppliersInterface {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phone: string,
    admin: string,
}

export interface CategoryInterface {
    _id: string;
    name: string
    description: string
    seller: string
}

export interface ProductInterface {
    products:string
    _id: string,
    name: string,
    costPrice: string,
    price: number,
    quantity: number,
    category: string,
    image: string,
    low_stock: string,
    description: string
    seller: string
    totalProductAmount: number,
    totalProductAmountAfterSales: number,
    profitAfterSales: number,
}
export interface RestockInterface {
    _id: string,
    quantity: number,
    description: string
}
export interface CartInterface {
    _id: string,
    name: string,
    quantity: string,
    new_stock: string,
    user: string,
    product: string
}
export interface SalesInterface {
    _id:string
    product: ProductInterface;
    costPrice: ProductInterface;
    quantity: number;
    attendant: RegistrationInterface;
    totalAmount: string;
    amountPaid: string;
    amountLeft: string;
    payments: string;
    balance: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export interface RefundInterface {
    _id:string
    product: ProductInterface;
    quantity: number;
    attendant: RegistrationInterface;
    totalAmount: string;
    amountPaid: string;
    balance: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}