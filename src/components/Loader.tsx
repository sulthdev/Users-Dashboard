import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		<div className="flex flexCenter h-screen bg-gray-100">
			<Image
				src="/logo.png"
				alt="Logo"
				width={40}
				height={29}
				priority={false}
			/>
		</div>
	);
};

export default Loader;
