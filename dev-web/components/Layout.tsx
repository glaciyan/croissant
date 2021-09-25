import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FooterEntry } from "./FooterEntry";

export type LayoutProps = {
    children: ReactNode;
    title: string;
    currentPageName: string;
};

const nav = [
    { name: "Home", href: "/" },
    { name: "Test", href: "/" },
];

export const Layout: React.FC<LayoutProps> = ({ children, title, currentPageName }) => {
    return (
        <div className={`text-gscale-dark-text-secondary`}>
            <Head>
                <title>{title + " - Croissant"}</title>
                <link rel="icon" href="/favicon.ico" sizes="32x32" />
            </Head>
            <header className={`max-w-screen-xl mx-6 xl:mx-auto`}>
                <div className="flex flex-wrap items-center">
                    <Link href="/">
                        <a className="flex mr-16 focus-visible:ring">Croissant</a>
                    </Link>
                    <nav className="flex flex-1 py-4">
                        {nav.map((navi, index, array) => {
                            return (
                                <span key={navi.href} className="flex">
                                    <Link href={navi.href}>
                                        <a
                                            className={`
                                                ${
                                                    currentPageName === navi.name
                                                        ? "text-gscale-dark-text-secondary hover:text-gscale-dark-text-primary"
                                                        : "text-gscale-dark-text-ternary hover:text-gscale-dark-text-secondary"
                                                } focus-visible:underline`}
                                        >
                                            {navi.name}
                                        </a>
                                    </Link>
                                    {index < array.length - 1 ? (
                                        <div className="w-px h-5 mx-2 bg-gscale-dark-background-primary" />
                                    ) : null}
                                </span>
                            );
                        })}
                    </nav>

                    <Link href="/login">
                        <a>login</a>
                    </Link>
                </div>
            </header>

            <main className="min-h-screen">{children}</main>

            <footer className="mt-8 bg-gscale-dark-background-secondary">
                <div className="max-w-screen-xl py-12 mx-6 xl:mx-auto">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-4">
                        <FooterEntry header="Navigation">
                            {nav.map((nav) => {
                                return (
                                    <Link href={nav.href} key={nav.name}>
                                        <a className="block text-gscale-dark-text-secondary hover:underline w-max">
                                            {nav.name}
                                        </a>
                                    </Link>
                                );
                            })}
                        </FooterEntry>
                        <FooterEntry header="Data Sources">
                            <div>Filler Item</div>
                        </FooterEntry>
                    </div>
                    <div className="flex items-center mt-24">
                        croissant
                        <div className="mr-2"> dev </div>
                        by glaciyan
                    </div>
                    <p className="mt-6 text-gscale-dark-text-ternary">
                        Some disclaimer text
                    </p>
                </div>
            </footer>
        </div>
    );
};
