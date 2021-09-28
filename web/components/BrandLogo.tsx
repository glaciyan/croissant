import React from "react";
import { ClassName } from "../contracts/ClassName";

export type BrandLogoProps = {} & ClassName;

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 637 244"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
        >
            <path
                d="M105.289 0l105.289 60.789v121.577l-105.289 60.789L0 182.366V60.789L105.289 0z"
                fill="#60a5fa"
            />
            <text
                x={347.458}
                y={500}
                transform="translate(-58.66 -331.325)"
                fontFamily="'ArialMT','Arial',sans-serif"
                fontSize={133.78}
                fill="#374151"
            >
                {"Brand"}
            </text>
        </svg>
    );
};
