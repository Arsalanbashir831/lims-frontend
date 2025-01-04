'use client';

import React, { Suspense } from "react";

const Layout = ({children}) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
           {children}
        </Suspense>
    );
};

export default Layout;
