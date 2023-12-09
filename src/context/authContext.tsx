// src/context/authContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/router";

interface AuthContextType {
	isAuthenticated: boolean;
	logout: () => void;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		const authToken = localStorage.getItem("authToken");
		if (authToken) {
			setIsAuthenticated(true);
		}
	}, []);

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("authToken");
	};

	const contextValue: AuthContextType = {
		isAuthenticated,
		logout,
		setIsAuthenticated,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
