import { useState, useEffect } from "react";
import AdminLayout from "~/layout/adminLayout";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Button, Calendar, Input, TableCell, TableRow } from "@nextui-org/react";
import Attendant from "~/layout/attendantLayout";
import attendanceDashboardController from "~/controllers/AttendanceDashBoardController";
import CustomedCard from "~/components/ui/CustomedCard";
import ProductIcon from "~/components/icons/ProductsIcon";
import CustomTable from "~/components/table/table";
import { SalesColumns } from "~/components/table/columns";
import { SalesInterface } from "~/interfaces/interface";
import { today, getLocalTimeZone } from "@internationalized/date";
import productsController from "~/controllers/productsController";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SaleIcon from "~/components/icons/Sales";
import adminDashboardController from "~/controllers/AdminDashBoardController";
import { getSession } from "~/session";
import adminReportController from "~/controllers/AdminReportControler";
import EditModal from "~/components/modal/EditModal";
import { SearchIcon } from "~/components/icons/SearchIcon";


const Report = () => {
    const {
        sales,
        counts,
        dailyTotal,
        weeklyTotal,
        monthlyTotal,
        yearlyTotal,
        totalAmountPaid,
        weeklytotalAmountPaid,
        monthlytotalAmountPaid,
        yearlytotalAmountPaid,
        dailyAmountToBePaid,
        weeklyAmountToBePaid,
        monthlyAmountToBePaid,
        yearlyAmountToBePaid } = useLoaderData<{
            sales: SalesInterface[];
            dailyTotal: number,
            weeklyTotal: number,
            monthlyTotal: number,
            yearlyTotal: number,
            totalAmountPaid: number
            weeklytotalAmountPaid: number
            monthlytotalAmountPaid: number
            yearlytotalAmountPaid: number
            dailyAmountToBePaid: number
            weeklyAmountToBePaid: number
            monthlyAmountToBePaid: number
            yearlyAmountToBePaid: number
            counts: { daily: number; weekly: number; monthly: number; yearly: number };
        }>();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpened, setIsEditModalOpened] = useState(false)
    const [dataValue, setDataValue] = useState<SalesInterface>();
    const navigate = useNavigate()

    const handleEditModalClosed = () => {
        setIsEditModalOpened(false)
    }

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const dailySalesReport = [
        { name: " Sales Quant", total: counts.daily },
        { name: " Sales Total", total: dailyTotal },
        { name: "Amount Paid", total: totalAmountPaid },
        { name: "Unpaid Amount", total: dailyAmountToBePaid },
    ];
    const weeklySalesReport = [
        { name: " Sales Quant", total: counts.weekly },
        { name: " Sales Total", total: weeklyTotal },
        { name: "Amount Paid", total: weeklytotalAmountPaid },
        { name: "Unpaid Amount", total: weeklyAmountToBePaid },
    ];
    const monthlySalesReport = [
        { name: " Sales Quant", total: counts.monthly },
        { name: " Sales Total", total: monthlyTotal },
        { name: "Amount Paid", total: monthlytotalAmountPaid },
        { name: "Unpaid Amount", total: monthlyAmountToBePaid },
    ];
    const yearlySalesReport = [
        { name: " Sales Quant", total: counts.yearly },
        { name: " Sales Total", total: yearlyTotal },
        { name: "Amount Paid", total: yearlytotalAmountPaid },
        { name: "Unpaid Amount", total: yearlyAmountToBePaid },
    ];

    return (
        <AdminLayout pageName="Report">
            <div>
                <div>
                    <p className="font-nunito text-2xl">Daily Sales Report</p>
                </div>
                {/* Statistics Cards */}
                <div className="mt-6 lg:grid lg:grid-cols-4 gap-4">
                    <CustomedCard
                        title=" Sales Quantity"
                        total={counts.daily}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={"GHC " + dailyTotal}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title="Paid Amount"
                        total={totalAmountPaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title="Unpaid Amount"
                        total={dailyAmountToBePaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                </div>

                <div className=" mt-6 gap-10">
                    <div className="">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={dailySalesReport}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#ffffff" />
                                <YAxis stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#333",
                                        border: "1px solid #555",
                                    }}
                                    labelStyle={{ color: "#ffffff" }}
                                    itemStyle={{ color: "#ffffff" }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#4caf50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>


            <div className="mt-20">
                <div>
                    <p className="font-nunito text-2xl">Weekly  Sales Report</p>
                </div>
                {/* Statistics Cards */}
                <div className="mt-6 lg:grid lg:grid-cols-4 gap-4">
                    <CustomedCard
                        title="Daily Sales"
                        total={counts.weekly}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={"GHC " + weeklyTotal}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={weeklytotalAmountPaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title="Unpaid Amount"
                        total={weeklyAmountToBePaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                </div>

                <div className=" mt-6 gap-10">
                    <div className="">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={weeklySalesReport}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#ffffff" />
                                <YAxis stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#333",
                                        border: "1px solid #555",
                                    }}
                                    labelStyle={{ color: "#ffffff" }}
                                    itemStyle={{ color: "#ffffff" }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#4caf50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>


            <div className="mt-20">
                <div>
                    <p className="font-nunito text-2xl">Monthly  Sales Report</p>
                </div>
                {/* Statistics Cards */}
                <div className="mt-6 lg:grid lg:grid-cols-4 gap-4">
                    <CustomedCard
                        title="Daily Sales"
                        total={counts.monthly}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={"GHC " + monthlyTotal}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={monthlytotalAmountPaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title="Unpaid Amount"
                        total={monthlyAmountToBePaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                </div>

                <div className=" mt-6 gap-10">
                    <div className="">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={monthlySalesReport}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#ffffff" />
                                <YAxis stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#333",
                                        border: "1px solid #555",
                                    }}
                                    labelStyle={{ color: "#ffffff" }}
                                    itemStyle={{ color: "#ffffff" }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#4caf50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>


            <div className="mt-20">
                <div>
                    <p className="font-nunito text-2xl">Yearly  Sales Report</p>
                </div>
                {/* Statistics Cards */}
                <div className="mt-6 lg:grid lg:grid-cols-4 gap-4">
                    <CustomedCard
                        title="Daily Sales"
                        total={counts.yearly}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={"GHC " + yearlyTotal}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title=" Sales Amount"
                        total={yearlytotalAmountPaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                    <CustomedCard
                        title="Unpaid Amount"
                        total={yearlyAmountToBePaid}
                        icon={<SaleIcon className="h-[20px] w-[20px] text-success" />}
                    />
                </div>

                <div className=" mt-6 gap-10">
                    <div className="">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={yearlySalesReport}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#ffffff" />
                                <YAxis stroke="#ffffff" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#333",
                                        border: "1px solid #555",
                                    }}
                                    labelStyle={{ color: "#ffffff" }}
                                    itemStyle={{ color: "#ffffff" }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="total" stroke="#4caf50" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

            {/* Recent Sales Table */}
            <div className="mb-5 grid grid-cols-1 gap-10">
                <Input
                    size="sm"
                    placeholder="Search user..."
                    startContent={<SearchIcon className="" />}
                    onValueChange={(value) => {
                        const timeoutId = setTimeout(() => {
                            navigate(`?search_term=${value}`);
                        }, 100);
                        return () => clearTimeout(timeoutId);
                    }} classNames={{
                        inputWrapper: "bg-white w-60 shadow-sm text-sm font-nunito dark:bg-[#333] border border-white/5 ",
                    }}
                />
                <div className="px-2  shadow-md rounded-xl border border-black/5 dark:bg-[#333] dark:border-white/5 mt-6">
                    <CustomTable
                        columns={SalesColumns}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    >
                        {sales.map((sale: SalesInterface, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{sale._id}</TableCell>
                                <TableCell>
                                    {sale?.attendant?.firstName} {sale?.attendant?.middleName}
                                </TableCell>
                                <TableCell>GHC {sale?.totalAmount}</TableCell>
                                <TableCell>GHC {sale?.amountPaid}</TableCell>
                                <TableCell>GHC {sale?.amountLeft}</TableCell>
                                <TableCell>GHC {sale?.balance}</TableCell>
                                <TableCell className="relative flex items-center gap-4">
                                    <Button
                                        size="sm"
                                        color="success"
                                        variant="flat"
                                        onClick={() => {
                                            setIsEditModalOpened(true)
                                            setDataValue(sale)
                                        }}
                                    >
                                        View Customer Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </CustomTable>

                    <EditModal modalTitle="Sale Payment" className="" onOpenChange={handleEditModalClosed} isOpen={isEditModalOpened}>
                        {(onClose) => (
                            <Form method="post" action="">
                                <p> {dataValue?.payments.map((payment: SalesInterface, i: number) => (
                                    <div className='flex flex-col gap-4' key={i}>
                                        <p className='font-nunito'>Customer Name: {payment.customerName}</p>
                                        <p className='font-nunito'>Customer Phone: {payment.customerNumber}</p>
                                    </div>
                                ))}</p>
                            </Form>
                        )}
                    </EditModal>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Report;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const intent = formData.get("intent") as string;

    switch (intent) {
        case "logout":
            const logout = await adminDashboardController.logout(intent)
            return logout

        default:
            return json({
                message: "Bad request",
                success: false,
                status: 500
            })
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const search_term = url.searchParams.get("search_term") as string
    const { user } = await productsController.FetchProducts({
        request,
        page,
    });

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    if (!token) {
        return redirect("/")
    }
    const {

        sales
    } = await adminDashboardController.getSales({
        request,
        page,
        search_term
    });


    const {

        counts,
        dailyTotal,
        weeklyTotal,
        monthlyTotal,
        yearlyTotal,
        totalAmountPaid,
        weeklytotalAmountPaid,
        monthlytotalAmountPaid,
        yearlytotalAmountPaid,
        dailyAmountToBePaid,
        weeklyAmountToBePaid,
        monthlyAmountToBePaid,
        yearlyAmountToBePaid } = await adminReportController.getSales({
            request,
            page,
            limit: 10,
        });

    return {
        sales,
        counts,
        user,
        dailyTotal,
        weeklyTotal,
        monthlyTotal,
        yearlyTotal,
        totalAmountPaid,
        dailyAmountToBePaid,
        weeklytotalAmountPaid,
        monthlytotalAmountPaid,
        yearlytotalAmountPaid,
        weeklyAmountToBePaid,
        monthlyAmountToBePaid,
        yearlyAmountToBePaid,
    };
};
