import * as React from 'react';
import NextLink from "next/link";
import cn from "classnames"

type Props = {
    href: string,
    rightLine?: boolean,
    active?: boolean
};

export const NavLink: React.FC<Props> = ({children, href, rightLine, active}) => {
    return (
        <div className={cn({
            "after:w-px after:mx-2 after:bg-gray-100 after:h-3 after:inline-block after:bg-opacity-30": rightLine,
        })}>
            <NextLink href={href}>
                <a className={cn({"opacity-60 hover:opacity-80": !active})}>{children}</a>
            </NextLink>
        </div>
    );
};