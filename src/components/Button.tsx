import Link from "next/link";
import React from "react";

type ButtonProps = {
	variant: "btn_teal" | "btn_gray";
	title: string;
	onClick?: () => void;
	path?: string;
};

const Button = ({ variant, title, onClick, path }: ButtonProps) => {
	if (onClick) {
		return (
			<button className={`regular ${variant}`} onClick={onClick}>
				{title}
			</button>
		);
	}
	return (
		<Link
			href={path ? path : "/"}
			className={`regular btn_teal ${variant}`}
		>
			{title}
		</Link>
	);
};

export default Button;
