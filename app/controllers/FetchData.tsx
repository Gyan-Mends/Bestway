// import { fetchData } from "@remix-run/react/dist/data";

// class FetchData{
//     public async getCompanys({
//         page,
//         search_term,
//         limit = 10,
//       }: {
//         page: number;
//         search_term?: string;
//         limit?: number;
//       }): Promise<{ companys: CompanyInterface[]; totalPages: number } | any> {
//         const session = await getFlashSession(this.request.headers.get("Cookie"));
    
//         const skipCount = (page - 1) * limit;
    
//         const searchFilter = search_term
//           ? {
//               $or: [
//                 {
//                   name: {
//                     $regex: new RegExp(
//                       search_term
//                         .split(" ")
//                         .map((term) => `(?=.*${term})`)
//                         .join(""),
//                       "i"
//                     ),
//                   },
//                 },
//                 {
//                   description: {
//                     $regex: new RegExp(
//                       search_term
//                         .split(" ")
//                         .map((term) => `(?=.*${term})`)
//                         .join(""),
//                       "i"
//                     ),
//                   },
//                 },
//               ],
//             }
//           : {};
    
//         try {
//           const companys = await Company.find(searchFilter)
//             .skip(skipCount)
//             .populate("commandingOfficer")
//             .populate("companySeargent")
//             .populate("platoonCommander")
//             .populate("administrationWarranty")
//             .limit(limit)
//             .sort({
//               createdAt: "desc",
//             })
//             .exec();
    
//           const totalCompanysCount = await Company.countDocuments(
//             searchFilter
//           ).exec();
//           const totalPages = Math.ceil(totalCompanysCount / limit);
    
//           return { companys, totalPages };
//         } catch (error) {
//           console.log(error);
//           session.flash("alert", {
//             title: "Error!",
//             status: "error",
//             message: "Error retrieving companys",
//           });
    
//           return redirect(this.path, {
//             headers: {
//               "Set-Cookie": await commitFlashSession(session),
//             },
//           });
//         }
//       }
// }

// const fetchData = new FetchData()
// export default fetchData