import React from "react";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import handleLogout from "@/utils/auth";

const DashboardHeader = () => {
	return (
		<div className="flexBetween max-container padding-container relative z-30 py-5">
			<Link href="/">
				<Image
					src="/logo.png"
					alt="Logo"
					width={50}
					height={29}
					priority={true}
				/>
			</Link>
			<Button variant="btn_gray" title="Logout" onClick={handleLogout} />
		</div>
	);
};

export default DashboardHeader;
