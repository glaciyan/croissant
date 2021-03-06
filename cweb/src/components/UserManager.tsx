import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { UserDto } from "../types/dto/userDto";
import { userCacheKey } from "../lib/consts";
import authApi from "../lib/api/authApi";

export const UserMan =
    createContext<{ user: UserDto; setUser: (value: UserDto) => void; isReady: boolean }>(
        null
    );
const UserManProvider = UserMan.Provider;
export const User = UserMan.Consumer;

export const UserManager: React.FC = ({ children }) => {
    const [user, setUserRaw] = useState<UserDto>(null);
    const [isReady, setIsReady] = useState(false);

    const setUser = (value: UserDto) => {
        if (value === null) {
            localStorage.removeItem(userCacheKey);
        } else {
            localStorage.setItem(userCacheKey, JSON.stringify(value));
        }

        setUserRaw(value);
    };

    useEffect(() => {
        const userCache = localStorage.getItem(userCacheKey);

        if (userCache) {
            try {
                const parsed = JSON.parse(userCache);
                setUserRaw(parsed);
            } catch {
                setUserRaw(null);
            }
        } else {
            authApi.me().then((response) => {
                if (response.success) {
                    setUser(response.response.data);
                } else {
                    setUserRaw(null);
                }
            });
        }

        setIsReady(true);
    }, []);

    return (
        <UserManProvider value={{ user, setUser, isReady }}>{children}</UserManProvider>
    );
};
