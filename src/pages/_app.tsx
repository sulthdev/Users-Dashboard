import "../app/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../context/authContext";
import { checkAuthStatus } from "@/utils/auth";
import Loader from "@/components/Loader";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<InnerApp Component={Component} pageProps={pageProps} />
		</AuthProvider>
	);
}

interface InnerAppProps {
	Component: AppProps["Component"];
	pageProps: any;
}

function InnerApp({ Component, pageProps }: InnerAppProps) {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		const protectedPaths = ["/dashboard", "/profile"];

		const checkAuthentication = async () => {
			if (
				router.pathname === "/login" &&
				isAuthenticated &&
				authChecked
			) {
				await router.push("/dashboard");
				return;
			}

			if (protectedPaths.includes(router.pathname)) {
				if (!isAuthenticated && !authChecked) {
					return;
				} else if (!isAuthenticated && authChecked) {
					await router.push(`/login?next=${router.pathname}`);
				}
			}

			setIsLoading(false);
		};

		checkAuthentication();
	}, [isAuthenticated, router.pathname, authChecked]);

	useEffect(() => {
		checkAuthStatus()
			.then(() => {
				setAuthChecked(true);
			})
			.catch((error) => {
				console.error("Authentication check failed:", error);
				setAuthChecked(true);
			});
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Toaster />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
