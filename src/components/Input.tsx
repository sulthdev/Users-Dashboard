import React from "react";

type InputProps = {
	label: string;
	id: string;
	name: string;
	type: string;
	placeHolder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
};

const Input = ({
	name,
	label,
	id,
	type,
	placeHolder,
	onChange,
	error,
}: InputProps) => {
	return (
		<div>
			<input
				id={id}
				name={name}
				type={type}
				required
				className="relative block w-full px-5 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-600 focus:border-teal-600 focus:z-10 sm:text-sm"
				placeholder={placeHolder}
				onChange={onChange}
			/>
			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default Input;
