import React, { useState } from "react";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { setIsAuthenticated } = useAuth();
	const router = useRouter();

	const handleLogin = async () => {
		setEmailError("");
		setPasswordError("");

		if (!email) {
			setEmailError("Email is required");
			return;
		}

		if (!password) {
			setPasswordError("Password is required");
			return;
		}
		try {
			setLoading(true);

			const response = await axios.post("https://reqres.in/api/login", {
				email,
				password,
			});

			if (response.status === 200 && response.data.token) {
				localStorage.setItem("authToken", response.data.token);
				setIsAuthenticated(true);
				const nextPath = router.query.next
					? String(router.query.next)
					: "/dashboard";
				router.push(nextPath);
			} else {
				toast.error("An error occurred");
			}
		} catch (error: any) {
			const responseError = error.response.data.error;

			toast.error(
				responseError
					? responseError
					: "Login failed. Please check your credentials and try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (emailError) {
			setEmailError("");
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (passwordError) {
			setPasswordError("");
		}
	};

	return (
		<div className="flex min-h-screen bg-white flexCenter">
			<div className="max-w-md w-full space-y-8 px-10 py-12 bg-white shadow-lg rounded-lg">
				<div className="flex justify-center">
					<Link href="/">
						<Image
							src="/logo.png"
							alt="Logo"
							width={44}
							height={29}
							priority={true}
						/>
					</Link>
				</div>
				<form className="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="flex flex-col gap-2">
						<Input
							label="Email Address"
							id="email-address"
							name="email"
							type="email"
							placeHolder="Email address"
							onChange={handleEmailChange}
							error={emailError}
						/>
						<Input
							label="Password"
							id="password"
							name="password"
							type="password"
							placeHolder="Password"
							onChange={handlePasswordChange}
							error={passwordError}
						/>
					</div>
					<div>
						<button
							type="button"
							className="group relative w-full flex justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
							onClick={handleLogin}
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
