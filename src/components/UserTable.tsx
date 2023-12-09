import React, { useEffect, useState } from "react";
import { User } from "@/types/types";
import axios from "axios";
import TableRow from "./TableRow";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const UserTable = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [totalPages, setTotalPages] = useState<number>(0);
	const router = useRouter();

	const fetchUsers = async (currentPage: number = 1) => {
		try {
			const response = await axios.get<{
				data: User[];
				total_pages: number;
			}>(`https://reqres.in/api/users?page=${currentPage}`);

			setUsers(response.data.data);
			setTotalPages(response.data.total_pages);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			// Alert.alert("Error fetching data:", error.toString());
		}
	};

	useEffect(() => {
		const page = parseInt(router.query.page as string, 10) || 1;
		fetchUsers(page);
	}, [router.query.page]);

	const handlePageClick = (event: { selected: number }) => {
		const newPage = event.selected + 1;
		router.push(`?page=${newPage}`, undefined, { shallow: true });
	};

	console.log(users, "users");

	return (
		<div className="shadow-lg rounded-lg">
			<table className="w-full table-fixed">
				<thead>
					<tr className="bg-gray-100">
						<th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">
							ID
						</th>
						<th className="w-5/12 py-4 px-6 text-left text-gray-600 font-bold uppercase">
							Full Name
						</th>

						<th className="w-5/12 py-4 px-6 text-left text-gray-600 font-bold uppercase">
							Email
						</th>
						<th className="w-1/6 py-4 px-6 text-left text-gray-600 font-bold uppercase">
							Photo
						</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{users.map((user) => (
						<TableRow user={user} key={user.id} />
					))}
				</tbody>
			</table>
			{!loading && (
				<div className="py-3 px-4">
					<ReactPaginate
						previousLabel={"Previous"}
						nextLabel={"Next"}
						breakLabel={"..."}
						pageCount={totalPages}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={handlePageClick}
						containerClassName="flex list-none justify-center"
						pageClassName="mx-1"
						pageLinkClassName="block py-2 px-3 leading-tight bg-white text-teal-500 hover:bg-gray-100"
						activeClassName="bg-teal-500 text-white"
						previousClassName="mx-1"
						nextClassName="mx-1"
						previousLinkClassName="block py-2 px-3 rounded-full leading-tight bg-white border border-gray-300 text-teal-500 hover:bg-gray-100"
						nextLinkClassName="block py-2 px-3 rounded-full leading-tight bg-white border border-gray-300 text-teal-500 hover:bg-gray-100"
						breakClassName="mx-1"
						breakLinkClassName="block py-2 px-3 leading-tight bg-white border border-gray-300 text-teal-500"
						disabledClassName="opacity-50 cursor-disabled"
					/>
				</div>
			)}
		</div>
	);
};

export default UserTable;
