import React from "react";
import { ClassName } from "../contracts/ClassName";

export type BrandLogoProps = {} & ClassName;

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 637 244"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            className={className}
        >
            <path
                d="M105.289 0l105.289 60.789v121.577l-105.289 60.789L0 182.366V60.789L105.289 0z"
                fill="#60a5fa"
            />
            <path
                d="M298.565 168.676V72.889h35.987c7.224 0 13.11.937 17.525 2.943a22.743 22.743 0 0110.435 8.964c2.542 4.013 3.746 8.16 3.746 12.575a22.341 22.341 0 01-13.378 20.335 25.017 25.017 0 0113.378 8.695 23.68 23.68 0 014.682 14.449 28.361 28.361 0 01-2.81 12.575 25.686 25.686 0 01-7.09 8.963 31.305 31.305 0 01-10.434 4.683 64.215 64.215 0 01-15.519 1.605h-36.522zm12.71-55.519h20.735a49.499 49.499 0 0012.04-1.07 14.582 14.582 0 007.358-4.816 13.78 13.78 0 002.408-8.295 15.92 15.92 0 00-2.274-8.428 11.639 11.639 0 00-6.555-4.95 53.11 53.11 0 00-14.582-1.337h-19.13v28.896zm0 44.281h23.812a58.462 58.462 0 008.696-.535 20.87 20.87 0 007.224-2.542 16.455 16.455 0 006.823-13.511 15.652 15.652 0 00-2.81-9.231 14.716 14.716 0 00-7.625-5.619 46.823 46.823 0 00-14.047-1.605h-22.074v33.043zM386.725 168.676V99.244h10.568v10.569a28.897 28.897 0 017.492-9.766 13.646 13.646 0 017.492-2.275c4.013 0 8.027 1.204 12.174 3.746l-4.147 10.97a16.187 16.187 0 00-8.562-2.542 10.836 10.836 0 00-6.957 2.275 12.575 12.575 0 00-4.415 6.421 48.964 48.964 0 00-1.873 13.78v36.254h-11.772zM476.627 160.114a44.148 44.148 0 01-12.575 7.893 37.191 37.191 0 01-12.977 2.274 25.017 25.017 0 01-17.525-5.618 18.194 18.194 0 01-6.154-14.315c0-3.344.803-6.421 2.274-9.23a20.067 20.067 0 016.154-6.824 30.234 30.234 0 018.428-3.88 91.64 91.64 0 0110.435-1.738 102.208 102.208 0 0021.004-4.014v-3.077c0-4.816-1.07-8.16-3.21-10.167-3.078-2.676-7.493-4.013-13.513-4.013a21.137 21.137 0 00-12.174 2.943c-2.675 2.006-4.548 5.351-5.886 10.3l-11.505-1.605a29.432 29.432 0 015.217-11.906 23.412 23.412 0 0110.301-6.957 47.76 47.76 0 0115.786-2.408c5.887 0 10.703.67 14.449 2.007a19.264 19.264 0 018.16 5.351 17.258 17.258 0 013.612 7.893 63.412 63.412 0 01.67 10.97v15.653c0 10.836.267 17.792.668 20.736a28.361 28.361 0 003.077 8.294h-12.308a26.756 26.756 0 01-2.408-8.562zm-.936-26.22a86.288 86.288 0 01-19.265 4.414 38.796 38.796 0 00-10.167 2.408 10.167 10.167 0 00-4.682 3.746 10.569 10.569 0 001.873 13.378c2.408 2.14 5.886 3.21 10.435 3.21a25.953 25.953 0 0012.174-2.943 18.997 18.997 0 007.759-8.16 29.432 29.432 0 001.873-11.773v-4.28zM505.81 168.676V99.244h10.57v9.9a24.883 24.883 0 0122.073-11.372c4.147 0 8.027.67 11.505 2.275a18.328 18.328 0 017.893 5.886c1.74 2.408 2.943 5.351 3.612 8.696a56.59 56.59 0 01.67 11.371v42.676h-11.774v-42.14a31.84 31.84 0 00-1.337-10.837 11.505 11.505 0 00-4.816-5.619 18.73 18.73 0 00-21.138 2.676c-3.746 3.077-5.485 9.097-5.485 18.06v37.86h-11.772zM625.164 168.676v-8.696a21.672 21.672 0 01-19.398 10.301 28.228 28.228 0 01-25.954-17.391 49.9 49.9 0 01-.401-37.726 27.291 27.291 0 0125.82-17.392 23.01 23.01 0 0119.13 9.499V72.889h11.773v95.787h-10.97zm-37.057-34.65c0 8.964 1.872 15.52 5.618 19.934a16.589 16.589 0 0026.355.268c3.478-4.147 5.351-10.569 5.351-19.13 0-9.5-1.873-16.59-5.485-21.004a17.124 17.124 0 00-13.511-6.69 16.321 16.321 0 00-13.111 6.422c-3.478 4.281-5.217 11.104-5.217 20.2z"
                fill="#374151"
                fillRule="nonzero"
            />
        </svg>
    );
};
