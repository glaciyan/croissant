import * as React from "react";
import { createContext, useState } from "react";
import { UserDto } from "../types/dto/userDto";

const UserMan = createContext<{ user: UserDto; setUser: (value: UserDto) => void }>(null);
const UserManProvider = UserMan.Provider;
export const User = UserMan.Consumer;

export const UserManager: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserDto>(null);

    return <UserManProvider value={{ user, setUser }}>{children}</UserManProvider>;
};
