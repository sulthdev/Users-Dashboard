import { User } from "@/types/types";
import Image from "next/image";
import React from "react";

type Props = {
	user: User;
};
const TableRow = ({ user }: Props) => {
	return (
		<tr>
			<td className="py-4 px-6 border-b border-gray-200">{user.id}</td>
			<td className="py-4 px-6 border-b border-gray-200 truncate">
				{`${user.first_name} ${user.last_name}`}
			</td>
			<td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
			<td className="py-4 px-6 border-b border-gray-200">
				<Image
					className="rounded-full"
					src={user.avatar}
					alt={`${user.first_name} ${user.last_name}`}
					width={45}
					height={45}
				/>
			</td>
		</tr>
	);
};

export default TableRow;
