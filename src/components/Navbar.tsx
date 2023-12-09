import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useAuth } from "@/context/authContext";
import handleLogout from "@/utils/auth";

const Navbar = () => {
	const { isAuthenticated } = useAuth();
	return (
		<nav className="flexBetween max-container padding-container relative z-30 py-5">
			<div className="left flexCenter gap-11">
				<Link href="/">
					<Image
						src="/logo.png"
						alt="Logo"
						width={55}
						height={29}
						priority={true}
					/>
				</Link>
				<ul className="hidden h-full gap-8 lg:flex">
					{NAV_LINKS.map((link) => (
						<Link
							href={link.href}
							key={link.key}
							className="regular text-gray-50 flexCenter cursor-pointer transition-all hover:font-medium"
						>
							{link.label}
						</Link>
					))}
				</ul>
			</div>
			<div className="right flexCenter gap-3">
				{isAuthenticated ? (
					<>
						<Button
							variant="btn_teal"
							title="Logout"
							onClick={handleLogout}
						/>
						<Button
							title="Dashboard"
							path="/dashboard"
							variant="btn_gray"
						/>
					</>
				) : (
					<>
						<Button
							title="Login"
							path="/login"
							variant="btn_teal"
						/>
						<Button
							title="Register"
							path="/register"
							variant="btn_gray"
						/>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
