import React, { useState } from "react";
import { ClassName } from "../../contracts/ClassName";
import { CField } from "./Field";
import cn from "classnames";

export const Password: React.FC<ClassName> = ({ className }: ClassName) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={``}>
            <div className="flex">
                <CField
                    className={cn("mr-1", className)}
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                />
                <CField
                    name="confirmPw"
                    placeholder="Confirm"
                    type={showPassword ? "text" : "password"}
                    className={`ml-1`}
                />
            </div>
            <div className="flex items-center mt-4">
                <input
                    id="showPassword"
                    className={`nol mr-2 text-blue-400 form-checkbox h-4 w-4 rounded-sm`}
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword">Show Password</label>
            </div>
        </div>
    );
};
