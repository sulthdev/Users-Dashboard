import DashboardHeader from "@/components/DashboardHeader";
import UserTable from "@/components/UserTable";
import React from "react";

const Dashboard = () => {
	return (
		<>
			<DashboardHeader />
			<div className="max-container padding-container">
				<UserTable />
			</div>
		</>
	);
};
export default Dashboard;
