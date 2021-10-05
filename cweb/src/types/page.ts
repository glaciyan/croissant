import { NextPage } from "next";
import React from "react";

export type Page = NextPage & {
    layout?: React.FC;
};
