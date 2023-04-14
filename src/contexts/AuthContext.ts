import type { User } from "@/models";
import { createContext } from "react";

export interface AuthContextType {
	user?: User;
	token?: string;
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    token: undefined,
});