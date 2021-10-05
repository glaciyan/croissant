import React, { useState } from "react";

export const Token = React.createContext([]);

export const TokenProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState("");
    const updateToken = (value: string) => setToken(value);

    return <Token.Provider value={[token, updateToken]}>{children}</Token.Provider>;
};
